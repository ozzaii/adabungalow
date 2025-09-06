// ═══════════════════════════════════════════════════════════════════════════════
// ADA BUNGALOW - MAIN JAVASCRIPT
// Consolidated, Optimized, Production-Ready
// ═══════════════════════════════════════════════════════════════════════════════

class AdaBungalow {
    constructor() {
        this.state = {
            scrolled: false,
            galleryOpen: false,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
        
        this.init();
    }
    
    async init() {
        // Core functionality
        this.initPreloader();
        this.initHeader();
        this.initRevealAnimations();
        this.initGallery();
        this.updateWeather();
        
        // Enhanced features if motion is allowed
        if (!this.state.reducedMotion) {
            await this.loadEnhancements();
        }
    }
    
    // ─────────────────────────────────────
    // PRELOADER
    // ─────────────────────────────────────
    
    initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        // Simple fade out after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 400);
            }, 500);
        });
    }
    
    // ─────────────────────────────────────
    // HEADER
    // ─────────────────────────────────────
    
    initHeader() {
        const header = document.querySelector('.header-minimal');
        if (!header) return;
        
        let lastScroll = 0;
        
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 60) {
                if (!this.state.scrolled) {
                    header.classList.add('scrolled');
                    this.state.scrolled = true;
                }
            } else {
                if (this.state.scrolled) {
                    header.classList.remove('scrolled');
                    this.state.scrolled = false;
                }
            }
            
            lastScroll = currentScroll;
        };
        
        // Throttle scroll events
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }
    
    // ─────────────────────────────────────
    // REVEAL ANIMATIONS
    // ─────────────────────────────────────
    
    initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-inview');
                        // Stop observing once revealed
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        reveals.forEach(el => observer.observe(el));
    }
    
    // ─────────────────────────────────────
    // GALLERY
    // ─────────────────────────────────────
    
    initGallery() {
        const images = document.querySelectorAll('.gallery-image');
        const lightbox = document.querySelector('.lightbox');
        
        if (!lightbox || !images.length) return;
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        // Open lightbox
        images.forEach((img) => {
            img.addEventListener('click', () => {
                lightboxImage.src = img.dataset.fullSrc || img.src;
                lightboxImage.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                this.state.galleryOpen = true;
            });
        });
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            this.state.galleryOpen = false;
        };
        
        closeBtn?.addEventListener('click', closeLightbox);
        
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.galleryOpen) {
                closeLightbox();
            }
        });
    }
    
    // ─────────────────────────────────────
    // WEATHER
    // ─────────────────────────────────────
    
    async updateWeather() {
        const chip = document.querySelector('.weather-chip');
        if (!chip) return;
        
        try {
            const response = await fetch(
                'https://api.openweathermap.org/data/2.5/weather?lat=40.6167&lon=39.4000&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric'
            );
            
            if (!response.ok) throw new Error('Weather fetch failed');
            
            const data = await response.json();
            const temp = Math.round(data.main.temp);
            const desc = data.weather[0].main;
            
            const tempEl = chip.querySelector('.weather-temp');
            const descEl = chip.querySelector('.weather-desc');
            
            if (tempEl) tempEl.textContent = `${temp}°C`;
            if (descEl) descEl.textContent = desc;
        } catch (error) {
            // Keep default values on error
            console.log('Weather update skipped');
        }
    }
    
    // ─────────────────────────────────────
    // ENHANCED FEATURES (GSAP)
    // ─────────────────────────────────────
    
    async loadEnhancements() {
        // Only load GSAP if needed
        if (this.state.reducedMotion) return;
        
        try {
            // Load GSAP dynamically
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
            await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
            
            if (window.gsap && window.ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);
                this.initScrollAnimations();
            }
        } catch (error) {
            console.log('Enhanced animations skipped');
        }
    }
    
    loadScript(src) {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    initScrollAnimations() {
        // Villa reveal animations
        gsap.utils.toArray('.villa-chapter').forEach((chapter, index) => {
            gsap.from(chapter, {
                scrollTrigger: {
                    trigger: chapter,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
        
        // Parallax effects
        gsap.utils.toArray('[data-parallax]').forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            
            gsap.to(element, {
                yPercent: -30 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }
    
    // ─────────────────────────────────────
    // UTILITIES
    // ─────────────────────────────────────
    
    debounce(func, wait) {
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
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    window.adaBungalow = new AdaBungalow();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed header
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form accessibility
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
    
    // Image lazy loading with native API
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.loading = 'lazy';
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
});