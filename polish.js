// ═══════════════════════════════════════════════════════════════════════════════
// POLISH PASS - Final Refinements
// ═══════════════════════════════════════════════════════════════════════════════

class PolishEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        this.fixHeaderScroll();
        this.updateWeatherChip();
        this.polishRitualsSection();
        this.enhanceAccessibility();
        this.unifyMotionTimings();
    }
    
    fixHeaderScroll() {
        const header = document.querySelector('.header-minimal');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class for translucent background
            if (currentScroll > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    updateWeatherChip() {
        // Fetch real weather if needed (optional)
        const chip = document.querySelector('.weather-chip');
        if (!chip) return;
        
        // Update with live data if available
        const updateWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=40.6167&lon=39.4000&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`
                );
                const data = await response.json();
                
                const temp = Math.round(data.main.temp);
                const desc = data.weather[0].main;
                
                chip.querySelector('.weather-temp').textContent = `${temp}°C`;
                chip.querySelector('.weather-desc').textContent = desc;
            } catch (error) {
                // Keep default values if API fails
                console.log('Weather update skipped');
            }
        };
        
        // Update on load
        updateWeather();
        
        // Update every 10 minutes
        setInterval(updateWeather, 600000);
    }
    
    polishRitualsSection() {
        // Ensure proper pinning for Rituals title
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            const ritualsTitle = document.querySelector('.amenities-horizontal .section-title');
            
            if (ritualsTitle) {
                ScrollTrigger.create({
                    trigger: '.amenities-horizontal',
                    start: 'top center-=40',
                    end: '+=200',
                    pin: ritualsTitle,
                    pinSpacing: false
                });
            }
        }
    }
    
    enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                const text = btn.textContent.trim();
                btn.setAttribute('aria-label', text);
            }
        });
        
        // Add role attributes to sections
        document.querySelectorAll('section[data-chapter]').forEach(section => {
            section.setAttribute('role', 'region');
            const chapterNum = section.dataset.chapter;
            section.setAttribute('aria-label', `Chapter ${chapterNum}`);
        });
        
        // Ensure images have alt text
        document.querySelectorAll('img').forEach(img => {
            if (!img.alt) {
                img.alt = 'Ada Bungalow luxury villa image';
            }
        });
        
        // Make lightbox keyboard accessible
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            lightbox.setAttribute('aria-label', 'Image gallery viewer');
        }
    }
    
    unifyMotionTimings() {
        // Override any inconsistent timings with unified values
        const root = document.documentElement;
        
        // Set CSS variables for consistent timings
        root.style.setProperty('--duration-ui', '180ms');
        root.style.setProperty('--duration-scene', '420ms');
        root.style.setProperty('--stagger', '60ms');
        root.style.setProperty('--ease-unified', 'cubic-bezier(0.2, 0.8, 0.2, 1)');
        
        // Apply to GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.defaults({
                ease: 'power3.out',
                duration: 0.42
            });
        }
        
        // Handle reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable all animations
            document.documentElement.style.setProperty('--duration-ui', '0.001ms');
            document.documentElement.style.setProperty('--duration-scene', '0.001ms');
            
            // Disable GSAP animations
            if (typeof gsap !== 'undefined') {
                gsap.globalTimeline.timeScale(100);
            }
        }
    }
    
    // Optional: Add image lazy loading with LQIP
    initLazyImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Create low quality placeholder first
                    img.style.filter = 'blur(5px)';
                    img.style.transition = 'filter 0.3s ease';
                    
                    // Load full image
                    const fullImg = new Image();
                    fullImg.onload = () => {
                        img.src = fullImg.src;
                        img.style.filter = 'none';
                    };
                    fullImg.src = img.dataset.src;
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize polish enhancements after main scripts
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main cinematic script to load first
    setTimeout(() => {
        new PolishEnhancements();
    }, 1000);
});