// Performance Optimizations for Ada Bungalow

// Check if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Lazy load GSAP only if needed and not on mobile
if (!isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // GSAP animations are already loaded, just optimize them
    if (typeof gsap !== 'undefined') {
        // Reduce animation complexity on lower-end devices
        gsap.config({
            force3D: false, // Disable 3D transforms on mobile
            nullTargetWarn: false
        });
        
        // Throttle ScrollTrigger refresh
        ScrollTrigger.config({
            limitCallbacks: true,
            syncInterval: 40 // Reduce frequency of sync
        });
    }
}

// Optimized Intersection Observer for lazy loading
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src || img.dataset.fullSrc;
            
            if (src && !img.src.includes(src)) {
                // Create new image to preload
                const newImg = new Image();
                newImg.onload = () => {
                    img.src = src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                };
                newImg.src = src;
            }
        }
    });
}, {
    rootMargin: '50px',
    threshold: 0.01
});

// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    // Convert NodeList to Array for better performance
    const images = Array.from(document.querySelectorAll('img[loading="lazy"]'));
    images.forEach(img => imageObserver.observe(img));
});

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize resize handling
let resizeTimer;
window.addEventListener('resize', debounce(() => {
    // Only refresh ScrollTrigger on significant resize
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 250));

// Optimize scroll performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
}

function updateScroll() {
    ticking = false;
    // Scroll-based updates here if needed
}

// Throttled scroll listener
window.addEventListener('scroll', requestTick, { passive: true });

// Prefetch critical resources
if ('connection' in navigator && navigator.connection.effectiveType === '4g') {
    // Only prefetch on good connections
    const criticalLinks = [
        'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Mobile-specific optimizations
if (isMobile) {
    // Disable hover effects on mobile
    document.documentElement.classList.add('touch-device');
    
    // Use passive listeners for better scroll performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // Optimize form inputs for mobile
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Prevent zoom on focus (already handled by font-size: 16px in CSS)
        input.addEventListener('focus', (e) => {
            if (isMobile) {
                e.target.style.fontSize = '16px';
            }
        });
    });
    
    // Reduce animation duration on mobile
    document.documentElement.style.setProperty('--duration-normal', '200ms');
    document.documentElement.style.setProperty('--duration-slow', '300ms');
}

// Service Worker for caching (if supported)
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, fail silently
        });
    });
}

// Optimize font loading
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('400 1em Fraunces')
    ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
    });
}

// Memory cleanup for long sessions
let cleanupTimer = setInterval(() => {
    // Clean up detached DOM nodes
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => {
            if (!document.body.contains(trigger.trigger)) {
                trigger.kill();
            }
        });
    }
}, 60000); // Run every minute

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    clearInterval(cleanupTimer);
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
});