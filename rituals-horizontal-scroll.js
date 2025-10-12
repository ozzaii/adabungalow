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
                end: () => `+=${getScrollAmount() * 1.5}`, // More scroll space for smoother feel
                pin: true,
                scrub: 1.2, // Slightly higher for buttery smooth feel
                invalidateOnRefresh: true,
                anticipatePin: 1,
                snap: {
                    snapTo: 1 / (panels.length - 1), // Snap to each panel
                    duration: { min: 0.2, max: 0.4 },
                    delay: 0.1,
                    ease: premiumEase
                }
            }
        });

        // Individual panel animations - scale and fade as they become active
        panels.forEach((panel, index) => {
            // Set initial state
            gsap.set(panel, {
                opacity: 0.6,
                scale: 0.9
            });

            // Animate as panel comes into view
            ScrollTrigger.create({
                trigger: ritualsSection,
                start: "top top",
                end: () => `+=${getScrollAmount() * 1.5}`,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const panelProgress = progress * panels.length - index;

                    // Calculate distance from center (0 = center)
                    const distanceFromCenter = Math.abs(panelProgress - 0.5);

                    // Scale: larger when centered
                    const scale = gsap.utils.interpolate(0.9, 1.05, 1 - distanceFromCenter * 2);

                    // Opacity: more opaque when centered
                    const opacity = gsap.utils.interpolate(0.6, 1, 1 - distanceFromCenter * 2);

                    // Apply transforms only when panel is in view
                    if (panelProgress > -0.5 && panelProgress < 1.5) {
                        gsap.to(panel, {
                            scale: Math.max(0.9, Math.min(1.05, scale)),
                            opacity: Math.max(0.6, Math.min(1, opacity)),
                            duration: 0.3,
                            ease: premiumEase
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

        // Progress indicator (optional - add if needed in HTML)
        const updateProgress = () => {
            const progressContainer = document.querySelector('.rituals-progress');
            if (!progressContainer) return;

            ScrollTrigger.create({
                trigger: ritualsSection,
                start: "top top",
                end: () => `+=${getScrollAmount() * 1.5}`,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const currentPanel = Math.round(progress * (panels.length - 1));

                    const dots = progressContainer.querySelectorAll('.progress-dot');
                    dots.forEach((dot, i) => {
                        if (i === currentPanel) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
            });
        };

        updateProgress();

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
                    opacity: 0.6,
                    scale: 0.9
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
