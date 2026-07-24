/* ═══════════════════════════════════════════════════════════════
   NEXUS LEARNING LAB — Main JavaScript
   Handles: Loader, Cursor, Navbar, Scroll Animations,
            Skill Bars, Counter, Project Filter, Platform Tabs,
            Skill Tabs, Contact Form, AI Chatbot, Theme Toggle
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. PAGE LOADER
  ────────────────────────────────────────── */
  const loader = document.getElementById('pageLoader');

  setTimeout(() => {
    loader?.classList.add('hidden');
    document.body.style.overflow = '';
    // Initialize animations after load
    initScrollAnimations();
  }, 2000);

  document.body.style.overflow = 'hidden';

  /* ──────────────────────────────────────────
     2. CUSTOM CURSOR
  ────────────────────────────────────────── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dot) {
      dot.style.left  = mouseX + 'px';
      dot.style.top   = mouseY + 'px';
    }
  });

  function lerpCursor() {
    if (!ring) return;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  // Cursor hover effect
  document.querySelectorAll('a, button, .skill-card, .project-card, .about-card, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
  });

  /* ──────────────────────────────────────────
     3. NEURAL NETWORK CANVAS
  ────────────────────────────────────────── */
  if (window.NeuralCanvas) {
    new NeuralCanvas('neuralCanvas', {
      particleCount: window.innerWidth > 768 ? 80 : 40,
      maxDistance: 130,
      particleSpeed: 0.35,
      lineAlpha: 0.3,
      mouseRadius: 180,
    });

    // Smaller canvas for footer
    new NeuralCanvas('footerCanvas', {
      particleCount: 30,
      maxDistance: 100,
      particleSpeed: 0.2,
      lineAlpha: 0.2,
      mouseRadius: 100,
    });
  }

  /* ──────────────────────────────────────────
     4. TYPEWRITER
  ────────────────────────────────────────── */
  if (window.Typewriter) {
    new Typewriter('typewriter', [
      'Intelligent Systems 🧠',
      'Full-Stack Web Apps 💻',
      'ML Pipelines 📊',
      'IoT Solutions 🔌',
      'Educational Platforms 📚',
      'Clean, Beautiful UIs ✨',
    ], {
      typeSpeed: 75,
      deleteSpeed: 40,
      pauseAfter: 2000,
    });
  }

  /* ──────────────────────────────────────────
     5. NAVBAR — scroll + active link + mobile
  ────────────────────────────────────────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks?.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    });
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }

  /* ──────────────────────────────────────────
     6. SCROLL ANIMATIONS (Intersection Observer)
  ────────────────────────────────────────── */
  let skillBarsAnimated  = false;
  let heroCountersDone   = false;

  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Staggered delay based on sibling index
          const parent   = el.parentElement;
          const siblings = parent ? Array.from(parent.querySelectorAll('[data-animate]')) : [];
          const idx      = siblings.indexOf(el);
          const delay    = Math.min(idx * 80, 500);

          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // Skill bars observer
    const skillObserver = new IntersectionObserver(entries => {
      if (skillBarsAnimated) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBarsAnimated = true;
          animateSkillBars();
          skillObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillObserver.observe(skillsSection);

    // Hero counter observer
    const heroObserver = new IntersectionObserver(entries => {
      if (heroCountersDone) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroCountersDone = true;
          animateCounters();
          heroObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('hero');
    if (heroSection) heroObserver.observe(heroSection);
  }

  /* ──────────────────────────────────────────
     7. SKILL BARS ANIMATION
  ────────────────────────────────────────── */
  function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach((bar, i) => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, i * 100);
    });
  }

  /* ──────────────────────────────────────────
     8. COUNTER ANIMATION
  ────────────────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target   = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1800;
      const start    = performance.now();

      function update(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  /* ──────────────────────────────────────────
     9. PROJECT FILTER
  ────────────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cats = card.getAttribute('data-cat') || '';
        const show = filter === 'all' || cats.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ──────────────────────────────────────────
     10. SKILL TAB FILTER
  ────────────────────────────────────────── */
  const skillTabs  = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-tab');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // Re-animate skill bars if skills section
      if (!skillBarsAnimated) return;
      document.querySelectorAll('.skill-card:not(.hidden) .skill-bar').forEach(bar => {
        const w = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = w + '%'; }, 50);
      });
    });
  });

  /* ──────────────────────────────────────────
     11. PLATFORM TABS
  ────────────────────────────────────────── */
  const platformTabs   = document.querySelectorAll('.platform-tab');
  const platformPanels = document.querySelectorAll('.platform-panel');

  platformTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      platformTabs.forEach(t => t.classList.remove('active'));
      platformPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panelId = `panel${capitalize(tab.getAttribute('data-ptab'))}`;
      document.getElementById(panelId)?.classList.add('active');
    });
  });

  /* ──────────────────────────────────────────
     12. THEME TOGGLE
  ────────────────────────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const htmlEl      = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('nexus-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('nexus-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-moon';
    } else {
      themeIcon.className = 'fas fa-sun';
    }
  }

  /* ──────────────────────────────────────────
     13. CONTACT FORM
  ────────────────────────────────────────── */
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Validate
    const name    = document.getElementById('formName')?.value.trim();
    const email   = document.getElementById('formEmail')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();

    if (!name || !email || !message) {
      shakeElement(form);
      return;
    }

    // Show loading
    btnText.style.display    = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled       = true;

    // Simulate sending (replace with real API call)
    await new Promise(r => setTimeout(r, 1500));

    btnText.style.display    = 'flex';
    btnLoading.style.display = 'none';
    submitBtn.disabled       = false;

    successMsg.style.display = 'flex';
    form.reset();

    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  });

  function shakeElement(el) {
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake 0.4s ease';
  }

  // Add shake keyframes dynamically
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      20%{transform:translateX(-8px)}
      40%{transform:translateX(8px)}
      60%{transform:translateX(-5px)}
      80%{transform:translateX(5px)}
    }
  `;
  document.head.appendChild(shakeStyle);

  /* ──────────────────────────────────────────
     14. AI CHATBOT
  ────────────────────────────────────────── */
  const aiFab       = document.getElementById('aiFab');
  const aiModal     = document.getElementById('aiChatModal');
  const aiClose     = document.getElementById('aiChatClose');
  const aiInput     = document.getElementById('aiChatInput');
  const aiSend      = document.getElementById('aiChatSend');
  const aiBody      = document.getElementById('aiChatBody');
  const quickChips  = document.querySelectorAll('.chip');

  const aiResponses = {
    'projects': 'I have built 6+ projects including Nexus Learning Lab (EdTech platform), a Sentiment Analysis Engine, Smart Campus Monitor (IoT), Plant Disease Detector (CNN), and more! Check the Projects section above 🚀',
    'tech stack': 'My primary stack includes Python, Django, React, MySQL, TensorFlow, and Bootstrap. I also work with ESP32/Arduino for IoT, and Docker for deployment!',
    'contact': 'You can reach me via email at nexus@example.com, LinkedIn, or WhatsApp. I typically respond within 24 hours! 📧',
    'nexus learning lab': 'Nexus Learning Lab is my flagship EdTech platform! It connects students (Class 8–HSC) with qualified teachers. Features include live sessions, recorded videos, AI tutoring, progress tracking, and more. Currently in development! 📚',
    'hire': "I'm actively looking for opportunities! Whether it's freelance projects, full-time roles, or collaborations — I'm open. Send me a message in the contact section! 💼",
    'ml': 'I specialize in NLP, Computer Vision, and classification tasks using TensorFlow, PyTorch, and scikit-learn. My best model achieved 94% accuracy on Bengali text sentiment analysis! 🧠',
    'default': "That's a great question! I'm a simplified AI demo — for detailed queries, please reach out directly via the Contact section. I'll be happy to help! 😊",
  };

  function getAIResponse(msg) {
    const lower = msg.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lower.includes(key)) return response;
    }
    return aiResponses['default'];
  }

  function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-chat-msg ${isUser ? 'user' : 'bot'}`;

    if (isUser) {
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble';
      bubble.textContent = text;
      msgDiv.appendChild(bubble);
    } else {
      const avatar = document.createElement('div');
      avatar.className = 'ai-avatar-sm';
      avatar.innerHTML = '<i class="fas fa-robot"></i>';

      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble';
      bubble.textContent = text;

      msgDiv.appendChild(avatar);
      msgDiv.appendChild(bubble);
    }

    // Remove quick chips on first user message
    const chips = aiBody?.querySelector('.quick-chips');
    if (isUser && chips) chips.remove();

    aiBody?.appendChild(msgDiv);
    aiBody.scrollTop = aiBody.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'ai-chat-msg bot typing-indicator';
    typing.innerHTML = `
      <div class="ai-avatar-sm"><i class="fas fa-robot"></i></div>
      <div class="ai-typing"><span></span><span></span><span></span></div>
    `;
    aiBody?.appendChild(typing);
    aiBody.scrollTop = aiBody.scrollHeight;
    return typing;
  }

  async function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, true);
    if (aiInput) aiInput.value = '';

    const typing = showTyping();
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    typing.remove();

    const response = getAIResponse(text);
    addMessage(response, false);
  }

  aiFab?.addEventListener('click', () => {
    aiModal?.classList.toggle('open');
  });

  aiClose?.addEventListener('click', () => {
    aiModal?.classList.remove('open');
  });

  aiSend?.addEventListener('click', () => {
    sendMessage(aiInput?.value || '');
  });

  aiInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage(aiInput.value);
  });

  quickChips?.forEach(chip => {
    chip.addEventListener('click', () => {
      sendMessage(chip.getAttribute('data-msg') || chip.textContent);
    });
  });

  /* ──────────────────────────────────────────
     15. BACK TO TOP
  ────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
      backToTop.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    }
  }, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────
     16. SMOOTH SCROLL for anchor links
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     17. DOWNLOAD CV placeholder
  ────────────────────────────────────────── */
  document.getElementById('downloadCvBtn')?.addEventListener('click', e => {
    e.preventDefault();
    alert('📄 CV download coming soon! Please contact me directly at nexus@example.com for now.');
  });

  /* ──────────────────────────────────────────
     UTILITY
  ────────────────────────────────────────── */
  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

});
