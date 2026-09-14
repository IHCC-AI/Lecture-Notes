---
marp: true
theme: default
paginate: true
backgroundColor: #fff
---

# Prompting

How to create better prompts.

By: Luke Matheis

---

# What is prompt engineering?

- The art of refining inputs to get optimal AI outputs.
    - [AWS Prompt Engineering Techniques](https://aws.amazon.com/what-is/prompt-engineering/)
    - [Google Prompting Essentials (Coursera)](https://www.coursera.org/specializations/prompting-essentials-google)

---

# "You're Holding It Wrong"

* Prompt engineering is a powerful tool, but it shouldn't be an excuse for AI flaws.
* When critics point out issues, defenders often say, _"You're prompting it wrong."_
* [Reference: How to blame the user](https://uxdesign.cc/youre-holding-it-wrong-how-to-blame-the-user-6ebfd36f5664)

---

# The Prompt Framework (T-C-R-E-I)

1. Task
    - **Persona:** Who is the AI? (e.g., Marketer, Teacher)
    - **Format:** Output type (e.g., Table, CSV, List)

2. Context
    - _Good:_ "Ideas for a gift under $30."
    - _Great:_ "5 ideas for a 29-year-old who loves winter sports and just switched from snowboarding to skiing. Budget: $30."

---

# The Prompt Framework (Continued)

3. Reference
    - Provide additional data, examples, or specific ideas to guide the AI.
    - Attached is documentation about the coding framework we are using.
    - Here are some examples of similar outputs we liked in the past.
4. Evaluate
    - Review the output. Does it meet the requirements?
5. Iterate
    - Feed errors back in.
    - Add more detail or refine the constraints.

---

# Always Be Iterating

If results are lacking, try these steps:

* **Mark up your prompt into T-C-R**
    - **T:** Make a schedule for the team (Output: CSV).
    - **C:** Specific details about individual schedules.
    - **R:** Past schedule templates.

* **Separate into shorter tasks**
    - Don't use "Monolithic" prompts.
    - Break "Summarize and Graph" into two distinct steps.

---

# Refinement Strategies

3. **Try different phrasing**
    - Use an **Analogous Task**: Instead of "Write a marketing plan," try "Write a story about how this product fits into a customer's life."

4. **Introduce Constraints**
    - "Only music from Canada."
    - "Recipes that take less than 30 minutes."

---

# Demo 1: The Power of Context

Scenario: Creating a Weather Cycle Diagram 


> "Make a diagram of weather cycle."

* Result: Often generic or missing key scientific steps

---

# Demo 1: With Context


```
You are a 5th grade teacher. Make a diagram of the weather cycle including: Precipitation, surface runoff, groundwater, transpiration, evaporation, and condensation. Output in valid Mermaid text.
```

---

# Activity: "Say What You See"

- Test your descriptive prompting skills with Google Arts & Culture:
- [Google: Say What You See Experiment](https://artsandculture.google.com/experiment/jwG3m7wQShZngw?ref=campaigntrend.com)

---
