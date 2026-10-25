/**
 * Atharva Thorve — Personal Portfolio
 * Clean, Professional Vanilla JavaScript
 * Subtle GPU-Accelerated Animations & Micro-Interactions
 */

// ==============================================================================
// 1. CONFIGURATION (Single source of truth)
// ==============================================================================
/**
 * Canonical base URL for GitHub Pages deployment.
 * Relative asset and data paths ensure sub-path compatibility.
 */
const BASE_URL = 'https://atharva9988.github.io/portfolio-atharva-thorve/';

/**
 * Contact form endpoint (e.g. Web3Forms or Formspree access key).
 * Update this constant with your real submission endpoint or key.
 */
const FORM_ENDPOINT = '[TODO: add access key]';

// ==============================================================================
// 2. INITIALIZATION
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgressBar();
  initScrollHeader();
  initNavigation();
  initScrollReveals();
  initRoleRotator();
  initTabVisibilityHandler();
  initContactForm();
  loadData();
});

// ==============================================================================
// 3. THEME TOGGLE (Dark by default, localStorage & prefers-color-scheme)
// ==============================================================================
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark'); // Default dark
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

// ==============================================================================
// 4. SCROLL PROGRESS BAR (Thin amber bar at top of page, GPU scaleX)
// ==============================================================================
function initScrollProgressBar() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  let ticking = false;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

// ==============================================================================
// 5. STICKY NAV SCROLL BLUR & BORDER (Activates after 20px scroll)
// ==============================================================================
function initScrollHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let ticking = false;

  const handleScroll = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (scrollPos > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();
}

// ==============================================================================
// 6. NAVIGATION & ACTIVE SECTION TRACKING (IntersectionObserver)
// ==============================================================================
function initNavigation() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section indicator on scroll with animated underline
  const sections = document.querySelectorAll('section[id], header#hero');
  const navItems = document.querySelectorAll('.nav-item-link');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
}

// ==============================================================================
// 7. SCROLL REVEALS (IntersectionObserver, threshold ~0.15, one-time reveal)
// ==============================================================================
let scrollRevealObserver = null;

function initScrollReveals() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staticTargets = document.querySelectorAll(
    '.section-header, .about-card, .currently-learning-card, .contact-info-card, .contact-form-card'
  );

  staticTargets.forEach(el => el.classList.add('scroll-reveal'));

  if (isReduced || !('IntersectionObserver' in window)) {
    staticTargets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  scrollRevealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  staticTargets.forEach(el => scrollRevealObserver.observe(el));
}

function observeDynamicReveals(elements, staggerBaseDelay = 80) {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  elements.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    if (!isReduced && staggerBaseDelay > 0) {
      el.style.transitionDelay = `${index * staggerBaseDelay}ms`;
    }

    if (isReduced || !scrollRevealObserver) {
      el.classList.add('is-revealed');
    } else {
      scrollRevealObserver.observe(el);
    }
  });
}

// ==============================================================================
// 8. ROLE TEXT ROTATOR (Fade swap every 3s among 3 approved phrases)
// ==============================================================================
function initRoleRotator() {
  const roleEl = document.getElementById('heroRoleText');
  if (!roleEl) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // The ONLY three approved phrases:
  const phrases = [
    'Backend developer in training',
    'Focused on AI systems',
    'Open to internships'
  ];

  let currentIndex = 0;
  let rotatorInterval = null;

  const startRotator = () => {
    if (rotatorInterval) return;
    rotatorInterval = setInterval(() => {
      if (document.hidden) return; // Pause when tab is not active

      roleEl.classList.add('fade-out');

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        roleEl.textContent = phrases[currentIndex];
        roleEl.classList.remove('fade-out');
      }, 350);
    }, 3000);
  };

  const stopRotator = () => {
    if (rotatorInterval) {
      clearInterval(rotatorInterval);
      rotatorInterval = null;
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopRotator();
    } else {
      startRotator();
    }
  });

  startRotator();
}

// ==============================================================================
// 9. PAUSE INFINITE ANIMATIONS WHEN TAB IS HIDDEN
// ==============================================================================
function initTabVisibilityHandler() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.classList.add('tab-hidden');
    } else {
      document.body.classList.remove('tab-hidden');
    }
  });
}

// ==============================================================================
// 10. DATA LOADING & DYNAMIC RENDERING (Decoupled JSON Source)
// ==============================================================================
async function loadData() {
  try {
    const [aboutRes, projectsRes, skillsRes] = await Promise.all([
      fetch('data/about.json'),
      fetch('data/projects.json'),
      fetch('data/skills.json'),
    ]);

    if (!aboutRes.ok || !projectsRes.ok || !skillsRes.ok) {
      throw new Error(`HTTP error loading data`);
    }

    const about = await aboutRes.json();
    const projectsData = await projectsRes.json();
    const skillsData = await skillsRes.json();

    renderAbout(about);
    renderProjects(projectsData.projects);
    renderSkills(skillsData);
  } catch (err) {
    console.warn('Note: fetch() fallback active (static HTML is preserved for non-JS/offline viewing).', err);
    // Static HTML fallbacks already present in index.html ensure content remains visible.
  }
}

