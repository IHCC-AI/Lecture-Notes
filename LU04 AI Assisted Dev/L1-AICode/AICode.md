# Introduction to AI-Assisted Software Development

## LU03 Content Farming

Make students show off / present their projects. 

## Opening Hook

- [The "right way" to vibe code First 30s](https://www.youtube.com/watch?v=6TMPWvPG5GA)
- [10x Developers Meme 10s](https://www.youtube.com/shorts/srNZ9WFsGSY)

You can't use AI to outsource your understanding.
People will use AI to avoid thinking/hard.

## The Promise and Peril of AI Coding

- Speed: Generate boilerplate code instantly
- Learning Aid: See examples and explanations
- Iteration: Quickly test different approaches
- Proof of concept or Prototyping

### Why You Can't Fully Rely on AI (Critical Thinking Focus)

1. It's Often Wrong
    - Hallucination: AI can generate plausible-looking but incorrect code
    - Context Loss: As projects grow, AI loses track of overall architecture
    - Outdated Information: Training data may not include latest best practices
    - Example: Show a simple function that looks correct but has a subtle bug
2. It Makes You "Soft" as a Developer
    - Dependency Risk: Over-reliance prevents skill development
    - Problem-Solving Atrophy: AI does the thinking, you lose the muscle
    - Debugging Blindness: Can't fix what you don't understand
    - Career Impact: Employers value developers who can think independently
3. It is expensive: https://www.reddit.com/r/vercel/comments/1n6iyj1/anyone_else_noticing_v0_has_gotten_way_more/
    - Article: [Vercel v0 can make mistakes — and I get billed for every single one.](https://medium.com/@baytbyte/why-im-sadly-leaving-vercel-and-v0-when-all-in-one-turns-into-all-for-money-368c3a976df3)

Class Discussion: "What skills do you think will remain uniquely human in programming?"

## Demo 1 - Creating a Static Webpage

- Create a simple website about:
    - Goofy Beefiness: Hot dog stand ont the moon
    - Scam website for free video game money
    - etc
- Tools: HTML, CSS (no js/frameworks yet)
- AI Assistant: ChatGPT/Claude/Copilot
    - Just copy and paste AI code into IDE (VSCode)
- Initial Prompt: "Create a simple HTML page for a []"

```
Build a Static Website with HTML/CSS (no JS) about a Hot dog stand ont the moon. Make it have a header, nav bar, and menu, and footer.
```

- Student Observation: What does the AI generate?
- Critical Analysis:
    - What's good about this code?
    - What might be problematic?
    - What's missing?

#### Human-in-the-Loop Improvements

- Add semantic HTML elements
- Improve accessibility
- Add personal touches AI couldn't know
- Fix any generated errors
    - Images most likely

Key Takeaway: AI gives you a starting point, but human judgment makes it professional.

## Prompt Engineering for Development

Bad: "Make me a website"
Good: "Create a responsive HTML page with a header, navigation menu, and footer using semantic HTML5 elements"

### Essential Elements of Good Development Prompts

1. Specificity: Exact technologies, frameworks, versions
2. Context: What the code should accomplish
3. Constraints: Accessibility, browser support, performance needs
4. Examples: Reference existing patterns when possible

### Prompt Engineering Framework: SPEC

- Specific: What exactly do you want?
- Purpose: Why does this code need to exist?
- Environment: What technologies/constraints?
- Criteria: How will you know it's successful?

## Demo 2 - Converting to Tailwind CSS

Now we'll take our static webpage from Demo 1 and modernize it using Tailwind CSS.

### Setup Process

Add Script tag in `<header>` using [PlayCDN](https://tailwindcss.com/docs/installation/play-cdn)

```html

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Prompt for AI assistance:

```
Convert this HTML/CSS code to use Tailwind CSS CSD instead.
Keep the same visual design but replace all custom styles with Tailwind utilities.
Make it responsive for mobile and desktop.
```

#### Key Learning Points:

- AI can quickly convert between CSS approaches
- Tailwind makes responsive design easier
- Human review needed for:
    - Class organization and readability
    - Accessibility considerations
    - AI likes to be redundant with things like color and font sizes.

#### Student Activity

Students ask AI to add one new section to their page using only Tailwind classes.

- Sidebar
- Convert Nav Bar to Drop down.

### Critical Analysis Questions:

- How does the Tailwind version compare to vanilla CSS?
- What did AI do well/poorly in the conversion?
- What would you change about the AI's approach?

## Demo 3 - Adding JavaScript Interactivity

Building on our Tailwind-styled page, we'll add interactive features with JavaScript.

### Feature Ideas (Choose 1-2 based on time):

1. Menu item counter/cart functionality
    ```
    Add JavaScript functionality to my website that allows users to:
    - Click a "+" button to add menu items to a cart
    - Display the current quantity for each item
    - Show a running total of items and price
    - Include a "Clear Cart" button
      Use vanilla JavaScript (no frameworks) and make sure it works with my existing Tailwind.
    ```
2. Image carousel for menu items
    ```
    Create an image carousel/slideshow for my hot dog menu using vanilla JavaScript. Requirements:
    - Display 3-4 food images that rotate automatically every 3 seconds
    - Include left/right arrow buttons for manual navigation
    - Add dot indicators showing current image
    - Make it responsive and work with Tailwind CSS
    - Pause auto-rotation when user hovers over the carousel
    ```
3. Contact form with basic validation
    ```
    Build a contact form for my hot dog stand website with JavaScript validation:
    - Fields: Name (required), Email (required, valid format), Phone (optional), Message (required)
    - Show error messages for invalid inputs in red text
    - Disable submit button until all required fields are valid
    - Display success message when form is submitted (don't actually send anywhere)
    - Style with Tailwind CSS to match my existing design
    ```
4. Dark/light mode toggle
    ```
    Add a dark/light mode toggle to my website using JavaScript:
    - Create a toggle button in the header (moon/sun icon or text)
    - Switch between light and dark color schemes using Tailwind's dark: classes
    - Remember user preference using localStorage
    - Smoothly animate the transition between modes
    - Make sure all text remains readable in both modes
    ```

### Implementation Steps:

1. Let AI generate the JavaScript
2. Review the code together
3. Identify potential issues:
    - Missing error handling
    - Code organization
4. Make human improvements

### Student Observation Exercise

- Test the functionality
- Try to "break" it with edge cases
- Discuss what happens when AI code meets real users

### Key Takeaways:

- AI excels at generating boilerplate interactive code
- Human testing reveals edge cases AI misses
- Code organization and maintainability require human insight
- Always validate AI-generated code with real user scenarios
