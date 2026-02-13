/* ============================================
   BEARING STUDIO — script.js
   ============================================ */

// ─── NAV: show background after splash ────────
const nav = document.querySelector('.nav');
const splash = document.getElementById('splash');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}, { threshold: 0.1 });

navObserver.observe(splash);

// ─── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - navHeight - 32,
                behavior: 'smooth'
            });
        }
    });
});

// ─── ACTIVE NAV LINKS ─────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
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

// ─── HIDE SCROLL HINT ON FIRST SCROLL ─────────
const scrollHint = document.querySelector('.splash-scroll');
let hintHidden = false;

window.addEventListener('scroll', () => {
    if (!hintHidden && window.scrollY > 40) {
        scrollHint.style.opacity = '0';
        scrollHint.style.transition = 'opacity 0.4s ease';
        hintHidden = true;
    }
}, { passive: true });
