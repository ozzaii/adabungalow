// ═══════════════════════════════════════════════════════════════════════════════
// ADA BUNGALOW - CINEMATIC EXPERIENCE ENGINE
// Quiet luxury in motion
// ═══════════════════════════════════════════════════════════════════════════════

class CinematicExperience {
    constructor() {
        this.init();
    }
    
    async init() {
        // Check for reduced motion preference
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.reducedMotion) {
            await this.loadLibraries();
            this.setupSmoothScroll();
            this.initPreloader();
            this.initScrollTriggers();
            this.initParallax();
            this.initMicroInteractions();
        } else {
            // Simple fallback for reduced motion
            this.initBasicReveal();
        }
        
        this.initLightbox();
    }
    
    async loadLibraries() {
        // Load GSAP and plugins
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        await this.loadScript('https://cdn.jsdelivr.net/gh/studio-freight/lenis@1/bundled/lenis.min.js');
        
        // Register GSAP plugins
        if (window.gsap && window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }
    }
    
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    setupSmoothScroll() {
        // Initialize Lenis smooth scroll
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false
        });
        
        // Sync ScrollTrigger with Lenis
        this.lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });
        
        gsap.ticker.lagSmoothing(0);
    }
    
    initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;
        
        // Animate preloader path
        const path = preloader.querySelector('.preloader-path');
        if (path) {
            gsap.fromTo(path, 
                { strokeDashoffset: 1000 },
                { 
                    strokeDashoffset: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    onComplete: () => {
                        setTimeout(() => {
                            preloader.classList.add('fade-out');
                            setTimeout(() => {
                                preloader.style.display = 'none';
                                this.animateHero();
                            }, 400);
                        }, 300);
                    }
                }
            );
        }
    }
    
    animateHero() {
        // Hero entrance animation
        gsap.timeline()
            .from('.hero-title', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.hero-subtitle', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-cta > *', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.scroll-cue', {
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.2');
    }
    
    initScrollTriggers() {
        // Reveal animations on scroll
        gsap.utils.toArray('.reveal').forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.06,
                ease: 'power3.out'
            });
        });
        
        // Villa chapters animation
        gsap.utils.toArray('.villa-chapter').forEach((chapter, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: chapter,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            tl.from(chapter.querySelector('.villa-image'), {
                scale: 1.02,
                filter: 'blur(8px)',
                duration: 0.5,
                ease: 'power3.out'
            })
            .from(chapter.querySelector('.micro-label'), {
                y: 8,
                opacity: 0,
                duration: 0.22,
                ease: 'power3.out'
            }, 0.14)
            .from(chapter.querySelector('h3'), {
                letterSpacing: '0.05em',
                opacity: 0,
                duration: 0.28,
                ease: 'power3.out'
            }, 0.22)
            .from(chapter.querySelectorAll('.amenity-chip'), {
                y: 10,
                opacity: 0,
                duration: 0.3,
                stagger: 0.06,
                ease: 'power3.out'
            }, 0.36)
            .from(chapter.querySelector('.villa-cta'), {
                y: 10,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.out'
            }, 0.42);
        });
        
        // Pinned sections
        this.createPinnedScene();
        
        // Horizontal scroll section
        this.createHorizontalScroll();
    }
    
    createPinnedScene() {
        const pinnedSection = document.querySelector('.signature-scene');
        if (!pinnedSection) return;
        
        ScrollTrigger.create({
            trigger: pinnedSection,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Parallax layers
                gsap.to('.forest-layer', {
                    y: progress * -100,
                    ease: 'none'
                });
                
                gsap.to('.deck-layer', {
                    y: progress * -50,
                    ease: 'none'
                });
                
                gsap.to('.ui-layer', {
                    y: progress * -20,
                    ease: 'none'
                });
                
                // Text reveal
                gsap.to('.pinned-text', {
                    opacity: progress > 0.3 ? 1 : 0,
                    y: progress > 0.3 ? 0 : 20,
                    duration: 0.4
                });
            }
        });
    }
    
    createHorizontalScroll() {
        const container = document.querySelector('.amenities-horizontal');
        if (!container) return;
        
        const panels = container.querySelectorAll('.amenity-panel');
        
        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: () => `+=${container.offsetWidth}`,
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    duration: 0.5
                }
            }
        });
    }
    
    initParallax() {
        // Basic parallax for images
        gsap.utils.toArray('[data-parallax]').forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
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
    
    initMicroInteractions() {
        // Button press effect
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousedown', () => {
                gsap.to(btn, {
                    scale: 0.98,
                    duration: 0.12,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseup', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.18,
                    ease: 'power3.out'
                });
            });
        });
        
        // Chip hover
        document.querySelectorAll('.badge, .amenity-chip').forEach(chip => {
            chip.addEventListener('mouseenter', () => {
                gsap.to(chip, {
                    y: -2,
                    boxShadow: '0 4px 12px rgba(20,36,32,0.1)',
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            chip.addEventListener('mouseleave', () => {
                gsap.to(chip, {
                    y: 0,
                    boxShadow: 'none',
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
        
        // Scroll cue animation
        const scrollCue = document.querySelector('.scroll-cue');
        if (scrollCue) {
            gsap.to(scrollCue, {
                y: 8,
                opacity: 0.3,
                duration: 1.6,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
        }
    }
    
    initLightbox() {
        const images = document.querySelectorAll('.gallery-image');
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                const rect = img.getBoundingClientRect();
                
                // Set initial position
                gsap.set(lightboxImage, {
                    width: rect.width,
                    height: rect.height,
                    x: rect.left,
                    y: rect.top
                });
                
                lightboxImage.src = img.dataset.fullSrc || img.src;
                lightbox.classList.add('active');
                
                // Animate to center
                gsap.to(lightboxImage, {
                    width: '90vw',
                    height: '90vh',
                    x: '5vw',
                    y: '5vh',
                    duration: 0.5,
                    ease: 'power3.out'
                });
                
                gsap.from(lightbox, {
                    backgroundColor: 'rgba(12,18,15,0)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
        
        const closeLightbox = () => {
            gsap.to(lightboxImage, {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            
            gsap.to(lightbox, {
                backgroundColor: 'rgba(12,18,15,0)',
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    lightbox.classList.remove('active');
                }
            });
        };
        
        closeBtn?.addEventListener('click', closeLightbox);
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
    initBasicReveal() {
        // Simple reveal for reduced motion
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-inview');
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CinematicExperience();
});