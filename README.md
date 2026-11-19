# Navneet Ranjan — Video Editor & Creative Storyteller Portfolio

A premium, modern, dark cinematic portfolio website built for **Navneet Ranjan**, a professional Video Editor & Creative Storyteller.

Designed to evoke the high-end aesthetic of an A24 / creative post-production studio rather than a generic developer template.

---

## 🎬 Live Aesthetic & Design Direction
- **Theme**: Deep cinematic black (`#080808`), charcoal surfaces (`#111111`, `#181818`), and subtle film-flare orange accent (`#FF6B35`).
- **Typography**: Editorial display headers paired with clean technical monospace metadata (`23.976 FPS`, `4K DCI`, live running timecodes).
- **Cinematic Polish**: Subtle organic film grain texture, letterbox cinema previews, responsive video player lightbox supporting both **16:9 widescreen** and **9:16 vertical reels** (Instagram / Shorts / TikTok format).
- **Zero Hallucinated Claims**: Strictly authentic presentation of editing craft, techniques, software, and demo concepts — without invented past clients, fake awards, or fabricated testimonials.

---

## 📁 Key Sections Included

1. **Sticky Transparent Navigation**: Sleek glassmorphism header with logo, navigation anchors, and "Let's Talk" CTA.
2. **Hero Section**:
   - Headline: *"CRAFTING STORIES THROUGH EVERY FRAME."*
   - Supporting text: *"Video Editor | Visual Storyteller | Creative Thinker"*
   - Live running timecode counter (`00:01:24:18`), REC indicator, and interactive featured showreel launcher.
   - Prominent **View My Work** & **Contact Me** buttons.
3. **Featured Work / Project Gallery (Primary Focus)**:
   - Interactive category filtering:
     - *All*
     - *Cinematic Reels*
     - *YouTube Video Editing*
     - *Podcast Editing*
     - *Promotional Videos*
     - *Motion Graphics*
     - *Social Media Content (9:16)*
   - Dynamic lightbox video modal supporting custom video playback, pause, mute, fullscreen, and tool badges.
4. **Cinematic Showreel Section**:
   - Heading: *"A glimpse into my creative world."*
   - Theater presentation frame with letterbox bars, interactive scrubber, play/pause, and simulated audio levels.
5. **About Me**:
   - Heading: *"Behind Every Frame, There's a Story."*
   - Description emphasizing storytelling, pacing, transitions, and cinematic visuals.
   - 4 Craft Pillars: *Pacing & Rhythm, Atmosphere & Color, Sound Design, Visual Storytelling*.
6. **Editing Skills & Software Suite**:
   - 8 core competencies (Video Editing, Cinematic Editing, Color Grading, Motion Graphics, Transitions & Effects, Sound Design, Storytelling, Social Media Content Creation).
   - Editable software tools: *Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut*.
7. **4-Stage Workflow Process**:
   - 01: Understand the Story
   - 02: Plan & Organize Footage
   - 03: Edit & Enhance
   - 04: Final Delivery
8. **Contact & Direct Inquiries**:
   - Heading: *"Have a Story to Tell? Let's Create It."*
   - Interactive message form with validation and instant feedback.
   - Direct email, LinkedIn, Instagram links.
   - **Download Resume** button with a built-in printable / downloadable CV modal.
9. **Cinematic Footer**:
   - Monogram logo, copyright, and smooth "Top of Timeline" scroll.

---

## 🛠️ How to Customize Your Content

All data is separated into clean, easy-to-edit JavaScript files:

### 1. Edit Projects & Videos
Open `src/data/projectsData.js`:
- Update titles, descriptions, and categories.
- Replace `videoUrl` with your direct `.mp4` link, Google Cloud Storage link, or custom embed URL.
- Replace `thumbnail` with your project poster image URL.
- Set `aspectRatio: "16:9"` for landscape or `"9:16"` for vertical social reels.

### 2. Edit Personal Details, Software & Contact Info
Open `src/data/personalData.js`:
- Update email, LinkedIn, and Instagram URLs.
- Change software tools or skill descriptions.
- Update the master showreel video URL in `showreel.videoUrl`.

---

## 💻 Tech Stack
- **React 18**
- **Vite** (Lightning-fast build tool)
- **Tailwind CSS** (Custom cinematic design system)
- **Framer Motion** (Subtle, high-performance animations)
- **Lucide React** (Clean modern iconography)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Production Build
```bash
npm run build
```
This generates an optimized static production bundle in the `dist/` directory.

### 4. Deploying to Vercel
This repository is pre-configured with `vercel.json` for one-click deployment:
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Click **Deploy**.
