# AI-Aided Software Development: Building Whack-A-Mole

This lecture focuses on AI-aided software development practices. You'll learn how to:

- Break down a project into logical, buildable steps
- Write effective prompts for AI coding assistants
- Iterate and refine your requests based on AI output
- Understand when to be specific vs. when to let the AI make decisions

We'll use Svelte as our framework, but the focus is on the development process, not the framework itself.

## The Project

We're building a classic Whack-A-Mole game with:

- A 5x5 grid of holes
- A mole that randomly appears in different holes
- Score tracking
- A 30-second timer
- Start/stop game controls

## Step-by-Step Build Process

### Step 1: Initialize the Project

Create the Project but yourself don't ues AI.

```bash
npx sv create wack-a-mole
```

---

### Step 2: Create the Game Layout

Prompt for AI:

```
Create the main game interface with (don't add any functionality yet):
- A header showing score and time remaining
- A start/stop button in the center
- A 5x5 grid of circular holes with a brown/amber color scheme
- Use Tailwind CSS for styling
```

The AI will create the visual structure of your game with proper layout and styling.
Make sure the AI didn't add anything extra we did not ask for.

---

### Step 3: Add Game State Management

Prompt for AI:

```
Add game state management using Svelte 5 runes. I need:
- score (starts at 0)
- timeLeft (starts at 30 seconds)
- gameActive (boolean for whether game is running)
- molePosition (which hole the mole is in)

Create startGame() and endGame() functions that manage these states.
```

What to expect: The AI will use Svelte 5's $state rune to create reactive state variables and implement the game control
functions.

Key learning: Be specific about data requirements but trust the AI to use framework-appropriate patterns (like Svelte
runes).

---

### Step 4: Implement the Timer

Prompt for AI:

```
Implement a countdown timer that:

- Starts at 30 seconds when the game begins
- Decrements every second
- Automatically ends the game when it reaches 0
- Updates the display in real-time
```

What to expect: The AI will use setInterval to create a countdown mechanism and connect it to your game state.

Key learning: Describe behavior and constraints. The AI will handle the technical implementation (intervals, cleanup,
etc.).

---

### Step 5: Add Mole Movement Logic

Prompt for AI:

```
Make the mole randomly appear in different holes:

- The mole should move to a random hole every 1.5 seconds
- Only move the mole when the game is active
- Store which hole number (0-24) the mole is currently in
```

What to expect: The AI will create a moveMole() function with random number generation and interval management.

Key learning: Break complex features into clear requirements. Specify timing and conditions.

---

### Step 6: Create the MoleHole Component

Prompt for AI:

```
Create a reusable MoleHole component that:

- Accepts props: position (number), hasMole (boolean), and onWhack (function)
- Displays as a circular button with a brown background
- Shows a mole image when hasMole is true
- Calls onWhack with the position when clicked
```

What to expect: The AI will create a separate component file with proper prop handling and event callbacks.

Key learning: Component requirements should specify inputs, outputs, and behavior. The AI handles the syntax.

---

### Step 7: Implement Click Detection

Prompt for AI:

```
Add a whackMole function that:

- Takes a hole position as a parameter
- Checks if the clicked position matches the current mole position
- If it matches, add 10 points to the score and move the mole immediately
- Only works when the game is active
```

What to expect: The AI will create the game logic for detecting successful hits and updating the score.

Key learning: Describe game rules and logic clearly. The AI translates rules into code.

---

### Step 8: Add the Mole Image

Prompt for AI:

```
Create or find a simple SVG mole graphic and add it to the project. Make sure it displays centered in the hole when the
mole is present.
```

What to expect: The AI might create a simple SVG or guide you on adding an image asset.

Key learning: AI can help with assets, but you may need to iterate or provide your own images for better results.

---

### Step 9: Polish the UI

Prompt for AI:

```
Improve the user experience:

- Change the start button text to "Play Again" after the first game ends
- Add hover effects to buttons
- Make sure the grid is centered on the page
- Add appropriate spacing and shadows for depth
```

What to expect: The AI will refine styling and add conditional rendering for better UX.
Key learning: Polish comes after functionality. Describe the user experience improvements you want.

---

### Step 10: Test and Debug

Prompt for AI:

```
Review the code for potential bugs:

- Are intervals properly cleaned up when the game ends?
- Does the timer stop correctly at 0?
- Can the game be restarted multiple times without issues?
```

What to expect: The AI will analyze the code and suggest fixes for common issues like memory leaks or state management
problems.

Key learning: AI assistants are excellent at code review and catching common bugs. Ask them to check your work.

---

## Progress check

Have students show off how well their app works.
