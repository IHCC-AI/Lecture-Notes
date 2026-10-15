from datetime import date
from pathlib import Path
import sqlite3

from flask import Flask, g, redirect, render_template, request, url_for


APP_DIR = Path(__file__).resolve().parent
DATABASE_PATH = APP_DIR / "pantry.db"
SEED_PATH = APP_DIR / "SQL-Seed.sql"
if not SEED_PATH.exists():
    SEED_PATH = APP_DIR.parent / "SQL-Seed.sql"

app = Flask(__name__)


def initialize_database():
    if DATABASE_PATH.exists():
        return
    if not SEED_PATH.exists():
        raise FileNotFoundError(f"Could not find the pantry seed SQL file: {SEED_PATH}")

    connection = sqlite3.connect(DATABASE_PATH)
    try:
        connection.executescript(SEED_PATH.read_text(encoding="utf-8"))
    except Exception:
        connection.close()
        DATABASE_PATH.unlink(missing_ok=True)
        raise
    connection.close()


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE_PATH)
        g.db.row_factory = sqlite3.Row
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


@app.teardown_appcontext
def close_db(_error=None):
    database = g.pop("db", None)
    if database is not None:
        database.close()


@app.get("/")
def inventory():
    database = get_db()
    items = database.execute(
        """
        SELECT
            items.item_id,
            items.name AS item_name,
            items.unit,
            categories.name AS category_name,
            COALESCE(SUM(donation_items.quantity_remaining), 0) AS quantity_available,
            MIN(donation_items.expires_on) AS next_expiration
        FROM items
        JOIN categories ON categories.category_id = items.category_id
        LEFT JOIN donation_items
            ON donation_items.item_id = items.item_id
           AND donation_items.quantity_remaining > 0
           AND (donation_items.expires_on IS NULL OR donation_items.expires_on >= date('now'))
        WHERE items.is_active = 1
        GROUP BY items.item_id, categories.name, items.name, items.unit
        ORDER BY categories.name, items.name
        """
    ).fetchall()

    return render_template(
        "inventory.html",
        items=items,
        stocked_items=sum(item["quantity_available"] > 0 for item in items),
        saved=request.args.get("saved") == "1",
    )


@app.route("/donations/new", methods=["GET", "POST"])
def new_donation():
    database = get_db()
    donors = database.execute("SELECT donor_id, name FROM donors ORDER BY name").fetchall()
    items = database.execute(
        "SELECT item_id, name, unit FROM items WHERE is_active = 1 ORDER BY name"
    ).fetchall()
    error = None

    if request.method == "POST":
        try:
            donor_id = int(request.form.get("donor_id", ""))
            item_id = int(request.form.get("item_id", ""))
            quantity = int(request.form.get("quantity", ""))
        except ValueError:
            error = "Choose a donor and item, and enter a whole-number quantity."
        else:
            expires_on = request.form.get("expires_on", "").strip() or None

            if quantity <= 0:
                error = "Quantity must be greater than zero."
            elif not any(donor["donor_id"] == donor_id for donor in donors):
                error = "Choose a donor from the list."
            elif not any(item["item_id"] == item_id for item in items):
                error = "Choose an active pantry item from the list."
            elif expires_on:
                try:
                    expiry_date = date.fromisoformat(expires_on)
                except ValueError:
                    error = "Enter a valid expiration date."
                else:
                    if expiry_date < date.today():
                        error = "The expiration date cannot be in the past."

            if error is None:
                try:
                    database.execute("BEGIN IMMEDIATE")
                    donation = database.execute(
                        "INSERT INTO donations (donor_id) VALUES (?)",
                        (donor_id,),
                    )
                    database.execute(
                        """
                        INSERT INTO donation_items (
                            donation_id, item_id, quantity_received,
                            quantity_remaining, expires_on
                        ) VALUES (?, ?, ?, ?, ?)
                        """,
                        (donation.lastrowid, item_id, quantity, quantity, expires_on),
                    )
                    database.commit()
                except sqlite3.Error:
                    database.rollback()
                    raise
                return redirect(url_for("inventory", saved=1))

    return render_template(
        "donation.html",
        donors=donors,
        items=items,
        error=error,
        today=date.today().isoformat(),
        quantity=request.form.get("quantity", ""),
        expires_on=request.form.get("expires_on", ""),
    )


initialize_database()
