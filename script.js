// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based nav background
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.backgroundColor = 'rgba(250, 249, 247, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(250, 249, 247, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Lazy load images with fade-in effect
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            // If image is already cached, trigger the transition
            if (img.complete) {
                img.style.opacity = '1';
            }
            
            observer.unobserve(img);
        }
    });
}, {
    threshold: 0.1
});

images.forEach(img => imageObserver.observe(img));

// Add parallax effect to image on scroll (optional - subtle)
const imageSection = document.querySelector('.image-section');
if (imageSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.15;
        imageSection.style.transform = `translateY(${parallax}px)`;
    });
}

// Console message for developers
console.log('%c🎨 Portfolio Site', 'font-size: 20px; font-weight: bold; color: #8b6f47;');
console.log('%cBuilt with care. Deployed on Cloudflare Pages.', 'font-size: 12px; color: #6b6b6b;');
