# Atharva Thorve — Personal Portfolio Website

A clean, calm, and professional portfolio website for **Atharva Thorve**, backend developer in training focused on AI systems.

- **Live URL**: [https://atharva9988.github.io/portfolio-atharva-thorve/](https://atharva9988.github.io/portfolio-atharva-thorve/)
- **Repository**: [https://github.com/Atharva9988/portfolio-atharva-thorve](https://github.com/Atharva9988/portfolio-atharva-thorve)
- **Tech Stack**: Plain HTML5, CSS3, Vanilla JavaScript. Zero build steps, zero npm dependencies, zero external frameworks. Deployed as pure static files on GitHub Pages.

---

## 📁 Repository Structure

```text
portfolio-atharva-thorve/
├── index.html              # Clean single-page semantic HTML (works without JS)
├── 404.html                # Professional 404 error page
├── robots.txt              # Search engine crawler instructions with full sitemap URL
├── sitemap.xml             # XML sitemap for search indexing
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── .env                    # Local environment keys (ignored by git)
├── .env.example            # Template for environment keys
├── .gitignore              # Protects secrets from being committed
├── css/
│   └── style.css           # Clean modern design system (Dark default, Light toggle, WCAG AA)
├── js/
│   └── main.js             # Vanilla JS: dynamic fetch() from data/, theme toggle, form validation
├── data/
│   ├── about.json          # Profile, education, status, direct contact links
│   ├── projects.json       # 5 verified projects, real tech tags, featured project
│   └── skills.json         # Grouped skill chips (Languages, Frameworks, Data, AI, Tools, Currently learning)
└── assets/
    ├── atharva-profile.png # Profile photo
    ├── favicon.svg         # SVG terminal favicon
    ├── og-image.png        # 1200x630 social sharing preview card
    └── resume.pdf          # [TODO: place your PDF here to show the 'Download resume' button]
```

---

## 🛠️ How to Preview Locally

Because modern web browsers restrict `fetch()` requests on the `file://` protocol due to CORS security, run a lightweight local HTTP server:

### Option 1: Python (Recommended)
Open your terminal in this directory and run:
```bash
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Option 2: Node.js (npx)
```bash
npx serve .
```

---

## ✍️ How to Edit Content

Content is decoupled from the UI code and managed through JSON files in `data/`:

1. **Profile & Status (`data/about.json`)**:
   - Update `hero_tagline` or `hero_statement`
   - Modify education details or background lines in `background_lines`
   - Update `contact.email` (`atharvathorve2@gmail.com`)
   - When you add `assets/resume.pdf`, set `"has_resume": true` to reveal the resume button

2. **Projects (`data/projects.json`)**:
   - Add new projects or update existing ones
   - Only list technologies that are present in the project's repository
   - When a project has a live web demo, add the URL to `"demo_url"`

3. **Skills (`data/skills.json`)**:
   - Grouped chips under Languages, Frameworks, Data and validation, AI and LLM integrations, and Libraries and tools
   - Skills without a committed public repository go under `currently_learning`

---

## 🚀 GitHub Pages Deployment Steps

Deploy to GitHub Pages with these exact terminal commands:

1. **Initialize Git and Commit**:
   ```bash
   git init
   git remote add origin https://github.com/Atharva9988/portfolio-atharva-thorve.git
   git add .
   git commit -m "Clean, professional portfolio website"
   git branch -M main
   git push -u origin main
   ```

2. **Configure GitHub Pages in Repository Settings**:
   - Open your repo on GitHub: `https://github.com/Atharva9988/portfolio-atharva-thorve`
   - Click **Settings** (top tab)
   - In the left sidebar, click **Pages** (under "Code and automation")
   - Under **Build and deployment**:
     - **Source**: Select `Deploy from a branch`
     - **Branch**: Select `main`
     - **Folder**: Select `/ (root)`
     - Click **Save**

3. **Verify Deployment**:
   - Wait 1 to 2 minutes for GitHub Actions to complete the deployment.
   - Open your live site: [https://atharva9988.github.io/portfolio-atharva-thorve/](https://atharva9988.github.io/portfolio-atharva-thorve/)

---

## 📋 Checklist of [TODO] Items

- [ ] **Resume PDF**: Place your resume at `assets/resume.pdf` and set `"has_resume": true` in `data/about.json` to activate the "Download resume" button.
- [ ] **Contact Form Access Key**: In `js/main.js`, update `FORM_ENDPOINT` with your Web3Forms access key or Formspree endpoint (e.g., `https://api.web3forms.com/submit`). Until added, submissions show a polite notice and provide a direct mailto link to `atharvathorve2@gmail.com`.
- [ ] **Live Project Demos**: When live web deployments are set up for `ai-code-review-bot` or your other projects, add their live URLs to `"demo_url"` in `data/projects.json`.
- [ ] **Future In-Progress Projects**: As you build projects using Django, Docker, LangGraph, and RAG, move them from `currently_learning` in `data/skills.json` into full project cards in `data/projects.json`.

---

## 💡 Notes on Design and Technical Decisions

1. **Calm, Modern Aesthetic**: We moved away from the code/API metaphor (no curl commands, no HTTP status codes, no left rails, no fake response times). The interface now uses soft dark grays (`#0e1217`, `#18202c`, `#273444`) with an amber accent (`#f59e0b` / `#d97706`), giving recruiters a clean, highly readable layout in under 30 seconds.
2. **Featured Project Card**: `ai-code-review-bot` spans the full grid width on desktop as the primary showcase project, reflecting your backend and LLM integration capabilities.
3. **Sub-Path Resilience**: The canonical URL is defined in `BASE_URL` in `js/main.js` and in meta tags. All internal asset and data paths strictly use relative links (`css/...`, `js/...`, `data/...`, `assets/...`) so the site renders cleanly on `https://atharva9988.github.io/portfolio-atharva-thorve/` or any custom domain.
4. **No-JS Accessibility**: The hero text, about section, and sample project card are hardcoded into `index.html` as semantic HTML fallbacks. The JavaScript hydrates the full dynamic data from JSON files, ensuring that search engines and visitors without JavaScript can read the site.
