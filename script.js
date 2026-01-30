// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initParticleCanvas();
    initContactForm();
    initSmoothReveal();
    initParallaxEffects();
    initCounterAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks ? navLinks.querySelectorAll('a') : [];

    // Navbar scroll effect with smooth transition
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                if (navbar) {
                    if (currentScroll > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced typing effect
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const titles = [
        'Robotics Engineer',
        'Physical AI Researcher',
        'MS Robotics @ Northeastern',
        'Computer Vision Engineer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            currentText = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = currentText;

        let typeSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1500);
}

// Advanced scroll animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.skill-card, .project-card, .timeline-item, .education-card, .honor-card, .publication-card');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => titleObserver.observe(title));
}

// Smooth reveal for elements
function initSmoothReveal() {
    // Reveal cards with stagger effect
    const cards = document.querySelectorAll('.skill-card, .project-card, .education-card, .honor-card');

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
    });
}

// Parallax effects
function initParallaxEffects() {
    const heroContent = document.querySelector('.hero-content');
    const gradientMesh = document.querySelector('.gradient-mesh');

    if (!heroContent && !gradientMesh) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
                }

                if (gradientMesh && scrolled < window.innerHeight) {
                    gradientMesh.style.transform = `scale(${1 + scrolled * 0.0005}) translateY(${scrolled * 0.2}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Enhanced particle canvas animation
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Track mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.baseSpeedX = (Math.random() - 0.5) * 0.3;
            this.baseSpeedY = (Math.random() - 0.5) * 0.3;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() * 60 + 220; // Blue to purple range
        }

        update() {
            // Mouse interaction - particles gently move away from cursor
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.speedX = this.baseSpeedX + (dx / distance) * force * 0.5;
                this.speedY = this.baseSpeedY + (dy / distance) * force * 0.5;
            } else {
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles based on screen size
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 12));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    gradient.addColorStop(0, `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`);
                    gradient.addColorStop(1, `hsla(${particles[j].hue}, 70%, 60%, ${opacity})`);

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause animation when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animate();
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
    });

    observer.observe(canvas);
}

// Contact form handling with animation feedback
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        // Add loading animation
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate sending (Formspree handles actual submission)
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span> <i data-lucide="check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            lucide.createIcons();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });

    // Input focus animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Only run scroll-based highlighting on pages with multiple sections (index.html)
    const isIndexPage = window.location.pathname.endsWith('index.html') ||
                        window.location.pathname === '/' ||
                        window.location.pathname.endsWith('/');

    if (!isIndexPage || sections.length < 2) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (window.pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    // Only modify links that point to sections on this page (start with #)
                    if (href.startsWith('#') || href.startsWith('index.html#')) {
                        link.classList.remove('active');
                        if (href === `#${current}` || href.includes(`#${current}`)) {
                            link.classList.add('active');
                        }
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

updateActiveNavLink();

// Add hover sound effect (optional, subtle)
function initHoverEffects() {
    const interactiveElements = document.querySelectorAll('.btn, .skill-card, .project-card, .social-links a');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

initHoverEffects();

// Magnetic button effect
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Certificate Modal Functions
function openCertificateModal(pdfPath, title) {
    const modal = document.getElementById('certificateModal');
    const frame = document.getElementById('certificateFrame');
    const modalTitle = document.getElementById('modalTitle');

    if (modal && frame && modalTitle) {
        modalTitle.textContent = title;
        frame.src = pdfPath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Re-initialize Lucide icons for the modal
        lucide.createIcons();
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const frame = document.getElementById('certificateFrame');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Clear the iframe src to stop loading
        if (frame) {
            frame.src = '';
        }
    }
}

// Image Modal Functions
function openImageModal(imagePath, title) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalTitle');

    if (modal && img && modalTitle) {
        modalTitle.textContent = title;
        img.src = imagePath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Re-initialize Lucide icons for the modal
        lucide.createIcons();
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('modalImage');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        if (img) {
            img.src = '';
        }
    }
}

// Video Modal Functions
function openVideoModal(videoId, title) {
    const modal = document.getElementById('videoModal');
    const thumbnail = document.getElementById('videoThumbnail');
    const youtubeLink = document.getElementById('youtubeLink');
    const modalTitle = document.getElementById('videoModalTitle');

    if (modal && thumbnail && youtubeLink && modalTitle) {
        modalTitle.textContent = title;
        thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Re-initialize Lucide icons for the modal
        lucide.createIcons();
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// NDA Modal Functions
function openNDAModal() {
    const modal = document.getElementById('ndaModal');

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Re-initialize Lucide icons for the modal
        lucide.createIcons();
    }
}

function closeNDAModal() {
    const modal = document.getElementById('ndaModal');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
        closeImageModal();
        closeVideoModal();
        closeNDAModal();
    }
});
