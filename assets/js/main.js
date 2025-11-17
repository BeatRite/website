/**
 * BeatRite Website JavaScript
 * Main functionality for interactive elements and animations
 */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
    // Observe all animated elements
    document.querySelectorAll('.stat-card, .solution-card, .flow-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});