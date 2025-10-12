// ═══════════════════════════════════════════════════════════════════════════════
// DAILY RITUALS - MINIMAL SMOOTH SCROLL
// Cohesive pin + subtle minimal animations only
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Wait for GSAP and ScrollTrigger to load
    function initRitualsScroll() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(initRitualsScroll, 100);
            return;
        }

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Get the rituals section
        const ritualsSection = document.querySelector('.chapter-rituals');
        const ritualsTrack = document.querySelector('.rituals-track');

        if (!ritualsSection || !ritualsTrack) {
            console.warn('Rituals section not found');
            return;
        }

        // Get all ritual panels
        const panels = gsap.utils.toArray('.ritual-panel');

        if (panels.length === 0) {
            console.warn('No ritual panels found');
            return;
        }

        // Calculate the total horizontal scroll distance
        const getScrollAmount = () => {
            const trackWidth = ritualsTrack.scrollWidth;
            const windowWidth = window.innerWidth;
            return trackWidth - windowWidth;
        };

        // SMOOTH PIN with horizontal scroll
        gsap.to(ritualsTrack, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: ritualsSection,
                start: "center center",
                end: () => `+=${getScrollAmount() + window.innerHeight}`,
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                pinSpacing: true
            }
        });

        // Minimal hover effect - just lift and shadow
        panels.forEach(panel => {
            const image = panel.querySelector('.ritual-image');

            panel.addEventListener('mouseenter', () => {
                gsap.to(panel, {
                    y: -6,
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                    duration: 0.4,
                    ease: "power2.out"
                });

                if (image) {
                    gsap.to(image, {
                        scale: 1.05,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                }
            });

            panel.addEventListener('mouseleave', () => {
                gsap.to(panel, {
                    y: 0,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04), 0 10px 40px rgba(0, 0, 0, 0.06)',
                    duration: 0.4,
                    ease: "power2.out"
                });

                if (image) {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Smooth refresh on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        // Clean reset on refresh
        ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(ritualsTrack, { x: 0 });
        });

        console.log('✨ Rituals minimal smooth scroll initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRitualsScroll);
    } else {
        initRitualsScroll();
    }
})();
