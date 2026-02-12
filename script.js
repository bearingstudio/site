// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 40;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced nav on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
        nav.style.borderBottomColor = 'rgba(224, 224, 224, 0.8)';
    } else {
        nav.style.backgroundColor = 'rgba(250, 250, 250, 0.8)';
        nav.style.borderBottomColor = 'rgba(224, 224, 224, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Active nav state based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#0d0d0d';
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Parallax effect for hero image (subtle)
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Intersection Observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for scroll reveals
document.querySelectorAll('.about, .contact').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeInObserver.observe(section);
});

// Preload hero image for smoother experience
const heroImg = document.querySelector('.hero-image img');
if (heroImg && heroImg.complete) {
    heroImg.style.opacity = '1';
} else if (heroImg) {
    heroImg.style.opacity = '0';
    heroImg.addEventListener('load', () => {
        heroImg.style.transition = 'opacity 0.6s ease';
        heroImg.style.opacity = '1';
    });
}

// Add cursor effect to project items (optional premium detail)
const projectItems = document.querySelectorAll('.project-item:not(.coming-soon)');
projectItems.forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
        item.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.zIndex = '1';
    });
});
