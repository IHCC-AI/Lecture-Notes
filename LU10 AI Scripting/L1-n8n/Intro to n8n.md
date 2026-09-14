# Intro to n8n

- [https://n8n.io/](https://n8n.io/)
- Video (Video on their home page): [What is n8n?](https://youtu.be/ZCuL2e4zC_4?si=HiUCmvZLyW_4v7ID)
- Video (First 60s to start out): [n8n will change your life as a developer...](https://www.youtube.com/watch?v=bS9R6aCVEzw)

## The Grifters

10x Productivity? For Free?
Well, it's not magic.
It's just some obfuscated automation code.
And there are hundreds of people out there willing to sell you their "SOFTWARE" for way too much.

[This guy steals videos](https://www.youtube.com/shorts/nTUpFSS7388)
[Download Archive](assets/I%20built%20this%20YouTube%20Automation%20that%20finds%20the%20best%20Shorts%20(n8n).webm)

## "Install"

We will start out using `npx`.
Make sure you have node.js installed. 

[Docs Here](https://docs.n8n.io/hosting/installation/npm/).

```bash
npm init -y
npm install n8n
npx n8n start
```

Forgot your password?

```bash
npx n8n user-management:reset # deletes all users
```

[//]: # (Got these Demos here: https://n8n.io/workflows/)

## Demo 1: Simple AI Chat Bot



This is an awful example demonstrating the power of n8n.
But we are in AI class, so lets demo that we can talk to a chatbot.
Import the project via this JSON file.

[Demo Simple AI Chat BOT](examples/Demo_%20My%20first%20AI%20Agent%20in%20n8n.json)

## Demo 2: Simple Email

[Link to Template](https://n8n.io/workflows/9128-autonomous-email-management-with-gpt-5-mini-and-human-in-the-loop-for-outlook/)

**DO NOT LOG IN TO IHCC OUTLOOK EMAIL.**
Look at how complex the workflow is.
And think how as a developer you could use this to reduce your workload.

[Autonomous Email Management with GPT-5-mini & Human-in-the-Loop for Outlook](examples/Demo_Autonomous%20Email%20Management.json)

## Demo 3: Discord Mod

[Link to Template](https://n8n.io/workflows/3351-automated-discord-spam-moderation-with-ai-and-human-in-the-loop/)

This demo is much more complex.
Have students load it up and look around it.
It uses "Human In The Loop" so part of the workflow waits for a human to perform an action.

[Demo Discord Mod](examples/Demo_Automated%20Discord%20Spam%20Moderation%20with%20AI%20and%20Human-in-the-Loop.json)

### Discussion

- Think how as a developer you could use this to reduce your workload. Even in none technical roles.
- When would this be useful in your personal life?
- When does this go from a time-saving tool to a time-consuming tool?
- What are the limitations of this?
  - When should you use this vs. build an actual program with a more code first tech stack?