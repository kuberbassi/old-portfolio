# Old Portfolio Archive

Archive of my personal portfolio website, originally created in **September 2025**.

This repository houses the dual-personality web application showcasing my work as a **System Architect / Software Developer** and **Music Producer / Sound Designer**.

> [!NOTE]
> This repository is maintained as a historical archive. My current portfolio can be found at [github.com/kuberbassi/kuberbassi-portfolio](https://github.com/kuberbassi/kuberbassi-portfolio).

---

## 🛠️ Tech Stack & Technologies

- **Frontend Core**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Animation & Motion**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) with `ScrollTrigger` plugin
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) smooth scroll engine
- **Icons & Typography**: FontAwesome 6, Google Fonts (*Playfair Display*, *Inter*, *Space Grotesk*, *Roboto Mono*)
- **Integrations**: GitHub REST API (Dynamic Repository & Avatar Sync)
- **Deployment & CI/CD**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Archived Experiments**: React (JSX) component library (`react-legacy.zip`)

---

## 🏗️ Architecture & Navigation

The portfolio uses a unified single-domain landing portal architecture:
1. **Landing Portal (`/index.html`)**: Interactive split-panel landing page allowing visitors to choose between **Developer** or **Artist** paths.
2. **Developer Sub-site (`/dev/`)**: Showcases software projects, system architecture skills, interactive code graphics, and live GitHub repository feeds.
3. **Music Sub-site (`/music/`)**: Atmospheric audio catalogue featuring original tracks, discography links, live band performances, and visualizer effects.

---

## 📁 Folder Structure

```text
old-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions automated deployment
├── dev/                        # Developer Portfolio sub-site
│   ├── images/                 # Developer graphics & favicon assets
│   ├── index.html              # Developer portfolio structure
│   ├── script.js               # GitHub API integration & GSAP animations
│   └── style.css               # Developer site theme & styles
├── music/                      # Music Portfolio sub-site
│   ├── assets/                 # Album art, banners & favicons
│   ├── index.html              # Music portfolio structure
│   ├── script.js               # Lenis scroll & catalogue renderer
│   ├── songs.json              # Discography metadata & stream links
│   └── style.css               # Dark atmospheric styling
├── index.html                  # Split-panel root landing portal
├── react-legacy.zip            # Zip archive of legacy React components & pages
├── robots.txt                  # Unified crawler configuration
└── sitemap.xml                 # Master XML sitemap
```

---

## 📅 Historical Context

- **Created**: September 2025
- **Status**: Archived & Self-Contained Static Site
- **Current Portfolio**: [github.com/kuberbassi/kuberbassi-portfolio](https://github.com/kuberbassi/kuberbassi-portfolio)