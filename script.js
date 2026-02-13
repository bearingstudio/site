/* ============================================
   BEARING STUDIO — script.js
   ============================================ */

// ─── NAV: sticky, always present ──────────────
// Nothing needed — nav is position:sticky in CSS

// ─── PARALLAX: title + subtitle scroll up ─────
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroVideoSubtitle');
const heroWrap = document.querySelector('.hero-video-wrap');

window.addEventListener('scroll', () => {
    if (!heroWrap) return;
    const scrolled = window.pageYOffset;

    if (scrolled < window.innerHeight * 1.5) {
        const offset = scrolled * 0.45;
        if (heroTitle)    heroTitle.style.transform    = `translateY(-${offset}px)`;
        if (heroSubtitle) heroSubtitle.style.transform = `translateY(-${offset * 0.7}px)`;
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
