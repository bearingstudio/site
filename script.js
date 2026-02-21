/* ============================================
   BEARING STUDIO — script.js
   ============================================ */

// ─── ACCESSIBILITY MENU ───────────────────────
const a11yTrigger = document.querySelector('.a11y-trigger');
const a11yMenu    = document.querySelector('.a11y-menu');

if (a11yTrigger && a11yMenu) {
    a11yTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = a11yTrigger.getAttribute('aria-expanded') === 'true';
        a11yTrigger.setAttribute('aria-expanded', !isOpen);
        a11yMenu.hidden = isOpen;
    });

    document.addEventListener('click', () => {
        a11yTrigger.setAttribute('aria-expanded', 'false');
        a11yMenu.hidden = true;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            a11yTrigger.setAttribute('aria-expanded', 'false');
            a11yMenu.hidden = true;
            a11yTrigger.focus();
        }
    });

    // text-size targets <html>, others target <body>
    const toggleMap = {
        'text-size':     { el: document.documentElement, cls: 'a11y-large-text' },
        'high-contrast': { el: document.body,            cls: 'a11y-high-contrast' },
        'reduce-motion': { el: document.body,            cls: 'a11y-reduce-motion' },
    };

    // Restore saved preferences
    Object.entries(toggleMap).forEach(([action, { el, cls }]) => {
        if (localStorage.getItem(action) === 'true') {
            el.classList.add(cls);
        }
    });

    // Sync button states on load
    document.querySelectorAll('.a11y-option').forEach(btn => {
        const action = btn.dataset.action;
        const active = localStorage.getItem(action) === 'true';
        btn.setAttribute('aria-pressed', String(active));
    });

    // Handle toggle clicks
    document.querySelectorAll('.a11y-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action       = btn.dataset.action;
            const { el, cls }  = toggleMap[action];
            const isOn         = el.classList.toggle(cls);
            btn.setAttribute('aria-pressed', String(isOn));
            localStorage.setItem(action, isOn);
        });
    });
}

// ─── HAMBURGER NAV ────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navClose  = document.getElementById('nav-close');
const navDrawer = document.getElementById('nav-drawer');

if (hamburger && navDrawer) {
    hamburger.addEventListener('click', () => {
        navDrawer.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        navClose && navClose.focus();
    });

    const closeDrawer = () => {
        navDrawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
    };

    navClose && navClose.addEventListener('click', closeDrawer);

    // Close on link click
    navDrawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeDrawer);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navDrawer.classList.contains('open')) closeDrawer();
    });
}

// ─── NAV: sticky, always present ──────────────
// Nothing needed — nav is position:sticky in CSS

// ─── CAROUSEL ─────────────────────────────────
const slides   = document.querySelectorAll('.hero-slide');
const dots     = document.querySelectorAll('.carousel-dot');
const prevBtn  = document.getElementById('carouselPrev');
const nextBtn  = document.getElementById('carouselNext');

if (slides.length > 0) {
    let current = 0;

    const goTo = (index) => {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        dots[current].setAttribute('aria-selected', 'false');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('active');
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-selected', 'true');
    };

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    // Wide click zones — invisible left/right areas on each slide
    document.querySelectorAll('.hero-zone-prev').forEach(btn => {
        btn.addEventListener('click', () => goTo(current - 1));
    });
    document.querySelectorAll('.hero-zone-next').forEach(btn => {
        btn.addEventListener('click', () => goTo(current + 1));
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => goTo(parseInt(dot.dataset.dot)));
    });

    // Swipe support for mobile
    let touchStartX = 0;
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carousel.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });
    }
}


const heroLeft       = document.getElementById('heroLeft');   // .hero-overlay-center on slide 1
const heroRight      = document.getElementById('heroRight');  // .hero-overlay-right on slide 1
const cayHeroContent = document.querySelector('.cay-hero-content');
const cayHero        = document.querySelector('.cay-hero');

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.body.classList.contains('a11y-reduce-motion');

window.addEventListener('scroll', () => {
    if (prefersReducedMotion()) return;

    // Index page parallax — only on active slide
    const activeWrap = document.querySelector('.hero-slide.active .hero-video-wrap');
    if (activeWrap) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight * 1.5) {
            if (heroLeft)  heroLeft.style.transform  = `translateY(-${scrolled * 0.45}px)`;
            if (heroRight) heroRight.style.transform = `translateY(-${scrolled * 0.35}px)`;
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
