// Initialize Typed.js
document.addEventListener("DOMContentLoaded", function () {
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
        const items = typedElement.getAttribute('data-typed-items').split(',').map(item => item.trim());
        new Typed('.typed', {
            strings: items,
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }
});

// Smooth scrolling for navigation links
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

// Mobile sidebar toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.mobile-toggle');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        if (sectionTop <= 100 && sectionTop > -section.offsetHeight + 100) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.color = 'var(--primary-color)';
            link.style.background = 'rgba(59, 130, 246, 0.15)';
        } else {
            link.style.color = 'var(--text-secondary)';
            link.style.background = 'transparent';
        }
    });
});

// Smooth fade-in effect for skill cards
const skillCards = document.querySelectorAll('.skill-category');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100); // Stagger the animations
        }
    });
}, { threshold: 0.1 });

// Apply initial styles and observe skill cards
skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Experience cards stagger effect
const experienceCards = document.querySelectorAll('.experience-card');
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

// Apply initial styles and observe experience cards
experienceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    experienceObserver.observe(card);
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Call preload function
preloadCriticalResources();