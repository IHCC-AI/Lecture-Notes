-- Community Food Pantry teaching database.
-- Run against a new, empty SQLite database. Inventory changes for real
-- distributions should be made atomically by the application.

PRAGMA foreign_keys = ON;

BEGIN;

CREATE TABLE households (
	household_id INTEGER PRIMARY KEY,
	contact_name TEXT NOT NULL,
	phone TEXT,
	postal_code TEXT,
	household_size INTEGER NOT NULL CHECK (typeof(household_size) = 'integer' AND household_size > 0),
	status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
	category_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL COLLATE NOCASE UNIQUE
);

CREATE TABLE items (
	item_id INTEGER PRIMARY KEY,
	category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
	name TEXT NOT NULL COLLATE NOCASE UNIQUE,
	unit TEXT NOT NULL,
	is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE donors (
	donor_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT,
	phone TEXT
);

CREATE TABLE donations (
	donation_id INTEGER PRIMARY KEY,
	donor_id INTEGER NOT NULL REFERENCES donors(donor_id) ON DELETE RESTRICT,
	donated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	notes TEXT
);

CREATE TABLE donation_items (
	donation_item_id INTEGER PRIMARY KEY,
	donation_id INTEGER NOT NULL REFERENCES donations(donation_id) ON DELETE RESTRICT,
	item_id INTEGER NOT NULL REFERENCES items(item_id) ON DELETE RESTRICT,
	quantity_received INTEGER NOT NULL CHECK (typeof(quantity_received) = 'integer' AND quantity_received > 0),
	quantity_remaining INTEGER NOT NULL CHECK (
		typeof(quantity_remaining) = 'integer'
		AND quantity_remaining >= 0
		AND quantity_remaining <= quantity_received
	),
	expires_on TEXT CHECK (expires_on IS NULL OR date(expires_on) IS NOT NULL)
);

CREATE TABLE appointment_slots (
	slot_id INTEGER PRIMARY KEY,
	starts_at TEXT NOT NULL,
	ends_at TEXT NOT NULL,
	capacity INTEGER NOT NULL CHECK (typeof(capacity) = 'integer' AND capacity > 0),
	status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'cancelled')),
	CHECK (
		julianday(starts_at) IS NOT NULL
		AND julianday(ends_at) IS NOT NULL
		AND julianday(ends_at) > julianday(starts_at)
	)
);

CREATE TABLE appointments (
	appointment_id INTEGER PRIMARY KEY,
	household_id INTEGER NOT NULL REFERENCES households(household_id) ON DELETE RESTRICT,
	slot_id INTEGER NOT NULL REFERENCES appointment_slots(slot_id) ON DELETE RESTRICT,
	status TEXT NOT NULL DEFAULT 'confirmed'
		CHECK (status IN ('confirmed', 'completed', 'cancelled', 'no_show')),
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (household_id, slot_id)
);

CREATE TABLE distributions (
	distribution_id INTEGER PRIMARY KEY,
	appointment_id INTEGER NOT NULL UNIQUE REFERENCES appointments(appointment_id) ON DELETE RESTRICT,
	served_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	staff_label TEXT
);

CREATE TABLE distribution_items (
	distribution_id INTEGER NOT NULL REFERENCES distributions(distribution_id) ON DELETE RESTRICT,
	donation_item_id INTEGER NOT NULL REFERENCES donation_items(donation_item_id) ON DELETE RESTRICT,
	quantity INTEGER NOT NULL CHECK (typeof(quantity) = 'integer' AND quantity > 0),
	PRIMARY KEY (distribution_id, donation_item_id)
);

CREATE INDEX idx_donation_items_item_expiry
	ON donation_items(item_id, expires_on);
CREATE INDEX idx_appointments_slot_status
	ON appointments(slot_id, status);
CREATE INDEX idx_appointments_household_status
	ON appointments(household_id, status);
CREATE INDEX idx_distribution_items_lot
	ON distribution_items(donation_item_id);

INSERT INTO households (household_id, contact_name, phone, postal_code, household_size, status) VALUES
	(1, 'Avery Green', '555-0101', '50301', 2, 'active'),
	(2, 'Jordan Rivera', '555-0102', '50302', 4, 'active'),
	(3, 'Sam Chen', '555-0103', '50303', 1, 'active'),
	(4, 'Taylor Patel', '555-0104', '50304', 5, 'active'),
	(5, 'Morgan Reed', '555-0105', '50305', 3, 'inactive'),
	(6, 'Casey Brooks', '555-0106', '50306', 2, 'active');

INSERT INTO categories (category_id, name) VALUES
	(1, 'Pantry Staples'),
	(2, 'Canned Goods'),
	(3, 'Produce'),
	(4, 'Refrigerated'),
	(5, 'Personal Care');

INSERT INTO items (item_id, category_id, name, unit, is_active) VALUES
	(1, 1, 'Rice', 'lb', 1),
	(2, 1, 'Pasta', 'lb', 1),
	(3, 1, 'Rolled Oats', 'lb', 1),
	(4, 2, 'Canned Beans', 'can', 1),
	(5, 2, 'Canned Tomatoes', 'can', 1),
	(6, 3, 'Apples', 'lb', 1),
	(7, 3, 'Carrots', 'lb', 1),
	(8, 4, 'Milk', 'half-gallon', 1),
	(9, 4, 'Eggs', 'dozen', 1),
	(10, 5, 'Soap', 'bar', 1),
	(11, 5, 'Toothpaste', 'tube', 1),
	(12, 1, 'Peanut Butter', 'jar', 1);

