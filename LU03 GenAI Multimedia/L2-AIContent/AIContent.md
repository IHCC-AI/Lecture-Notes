# AI Content Creation: Video & Photo Editing Fundamentals

Objective: Prepare students to edit and optimize media for AI video projects

## Cold Open

[How to Create Podcasts with AI](https://www.youtube.com/watch?v=FHGFb6c8W2w) - Play first 30 seconds

Hook: "Let's make our own content farm. Let's make slop for the unwashed masses."
Today we're learning the technical skills to transform raw AI-generated content into polished, engaging media.
These editing fundamentals will be essential for your upcoming AI video project.

## Video Editing Fundamentals

### Introduction to Kdenlive

- Why Kdenlive? Free, open-source, cross-platform video editor
- Download: [Kdenlive](https://kdenlive.org/download/)
    - Students don't have to install, I can just demo.
- Download Media
    - Get Media from Blackboard Links or USB drive.
    - Video: https://video.blender.org/w/dmhvQNzwBnrWy1iYzVv5g7
    - Music: https://pixabay.com/music/
    - Images: https://openclipart.org/detail/356770/no-smart-glasses-sign
- Interface Overview: Timeline, preview window, effects panel, project bin

Project Setup

- Create new project (1080p, 30fps recommended)
- Import video assets to project bin
- Organize clips by type (intro, main content, outro)

Timeline Editing

- Essential Cuts & Trims:
- Razor Tool (S): Cut clips at play head position
- Trim: Drag clip edges to adjust in/out points
- Ripple Delete: Remove gaps automatically
- Split Audio: Right-click → "Detach Audio" for separate audio editing

Transitions & Effects

- Basic Transitions: Fade in/out, crossfade between clips
- Text Overlays: Add titles, captions, call-to-action text
- Color Correction: Auto-adjust levels for consistent look
- Speed Changes: 1.25x for pacing, slow motion for emphasis

Audio Enhancement

- Normalize Audio: Consistent volume levels
- Remove Background Noise: Built-in audio filters
- Add Music: Royalty-free background tracks (lower volume to -20dB)
- Audio Sync: Ensure lip-sync accuracy after cuts

## Video Compression & Optimization

Why Compress?

- Netflix VS 4k Blue-ray
    - Netflix: 5-15 Mbps for 1080p streaming
    - Blu-ray: 100gb for the whole move uncompressed
- File Size: Raw exports can be 1GB+ for short videos
- Platform Requirements: YouTube, TikTok, Instagram have size limits
- Loading Speed: Smaller files = better user experience

### Handbrake Compression

- Download: [Handbrake](https://handbrake.fr/downloads.php)
    - Students don't have to install, I can just demo.
- Input: Drag Kdenlive export into Handbrake
- Preset Selection: "Web Optimized" for most use cases

Pass 1: Fast Preview Compression

- Preset: "Fast 1080p30"
- Quality: RF 23 (good balance of size/quality)
- Purpose: Quick preview for client approval
- Expected: 50-70% size reduction

Pass 2: Heavy Optimization

- Preset: "Web Optimized"
- Advanced Settings:
    - Video Codec: H.264 (universal compatibility)
    - Quality: RF 20-22 (higher quality)
    - Frame Rate: Same as source
    - Filters: Deinterlace if needed
- Audio: AAC, 128kbps stereo
- Expected: 80-90% size reduction from original

## Image Editing with GIMP

- Download: [GIMP](https://www.gimp.org/downloads/)
    - Students don't have to install, I can just demo.
- Interface: Toolbox, image window, docks (layers, history)
- File Formats: Work in .xcf, export to .jpg/.png

### Basic Corrections

- Crop & Resize: Tools → Transform → Crop (Shift+C)
- Auto-Enhance: Colors → Auto → Normalize
- Brightness/Contrast: Colors → Brightness-Contrast
- Practical Use: Clean up AI-generated thumbnails

### Background Removal

- Select by Color: Tools → Selection → By Color
- Fuzzy Select: For complex backgrounds
- Layer Masks: Non-destructive editing
- Export: File → Export As → PNG (for transparency) / Webp

### Text & Graphics Overlay

- Text Tool (T): Add titles, captions, watermarks
- Font Selection: Bold, readable fonts for video thumbnails
- Drop Shadows: Filters → Light and Shadow → Drop Shadow
- Color Matching: Sample colors from existing brand elements
