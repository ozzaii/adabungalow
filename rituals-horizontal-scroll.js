// ═══════════════════════════════════════════════════════════════════════════════
// DAILY RITUALS - SMOOTH PIN + HORIZONTAL SCROLL
// Cohesive experience: section pins, only horizontal movement visible
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

        // SMOOTH PIN with generous scroll space
        gsap.to(ritualsTrack, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: ritualsSection,
                start: "center center", // Pin when section is centered
                end: () => `+=${getScrollAmount() + window.innerHeight}`, // Extra space for smooth exit
                pin: true,
                scrub: 0.5, // Very smooth scrub
                invalidateOnRefresh: true,
                anticipatePin: 1, // Smooth pin anticipation
                // Add pinSpacing to prevent layout jump
                pinSpacing: true
            }
        });

        // Subtle hover effect for panels
        panels.forEach(panel => {
            const image = panel.querySelector('.ritual-image');

            if (image) {
                panel.addEventListener('mouseenter', () => {
                    gsap.to(panel, {
                        y: -8,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                    gsap.to(image, {
                        scale: 1.05,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                });

                panel.addEventListener('mouseleave', () => {
                    gsap.to(panel, {
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                });
            }
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

        console.log('✨ Rituals smooth pin scroll initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRitualsScroll);
    } else {
        initRitualsScroll();
    }
})();