INSERT INTO donors (donor_id, name, email, phone) VALUES
	(1, 'Northside Market', 'donations@northside.example', '555-0201'),
	(2, 'Green Valley Farm', 'hello@greenvalley.example', '555-0202'),
	(3, 'Community Drive', NULL, '555-0203'),
	(4, 'Riverbend Co-op', 'giving@riverbend.example', '555-0204');

INSERT INTO donations (donation_id, donor_id, donated_at, notes) VALUES
	(1, 1, datetime('now', '-30 days'), 'Dry goods and canned food'),
	(2, 2, datetime('now', '-20 days'), 'Seasonal produce'),
	(3, 3, datetime('now', '-12 days'), 'Community food and hygiene drive'),
	(4, 4, datetime('now', '-7 days'), 'Refrigerated items'),
	(5, 1, datetime('now', '-3 days'), 'Shelf-stable restock'),
	(6, 2, datetime('now', '-2 days'), 'Produce received past its use-by date');

-- Remaining amounts reflect the distribution rows seeded below.
INSERT INTO donation_items (
	donation_item_id, donation_id, item_id, quantity_received, quantity_remaining, expires_on
) VALUES
	(1, 1, 1, 50, 30, date('now', '+365 days')),
	(2, 1, 2, 30, 18, date('now', '+180 days')),
	(3, 1, 4, 24, 14, date('now', '+300 days')),
	(4, 2, 6, 35, 31, date('now', '+12 days')),
	(5, 2, 7, 25, 25, date('now', '+8 days')),
	(6, 3, 1, 20, 12, date('now', '+330 days')),
	(7, 3, 5, 30, 26, date('now', '+240 days')),
	(8, 3, 10, 20, 16, date('now', '+500 days')),
	(9, 3, 12, 15, 12, date('now', '+270 days')),
	(10, 4, 8, 12, 12, date('now', '+9 days')),
	(11, 4, 9, 10, 8, date('now', '+5 days')),
	(12, 5, 6, 20, 20, date('now', '+21 days')),
	(13, 5, 4, 18, 18, date('now', '+320 days')),
	(14, 5, 11, 16, 16, NULL),
	(15, 6, 7, 8, 8, date('now', '-3 days'));

INSERT INTO appointment_slots (slot_id, starts_at, ends_at, capacity, status) VALUES
	(1, datetime('now', 'start of month', '-2 months', '+5 days', '+9 hours'),
		datetime('now', 'start of month', '-2 months', '+5 days', '+10 hours'), 3, 'closed'),
	(2, datetime('now', 'start of month', '-1 month', '+5 days', '+9 hours'),
		datetime('now', 'start of month', '-1 month', '+5 days', '+10 hours'), 2, 'closed'),
	(3, datetime('now', 'start of month', '-1 month', '+6 days', '+10 hours'),
		datetime('now', 'start of month', '-1 month', '+6 days', '+11 hours'), 2, 'closed'),
	(4, datetime('now', 'start of day', '+2 days', '+9 hours'),
		datetime('now', 'start of day', '+2 days', '+10 hours'), 2, 'open'),
	(5, datetime('now', 'start of day', '+4 days', '+11 hours'),
		datetime('now', 'start of day', '+4 days', '+12 hours'), 2, 'open'),
	(6, datetime('now', '-10 days', 'start of day', '+1 hour'),
		datetime('now', '-10 days', 'start of day', '+2 hours'), 2, 'closed'),
	(7, datetime('now', 'start of day', '+6 days', '+13 hours'),
		datetime('now', 'start of day', '+6 days', '+14 hours'), 1, 'open');

INSERT INTO appointments (appointment_id, household_id, slot_id, status) VALUES
	(1, 1, 1, 'completed'),
	(2, 2, 2, 'completed'),
	(3, 3, 3, 'completed'),
	(4, 4, 6, 'no_show'),
	(5, 4, 4, 'confirmed'),
	(6, 6, 4, 'confirmed'),
	(7, 1, 5, 'cancelled'),
	(8, 2, 5, 'confirmed');

INSERT INTO distributions (distribution_id, appointment_id, served_at, staff_label) VALUES
	(1, 1, (SELECT starts_at FROM appointment_slots WHERE slot_id = 1), 'Volunteer A'),
	(2, 2, (SELECT starts_at FROM appointment_slots WHERE slot_id = 2), 'Volunteer B'),
	(3, 3, (SELECT starts_at FROM appointment_slots WHERE slot_id = 3), 'Volunteer A');

-- One household's basket can draw the same item from more than one stock lot.
INSERT INTO distribution_items (distribution_id, donation_item_id, quantity) VALUES
	(1, 1, 5),
	(1, 2, 4),
	(1, 3, 4),
	(1, 4, 4),
	(2, 1, 10),
	(2, 3, 6),
	(2, 7, 4),
	(2, 9, 3),
	(3, 1, 5),
	(3, 2, 8),
	(3, 6, 8),
	(3, 8, 4),
	(3, 11, 2);

COMMIT;