function renderAbout(about) {
  if (!about) return;

  const resumeBtn = document.getElementById('heroResumeBtn');
  if (resumeBtn) {
    if (about.contact?.has_resume) {
      resumeBtn.href = about.contact.resume_path;
      resumeBtn.style.display = 'inline-flex';
    } else {
      resumeBtn.style.display = 'none';
    }
  }

  const linesContainer = document.getElementById('aboutParagraphsContainer');
  if (linesContainer && about.background_lines) {
    linesContainer.innerHTML = about.background_lines
      .map(line => `<p class="about-text">${escapeHtml(line)}</p>`)
      .join('');
  }
}

function renderProjects(projects) {
  if (!projects || !Array.isArray(projects)) return;

  const container = document.getElementById('projectsGrid');
  if (!container) return;

  container.innerHTML = projects.map(project => {
    const isFeatured = !!project.featured;
    const techTags = project.technologies
      .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
      .join('');

    const demoBtn = project.demo_url
      ? `<a href="${escapeHtml(project.demo_url)}" target="_blank" rel="noopener noreferrer" class="project-link-btn primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Live demo
        </a>`
      : '';

    const exampleSnippet = project.example_output
      ? `<details class="example-output-details">
          <summary class="example-output-summary">
            <span>See example output</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <pre class="example-output-code"><code>${escapeHtml(project.example_output)}</code></pre>
        </details>`
      : '';

    return `
      <article class="project-card ${isFeatured ? 'featured' : ''}">
        <div class="project-header">
          <div class="project-title-group">
            <h3 class="project-title">${escapeHtml(project.name)}</h3>
            ${isFeatured ? '<span class="featured-badge">Featured project</span>' : ''}
          </div>
        </div>

        <p class="project-purpose">${escapeHtml(project.purpose)}</p>

        <div class="project-tags">
          ${techTags}
        </div>

        ${exampleSnippet}

        <div class="project-links">
          <a href="${escapeHtml(project.repo_url)}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            GitHub
          </a>
          ${demoBtn}
        </div>
      </article>
    `;
  }).join('');

  // Apply staggered scroll reveal to newly rendered project cards
  const projectCards = container.querySelectorAll('.project-card');
  observeDynamicReveals(projectCards, 100);
}

function renderSkills(skillsData) {
  if (!skillsData) return;

  const categoriesContainer = document.getElementById('skillsCategoriesContainer');
  if (categoriesContainer && skillsData.categories) {
    categoriesContainer.innerHTML = skillsData.categories.map((cat, catIdx) => `
      <div class="skill-category-card">
        <h3 class="skill-category-title">${escapeHtml(cat.name)}</h3>
        <div class="skills-chips-row">
          ${cat.skills.map((s, chipIdx) => `
            <span class="skill-chip" style="transition-delay: ${(catIdx * 60) + (chipIdx * 30)}ms;">${escapeHtml(s)}</span>
          `).join('')}
        </div>
      </div>
    `).join('');

    const skillCards = categoriesContainer.querySelectorAll('.skill-category-card');
    observeDynamicReveals(skillCards, 80);
  }

  const learningContainer = document.getElementById('learningChipsContainer');
  if (learningContainer && skillsData.currently_learning) {
    learningContainer.innerHTML = skillsData.currently_learning
      .map(s => `<span class="learning-chip">${escapeHtml(s)}</span>`)
      .join('');
  }
}

// ==============================================================================
// 11. CONTACT FORM (Validation, Amber Focus Ring, Spinner, Shake & Success)
// ==============================================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('contactStatusMessage');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status message
    statusMsg.className = 'contact-status-message';
    statusMsg.innerHTML = '';

    // Honeypot spam check
    const honeypot = document.getElementById('contactHoneypot')?.value;
    if (honeypot) {
      console.warn('Spam detected via honeypot.');
      showStatus('error', 'Spam detected. Submission aborted.');
      return;
    }

    const name = form.elements['name']?.value?.trim();
    const email = form.elements['email']?.value?.trim();
    const message = form.elements['message']?.value?.trim();

    // Validation
    if (!name || !email || !message) {
      showStatus('error', 'Please fill in all required fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showStatus('error', 'Please enter a valid email address.');
      return;
    }

    if (message.length < 10) {
      showStatus('error', 'Message must be at least 10 characters long.');
      return;
    }

    // Check if real form endpoint is configured
    if (!FORM_ENDPOINT || FORM_ENDPOINT.includes('[TODO')) {
      showStatus('error', `Form submission endpoint is not yet configured in js/main.js [TODO]. You can email Atharva directly at <a href="mailto:atharvathorve2@gmail.com" style="text-decoration: underline; font-weight: 600;">atharvathorve2@gmail.com</a>.`);
      return;
    }

    // Toggle button spinner while sending
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        showStatus('success', `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
        `);
        form.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        showStatus('error', errorData.message || 'There was a problem sending your message. Please reach out via email directly.');
      }
    } catch (err) {
      showStatus('error', 'Network error. Please email me directly at atharvathorve2@gmail.com.');
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
      }
    }
  });

  function showStatus(type, htmlContent) {
    statusMsg.className = 'contact-status-message';
    // Trigger reflow to restart error shake animation if already applied
    void statusMsg.offsetWidth;
    statusMsg.className = `contact-status-message ${type}`;
    statusMsg.innerHTML = htmlContent;
    statusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ==============================================================================
// 12. UTILITIES
// ==============================================================================
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
