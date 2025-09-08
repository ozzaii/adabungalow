// GSAP + ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// DISABLED: Lenis causing scroll stuttering
// Initialize Lenis for buttery smooth scrolling
let lenis = null;
/*
if (!prefersReducedMotion) {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    // Animation frame loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Connect ScrollTrigger with Lenis
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}
*/

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        gsap.to(scrollProgress, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        });
    }
    
    // Preloader animation
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        gsap.timeline()
            .to('.preloader-path', {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: 'power3.inOut'
            })
            .to('.preloader', {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => preloader.style.display = 'none'
            });
    }

    // Hero parallax with sexy depth
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && !prefersReducedMotion) {
        gsap.to(heroImage, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.chapter-arrival',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            }
        });
    }

    // Hero content staggered reveal
    gsap.timeline({
        scrollTrigger: {
            trigger: '.chapter-arrival',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    })
    .from('.hero-content .micro-label', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');

    // Scroll cue animation
    if (!prefersReducedMotion) {
        gsap.to('.scroll-cue', {
            y: 10,
            opacity: 0.3,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }

    // Villa chapters - sexy reveal choreography
    gsap.utils.toArray('.villa-chapter').forEach((villa, index) => {
        const image = villa.querySelector('.villa-image');
        const content = villa.querySelector('.villa-narrative');
        
        // Image scale and blur effect
        if (image && !prefersReducedMotion) {
            gsap.fromTo(image, 
                {
                    scale: 1.15,
                    filter: 'blur(8px)'
                },
                {
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: villa,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Parallax on villa images
            gsap.to(image, {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: villa,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5
                }
            });
        }

        // Content reveal sequence
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: villa,
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });

        // Choreographed reveal
        tl.from(content.querySelector('.micro-label'), {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        })
        .from(content.querySelector('.villa-name'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            letterSpacing: '0.2em',
            ease: 'power3.out'
        }, '-=0.3')
        .from(content.querySelector('.villa-prose'), {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out'
        }, '-=0.4');

        // Amenity chips stagger
        tl.from(content.querySelectorAll('.badge'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)'
        }, '-=0.3');

        // CTA lift
        tl.from(content.querySelector('.villa-cta'), {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        }, '-=0.2');
    });

    // Gallery items - sexy grid reveal
    const galleryItems = gsap.utils.toArray('.gallery-item');
    
    ScrollTrigger.batch(galleryItems, {
        onEnter: (elements) => {
            gsap.from(elements, {
                scale: 0.85,
                opacity: 0,
                duration: 0.8,
                stagger: {
                    each: 0.1,
                    from: 'start'
                },
                ease: 'power3.out',
                overwrite: true
            });
        },
        onLeave: (elements) => {
            if (!prefersReducedMotion) {
                gsap.to(elements, {
                    scale: 0.95,
                    opacity: 0.7,
                    duration: 0.5,
                    stagger: 0.05,
                    overwrite: true
                });
            }
        },
        onEnterBack: (elements) => {
            gsap.to(elements, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                overwrite: true
            });
        },
        start: 'top 85%',
        end: 'bottom 15%'
    });

    // Horizontal Rituals Section - SEXY HORIZONTAL SCROLL
    const ritualsTrack = document.querySelector('.rituals-track');
    const ritualPanels = gsap.utils.toArray('.ritual-panel');
    
    if (ritualsTrack && ritualPanels.length > 0 && !prefersReducedMotion) {
        // Calculate total scroll width
        const getScrollAmount = () => {
            let trackWidth = ritualsTrack.scrollWidth;
            return -(trackWidth - window.innerWidth);
        };
        
        // Pin the section and scroll horizontally
        const horizontalScroll = gsap.to(ritualsTrack, {
            x: getScrollAmount,
            duration: 3,
            ease: 'none',
            scrollTrigger: {
                trigger: '.chapter-rituals',
                start: 'top top',
                end: () => `+=${ritualsTrack.scrollWidth - window.innerWidth}`,
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });
        
        // Pin the header during horizontal scroll
        gsap.to('.rituals-header', {
            scrollTrigger: {
                trigger: '.chapter-rituals',
                start: 'top top',
                end: () => `+=${ritualsTrack.scrollWidth - window.innerWidth}`,
                pin: '.rituals-header',
                pinSpacing: false,
                scrub: true
            }
        });
        
        // Parallax effect on ritual panels
        ritualPanels.forEach((panel, i) => {
            gsap.from(panel, {
                scale: 0.9,
                opacity: 0.7,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalScroll,
                    start: 'left 80%',
                    end: 'right 20%',
                    scrub: 1,
                    toggleActions: 'play reverse play reverse'
                }
            });
            
            // Staggered content reveal
            const content = panel.querySelector('.ritual-content');
            if (content) {
                gsap.from(content, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: horizontalScroll,
                        start: 'left 60%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        });
    }
    
    // Gallery header animation
    gsap.from('.gallery-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.chapter-gallery',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Map Section Animations
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        // Map frame reveal
        gsap.from('.map-frame', {
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-container',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
        
        // Map border animation
        gsap.from('.map-border', {
            opacity: 0,
            duration: 0.8,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.map-container',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
        
        // Map header text
        gsap.from('.map-header > *', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-container',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
        
        // Detail cards stagger
        gsap.from('.detail-card', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.map-details',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    // Footer luxury reveal
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.footer-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Logo mark animation
    footerTl.from('.footer-logo-mark > *', {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    })
    .from('.footer-logo', {
        opacity: 0,
        letterSpacing: '0.3em',
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.footer-tagline', {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.footer-column', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.footer-reservation', {
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.footer-divider', {
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.inOut'
    }, '-=0.3')
    .from('.footer-bottom > *', {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.2');
    
    // Language button hover effects
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            gsap.fromTo(btn, {
                scale: 0.95
            }, {
                scale: 1,
                duration: 0.2,
                ease: 'back.out(2)'
            });
        });
    });

    // Booking dock slide-in on mobile
    if (window.innerWidth <= 768) {
        gsap.from('.booking-dock', {
            y: 100,
            duration: 0.8,
            delay: 1.5,
            ease: 'power3.out'
        });
    }

    // Micro-interactions for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion) {
                gsap.to(btn, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mousedown', () => {
            gsap.to(btn, {
                scale: 0.98,
                duration: 0.1
            });
        });
        
        btn.addEventListener('mouseup', () => {
            gsap.to(btn, {
                scale: 1.02,
                duration: 0.1
            });
        });
    });

    // Badge hover effects
    document.querySelectorAll('.badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion) {
                gsap.to(badge, {
                    y: -2,
                    boxShadow: '0 4px 12px rgba(201, 162, 39, 0.2)',
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });
        
        badge.addEventListener('mouseleave', () => {
            gsap.to(badge, {
                y: 0,
                boxShadow: 'none',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Refresh ScrollTrigger after everything loads
    ScrollTrigger.refresh();
    
    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
});

// Lightbox with sexy transitions
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            const fullSrc = img.dataset.fullSrc || img.src;
            const rect = img.getBoundingClientRect();
            
            // Set initial position
            gsap.set(lightboxImage, {
                width: rect.width,
                height: rect.height,
                x: rect.left,
                y: rect.top
            });
            
            lightboxImage.src = fullSrc;
            lightbox.style.display = 'flex';
            
            // Animate to full screen
            gsap.to(lightboxImage, {
                width: '90vw',
                height: '90vh',
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power3.inOut'
            });
            
            gsap.to(lightbox, {
                backgroundColor: 'rgba(24, 51, 44, 0.95)',
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.from(lightboxClose, {
                scale: 0,
                rotation: 180,
                duration: 0.4,
                delay: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    const closeLightbox = () => {
        gsap.to(lightbox, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                lightbox.style.display = 'none';
                gsap.set(lightbox, { opacity: 1 });
            }
        });
    };
    
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
});