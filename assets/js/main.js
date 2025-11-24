/**
 * BeatRite Website JavaScript
 * Main functionality for interactive elements and animations
 */

// Configuration - fallback if config.js not loaded
const getConfig = () => window.BEATRITE_CONFIG || {
    CONTACT_EMAIL: 'contact@beatrite.com',
    PARTNER_SUBJECT: 'Partnership Inquiry - BeatRite',
    CONTACT_SUBJECT: 'General Inquiry - BeatRite'
};

// Smooth scroll helper function
const smoothScrollTo = (elementId) => {
    const element = document.querySelector(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Handle CTA button clicks
const handleContactClick = () => {
    // Navigate to contact page
    window.location.href = 'contact.html';
};

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Update ARIA attribute for accessibility
        hamburger.setAttribute('aria-expanded', isActive);
    };

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// Animated number counters
const animateValue = (element, start, end, duration, suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Handle decimals if the end value has them
        const hasDecimal = end % 1 !== 0;
        const value = hasDecimal 
            ? (progress * (end - start) + start).toFixed(1)
            : Math.floor(progress * (end - start) + start);
        
        element.textContent = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-card')) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent.trim();
                
                // Extract number and suffix (like M, %, hrs, etc)
                const match = text.match(/^([\d.]+)(.*)$/);
                if (match) {
                    const numericValue = parseFloat(match[1]);
                    const suffix = match[2];
                    
                    if (!isNaN(numericValue)) {
                        animateValue(statNumber, 0, numericValue, 2000, suffix);
                    }
                }
            }
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup CTA button event listeners
    // "Partner With Us" and "Get in Touch" buttons
    document.querySelectorAll('.nav-cta, button.btn-primary').forEach(button => {
        if (button.textContent.includes('Partner With Us') || button.textContent.includes('Get in Touch')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                handleContactClick();
            });
        }
    });

    // "Learn More" buttons - scroll to "How It Works" section
    document.querySelectorAll('button.btn-secondary').forEach(button => {
        if (button.textContent.includes('Learn More')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScrollTo('.how-section');
            });
        }
    });

    // Observe all animated elements
    document.querySelectorAll('.stat-card, .solution-card, .flow-step, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Set active navigation link based on current page
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkFile = link.getAttribute('href');
        if (linkFile === currentFile || 
            (currentFile === '' && linkFile === 'index.html') ||
            (currentPath.includes('team') && linkFile.includes('team')) ||
            (currentPath === '/' && linkFile === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Vital Sign Graph Animations
    const drawVitalGraph = (canvasId, color, type = 'normal') => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        let offset = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;

            // Different waveform patterns
            for (let x = 0; x < width; x++) {
                let y;

                if (type === 'heart') {
                    // ECG-like pattern
                    const xOffset = (x + offset) % 40;
                    if (xOffset < 5) {
                        y = height / 2 + Math.sin(xOffset * 3) * 10;
                    } else if (xOffset < 10) {
                        y = height / 2 - (xOffset - 5) * 4;
                    } else if (xOffset < 12) {
                        y = height / 2 + (xOffset - 10) * 8;
                    } else {
                        y = height / 2 + Math.sin(x / 5) * 2;
                    }
                } else if (type === 'warning') {
                    // Irregular IJV pattern
                    y = height / 2 + Math.sin((x + offset) / 8) * 8 + Math.sin((x + offset) / 3) * 4;
                } else {
                    // Smooth SpO2 pattern
                    y = height / 2 + Math.sin((x + offset) / 10) * 6;
                }

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
            offset += 0.5;
            requestAnimationFrame(animate);
        };

        animate();
    };

    // Initialize vital graphs
    drawVitalGraph('hrGraph', '#4ECDC4', 'heart');
    drawVitalGraph('ijvGraph', '#FF6B45', 'warning');
    drawVitalGraph('spo2Graph', '#4ECDC4', 'normal');

    // Add mouse move parallax effect to monitoring dashboard
    const dashboard = document.querySelector('.monitoring-dashboard');
    if (dashboard) {
        dashboard.addEventListener('mousemove', (e) => {
            const rect = dashboard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            dashboard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        dashboard.addEventListener('mouseleave', () => {
            dashboard.style.transform = '';
        });
    }
});