// Particle System
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Custom Cursor
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursorGlow.style.left = cursorX + 'px';
    cursorGlow.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Button hover effects
const buttons = document.querySelectorAll('.cta-button, .nav-link, .social-link');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'scale(2)';
    });

    button.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'scale(1)';
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.section-title, .divider, .about-card, .feature-item');
animatedElements.forEach(el => observer.observe(el));

// Smooth scroll for navigation
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

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const diamondContainer = document.querySelector('.diamond-container');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;

    if (diamondContainer) {
        diamondContainer.style.transform = `translateY(${rate}px)`;
    }
});

// Diamond rotation on mouse move
const diamond = document.querySelector('.diamond');
let targetRotation = 45;

document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseXRelative = (e.clientX - centerX) / centerX;
    const mouseYRelative = (e.clientY - centerY) / centerY;

    targetRotation = 45 + (mouseXRelative * 5) + (mouseYRelative * 5);
});

function rotateDiamond() {
    if (diamond) {
        const currentRotation = parseFloat(diamond.style.transform?.replace(/[^0-9.-]/g, '') || '45');
        const newRotation = currentRotation + (targetRotation - currentRotation) * 0.05;
        diamond.style.transform = `rotate(${newRotation}deg)`;
    }
    requestAnimationFrame(rotateDiamond);
}

rotateDiamond();

// Text reveal on scroll
const mainTitle = document.querySelector('.main-title');
const subtitle = document.querySelector('.subtitle');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (mainTitle) {
        mainTitle.style.opacity = 1 - scrolled / 800;
        mainTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (subtitle) {
        subtitle.style.opacity = 1 - scrolled / 800;
        subtitle.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Feature items stagger animation
const featureItems = document.querySelectorAll('.feature-item');

const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

featureItems.forEach(item => featureObserver.observe(item));

// About cards stagger
const aboutCards = document.querySelectorAll('.about-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, observerOptions);

aboutCards.forEach(card => cardObserver.observe(card));

// Random particle burst on click
canvas.addEventListener('click', (e) => {
    const burstCount = 20;
    const burstParticles = [];

    for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount;
        const speed = Math.random() * 3 + 2;

        burstParticles.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            size: Math.random() * 3 + 2
        });
    }

    function animateBurst() {
        burstParticles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.vx *= 0.98;
            p.vy *= 0.98;

            if (p.life > 0) {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                burstParticles.splice(index, 1);
            }
        });

        if (burstParticles.length > 0) {
            requestAnimationFrame(animateBurst);
        }
    }

    animateBurst();
});

// Add glitch effect to title on hover
const letters = document.querySelectorAll('.letter');

letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        letter.style.animation = 'none';
        setTimeout(() => {
            letter.style.animation = '';
        }, 10);

        // Random position jitter
        const randomX = (Math.random() - 0.5) * 5;
        const randomY = (Math.random() - 0.5) * 5;
        letter.style.transform = `translate(${randomX}px, ${randomY}px)`;

        setTimeout(() => {
            letter.style.transform = '';
        }, 100);
    });
});

// Scroll progress indicator
const scrollIndicator = document.querySelector('.scroll-line');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;

    if (scrollIndicator && scrolled < windowHeight) {
        scrollIndicator.style.opacity = 1 - (scrolled / windowHeight);
    }
});

// Magnetic effect for buttons
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Console easter egg
console.log('%c ZIRCONEX RAIDER ', 'background: #000; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Ready to raid? ', 'background: #fff; color: #000; font-size: 14px; padding: 5px;');
