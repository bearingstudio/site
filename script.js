/* ============================================
   BEARING STUDIO — script.js
   ============================================ */

// ─── ACCESSIBILITY MENU ───────────────────────
const a11yTrigger = document.querySelector('.a11y-trigger');
const a11yMenu    = document.querySelector('.a11y-menu');

if (a11yTrigger && a11yMenu) {
    // Open / close
    a11yTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = a11yTrigger.getAttribute('aria-expanded') === 'true';
        a11yTrigger.setAttribute('aria-expanded', !isOpen);
        a11yMenu.hidden = isOpen;
    });

    // Close on outside click
    document.addEventListener('click', () => {
        a11yTrigger.setAttribute('aria-expanded', 'false');
        a11yMenu.hidden = true;
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            a11yTrigger.setAttribute('aria-expanded', 'false');
            a11yMenu.hidden = true;
            a11yTrigger.focus();
        }
    });

    // Toggle options
    const toggleMap = {
        'text-size':      'a11y-large-text',
        'high-contrast':  'a11y-high-contrast',
        'reduce-motion':  'a11y-reduce-motion',
    };

    // Restore saved preferences
    Object.entries(toggleMap).forEach(([action, cls]) => {
        if (localStorage.getItem(action) === 'true') {
            document.body.classList.add(cls);
        }
    });

    // Sync button states on load
    document.querySelectorAll('.a11y-option').forEach(btn => {
        const action = btn.dataset.action;
        const active = localStorage.getItem(action) === 'true';
        btn.setAttribute('aria-pressed', active);
    });

    // Handle toggle clicks
    document.querySelectorAll('.a11y-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            const cls    = toggleMap[action];
            const isOn   = document.body.classList.toggle(cls);
            btn.setAttribute('aria-pressed', isOn);
            localStorage.setItem(action, isOn);
        });
    });
}

// ─── NAV: sticky, always present ──────────────
// Nothing needed — nav is position:sticky in CSS

// ─── PARALLAX: left + right columns float up ──
// ─── PARALLAX: left + right columns float up ──
const heroLeft  = document.getElementById('heroLeft');
const heroRight = document.getElementById('heroRight');
const heroWrap  = document.querySelector('.hero-video-wrap');

// ─── PARALLAX: cayenne hero content ───────────
const cayHeroContent = document.querySelector('.cay-hero-content');
const cayHero        = document.querySelector('.cay-hero');

window.addEventListener('scroll', () => {
    // Index page parallax
    if (heroWrap) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight * 1.5) {
            const offsetLeft  = scrolled * 0.45;
            const offsetRight = scrolled * 0.35;
            if (heroLeft)  heroLeft.style.transform  = `translateY(-${offsetLeft}px)`;
            if (heroRight) heroRight.style.transform = `translateY(-${offsetRight}px)`;
        }
    }
    // Cayenne page parallax
    if (cayHeroContent && cayHero) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            cayHeroContent.style.transform = `translateY(-${scrolled * 0.25}px)`;
        }
    }
}, { passive: true });

// ─── SMOOTH SCROLL ────────────────────────────
const nav = document.getElementById('nav');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav ? nav.offsetHeight : 0;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - navHeight - 24,
                behavior: 'smooth'
            });
        }
    });
});

// ─── ACTIVE NAV LINKS ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset + 200 >= section.offsetTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ─── SCROLL REVEAL ────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.projects, .about, .contact, .footer').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});
