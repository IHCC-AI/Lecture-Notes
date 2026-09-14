# AI Multimedia Generation

> Icebreaker: [Callers to Washington state hotline press 2 for Spanish and get accented AI English instead](https://apnews.com/article/washington-dol-spanish-accent-ai-3a1b8438a5674c07242a8d48c057d5a3)

AI multimedia generation refers to creating, modify, or enhance audio and video content with AI.
Now how much AI usage categorizes something as "AI" content.

### Key Terms

- Text-to-Speech (TTS) - Converting written text into natural-sounding speech
- Voice Cloning - Replicating specific voices from audio samples
- Text-to-Video - Generating video content from text descriptions
- Image-to-Video - Animating static images into video sequences

## Prompt Engineering for Better Results

Audio Generation:

- Specify emotion and tone: "excited," "calm," "professional"
- Include pacing instructions: "speak slowly," "emphasize the word 'innovative'"
- Consider audience: "child-friendly voice" or "authoritative narrator"

Video Generation:

- Use cinematic terms: "close-up," "wide shot," "tracking shot"
- Specify lighting: "golden hour," "soft lighting," "dramatic shadows"
- Include style references: "documentary style," "commercial look," "artistic"

### Quality Optimization

Audio Tips:

- Use clear, well-punctuated text
- Break long sentences into shorter segments
- Add pauses with commas and periods
- Test different voices for your content type

Video Tips:

- Start with simple prompts and iterate
- Use high-quality source images for image-to-video
- Keep clips short (3-4 seconds) for best quality
- Combine multiple short clips rather than generating long videos

### AI Audio Tools

Modern AI can generate human-like speech, clone voices, create music, and produce sound effects. We'll focus on free,
browser-based tools that require no signup fees for today.
Later we will install models to our local computers so we can really go wild (this stuff is not cheap).

### Demo 1: Text-to-Speech

**Tool (no signup):** https://luvvoice.com/

**What it does:** Converts text to natural-sounding speech with multiple voice options

Enter :

```
In today's lecture we will explore how artificial intelligence is changing media creation.
```

1. Select different voices (male, female, various accents)
2. Adjust speed and pitch settings
3. Generate and download audio

Use Cases:

- Educational content
- Accessibility features
- Prototype voice-overs

> Ask: What are some ethical use cases for AI TTS?

### Demo 2: Voice Cloning with FakeYou (5 minutes)

**Tool:** https://fakeyou.com/

**What it does:** Clones celebrity voices and fictional characters for text-to-speech

**Live Demo Steps:**

1. Browse available voice models (celebrities, cartoon characters, etc.)
2. Select a voice: SpongeBob
3. Enter text: "Remember, licking doorknobs is illegal on other planets"
4. Generate audio with the selected voice
5. Compare different character voices

**Ethical Considerations:**

- Always disclose AI-generated content
- Respect copyright and personality rights (Does this website own SpongeBob?)
    - Who is responsible for this theft. The user or the model owner/hoster.
- Use responsibly for educational/entertainment purposes

### Demo 3: Browser-Based TTS (5 minutes)

Create a simple HTML page that uses browser TTS.
This example uses [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance).

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <!--Note: This does not work in Webstorm browser-->
        <title>Browser TTS Demo</title>
    </head>
    <body>
        <label for="textInput">Enter text you want said outload</label>
        <textarea id="textInput" placeholder="Enter text here..."></textarea>
        <button onclick="speak()">Speak</button>
        <script>
            function speak() {
                const text = document.getElementById('textInput').value;
                const utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);
            }
        </script>
    </body>
</html>
```

**Advantages:**

- No external dependencies
- Works offline
- Customizable voice parameters
- Free and unlimited use

## AI Video Generation

Video generation is very new.
And hard to do.
It is very expensive so there are very little free websites to use.
Next time we run this class I hope this section will be a bit more fleshed out.

### AI Video Generation Tools

- https://footage.com/
    - 3 Free per day. No Account Needed.
- https://higgsfield.ai/ai-video

### Demo 4: Text-to-Video Generation

Generates video clips from text descriptions using AI models

**Generic Demo Steps:**

1. Choose any available text-to-video platform
2. Enter prompt: "A serene lake at sunset with gentle ripples on the water"
3. Adjust available settings (duration, resolution, aspect ratio)
4. Generate short video clip (typically 2-4 seconds)
5. Try different prompts:
    - "A busy city street with people walking"
    - "Abstract colorful particles floating in space"
    - "A cat sitting on a windowsill looking outside"

**Tips for Better Results:**

- Be specific with descriptions
- Include lighting and mood details
- Specify camera movements if desired
- Keep prompts concise but descriptive
- Start with simple scenes before attempting complex ones

### Demo 5: Image-to-Video Animation

1. Find any available image-to-video platform
2. Upload a static image (landscape, portrait, or object)
3. Add motion prompt if supported: "gentle camera zoom in" or "leaves swaying in the wind"
4. Generate short animation (typically 2-4 seconds)
5. Try different motion types:
    - Pan left/right
    - Zoom in/out
    - Object movement
    - Natural motion (water flowing, hair moving)

**Creative Applications:**

- Bring photos to life for social media
- Create dynamic presentations
- Enhance storytelling
- Generate B-roll footage

## "Homework"

Have students download the following software for the next lecture.

- [Kdenlive](https://kdenlive.org/download/) - Video editing
- [Handbrake](https://handbrake.fr/downloads.php) - Video compression
- [GIMP](https://www.gimp.org/downloads/) - Image editing
