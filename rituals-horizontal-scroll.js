// ═══════════════════════════════════════════════════════════════════════════════
// DAILY RITUALS - NATURAL HORIZONTAL SCROLL (NO PIN)
// Smooth, natural scroll-based horizontal transform - no jarring pin/unpin
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

        // NO PIN - Just smooth horizontal transform based on scroll position
        gsap.to(ritualsTrack, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: ritualsSection,
                start: "top bottom", // Start when section enters viewport
                end: "bottom top", // End when section leaves viewport
                scrub: 1, // Smooth scrub
                invalidateOnRefresh: true
            }
        });

        // Subtle fade-in for panels as they come into view
        panels.forEach((panel, index) => {
            gsap.fromTo(panel,
                {
                    opacity: 0.5,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: panel,
                        start: "left right", // When panel enters from right
                        end: "right left", // When panel exits to left
                        containerAnimation: ScrollTrigger.getById('rituals-scroll'),
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Image parallax on hover
        panels.forEach(panel => {
            const image = panel.querySelector('.ritual-image');
            if (image) {
                panel.addEventListener('mouseenter', () => {
                    gsap.to(image, {
                        scale: 1.08,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                });

                panel.addEventListener('mouseleave', () => {
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

        console.log('✨ Rituals natural scroll initialized (no pin)');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRitualsScroll);
    } else {
        initRitualsScroll();
    }
})();
