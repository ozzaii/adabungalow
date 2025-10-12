// ═══════════════════════════════════════════════════════════════════════════════
// DAILY RITUALS - PREMIUM HORIZONTAL SCROLL
// Vertical scroll transforms to horizontal scroll with cinematic precision
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

        // Premium easing for smooth, luxury feel
        const premiumEase = "power2.inOut";

        // Main horizontal scroll animation
        const horizontalScroll = gsap.to(ritualsTrack, {
            x: () => -getScrollAmount(),
            ease: "none", // Linear for scrub control
            scrollTrigger: {
                trigger: ritualsSection,
                start: "top top",
                end: () => `+=${getScrollAmount()}`, // Match scroll distance exactly
                pin: true,
                scrub: 0.8, // Lower for more responsive feel
                invalidateOnRefresh: true,
                anticipatePin: 1
                // Snap disabled - was causing jumpy behavior
            }
        });

        // Individual panel animations - scale and fade as they become active
        panels.forEach((panel, index) => {
            // Set initial state
            gsap.set(panel, {
                opacity: 1,
                scale: 1
            });

            // Subtle scale effect on scroll (optional - can be disabled)
            ScrollTrigger.create({
                trigger: ritualsSection,
                start: "top top",
                end: () => `+=${getScrollAmount()}`,
                scrub: 0.5,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const panelProgress = progress * panels.length - index;

                    // Calculate distance from center (0 = center)
                    const distanceFromCenter = Math.abs(panelProgress - 0.5);

                    // Subtle scale: only slightly smaller when not centered
                    const scale = gsap.utils.interpolate(0.95, 1, 1 - distanceFromCenter * 1.5);

                    // Opacity: minimal change
                    const opacity = gsap.utils.interpolate(0.85, 1, 1 - distanceFromCenter * 1.5);

                    // Apply transforms only when panel is in view
                    if (panelProgress > -0.5 && panelProgress < 1.5) {
                        gsap.to(panel, {
                            scale: Math.max(0.95, Math.min(1, scale)),
                            opacity: Math.max(0.85, Math.min(1, opacity)),
                            duration: 0.2,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                    }
                }
            });

            // Image parallax on hover
            const image = panel.querySelector('.ritual-image');
            if (image) {
                panel.addEventListener('mouseenter', () => {
                    gsap.to(image, {
                        scale: 1.1,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                });

                panel.addEventListener('mouseleave', () => {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                });
            }
        });

        // Progress indicator disabled - was causing performance issues
        // Can be re-enabled by adding .rituals-progress element to HTML

        // Smooth refresh on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });

        // Reset on refresh
        ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(ritualsTrack, { x: 0 });
            panels.forEach(panel => {
                gsap.set(panel, {
                    opacity: 1,
                    scale: 1
                });
            });
        });

        console.log('✨ Rituals horizontal scroll initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRitualsScroll);
    } else {
        initRitualsScroll();
    }
})();
