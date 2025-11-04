# Using Our Custom Model

In the previous lecture we created a custom model for email classification. 
Now, let's use this model in a SvelteKit website.

## Prerequisites

- Docker and Docker Compose installed
- Created our custom model called `email-guru`.
- Have Node.js installed

## Creating the Svelte Project

First Let's check we have Node.js installed.

```bash
node -v
```

Then let's make sure our model is built and running.

```bash
docker exec -it ollama bash
ollama list
```

Now let's create a new SvelteKit project.

```bash
npx sv create email-classifier
cd email-classifier
```

Open up that empty project in your favorite vibe coding editor.

## Building Out the Website

## Things I learned Building this

## Example Text

```
Tired of boring toast? The RGB Gaming Toaster brings your setup to the kitchen.
Equipped with customizable RGB lighting, precision browning controls, and a Turbo Toast™ mode, it’s the only toaster designed for gamers who live on the edge — and need their toast ready before the next respawn.

Whether you’re streaming, grinding ranked, or speedrunning your morning routine, this toaster keeps your carbs crispy and your vibe electric.

🎨 Fully customizable RGB glow — syncs with your PC setup
⚡ Turbo Toast™ mode for lightning-fast browning
🎮 Programmable presets for your favorite breakfast loadouts
🔊 “Achievement Unlocked” chime when your toast is done
🔥 Carbon-fiber finish for that elite gamer aesthetic

👉 Pre-Order Now and get an exclusive “Gamer Fuel” toast stencil — so every slice spawns with your logo.

Game hard. Toast harder.
RGB Toaster Co. — Fuel your next level.

[💥 PRE-ORDER YOURS NOW 💥]
```