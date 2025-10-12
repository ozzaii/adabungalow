// ═══════════════════════════════════════════════════════════════════════════════
// DAILY RITUALS - ULTRA PREMIUM HORIZONTAL SCROLL
// Spotlight + Depth of Field + Parallax + Progress + Magnetic Hover
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

        // Create progress dots container
        const createProgressDots = () => {
            const existingDots = document.querySelector('.rituals-progress-dots');
            if (existingDots) existingDots.remove();

            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'rituals-progress-dots';
            panels.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'progress-dot';
                dot.dataset.index = index;
                dotsContainer.appendChild(dot);
            });
            ritualsSection.appendChild(dotsContainer);
            return dotsContainer;
        };

        const progressDots = createProgressDots();

        // Main horizontal scroll with smooth pin
        const horizontalTween = gsap.to(ritualsTrack, {
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
                pinSpacing: true,
                onUpdate: (self) => {
                    updateActivePanel(self.progress);
                }
            }
        });

        // Update active panel based on scroll progress
        function updateActivePanel(progress) {
            const activeIndex = Math.round(progress * (panels.length - 1));

            panels.forEach((panel, index) => {
                const distance = Math.abs(index - (progress * (panels.length - 1)));

                // Spotlight effect: scale + opacity + blur
                const scale = gsap.utils.interpolate(0.92, 1.08, Math.max(0, 1 - distance * 0.5));
                const opacity = gsap.utils.interpolate(0.4, 1, Math.max(0, 1 - distance * 0.6));
                const blur = gsap.utils.interpolate(8, 0, Math.max(0, 1 - distance * 0.8));
                const brightness = gsap.utils.interpolate(0.7, 1.1, Math.max(0, 1 - distance * 0.5));

                gsap.to(panel, {
                    scale: scale,
                    opacity: opacity,
                    filter: `blur(${blur}px) brightness(${brightness})`,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Brass glow on active panel
                const glowOpacity = index === activeIndex ? 0.3 : 0;
                const borderElement = panel.querySelector('.ritual-brass-glow');
                if (borderElement) {
                    gsap.to(borderElement, {
                        opacity: glowOpacity,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });

            // Update progress dots
            const dots = progressDots.querySelectorAll('.progress-dot');
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Add brass glow element to each panel
        panels.forEach(panel => {
            if (!panel.querySelector('.ritual-brass-glow')) {
                const glow = document.createElement('div');
                glow.className = 'ritual-brass-glow';
                panel.appendChild(glow);
            }
        });

        // Text stagger reveal animation
        panels.forEach((panel, index) => {
            const title = panel.querySelector('.ritual-title');
            const desc = panel.querySelector('.ritual-desc');

            if (title) {
                gsap.fromTo(title,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ritualsSection,
                            start: "center center",
                            end: () => `+=${getScrollAmount() + window.innerHeight}`,
                            scrub: 1,
                            onUpdate: (self) => {
                                const panelProgress = self.progress * panels.length - index;
                                const revealed = panelProgress > -0.3 && panelProgress < 1.3;
                                title.style.opacity = revealed ? 1 : 0;
                            }
                        }
                    }
                );
            }

            if (desc) {
                gsap.fromTo(desc,
                    { opacity: 0, y: 15 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ritualsSection,
                            start: "center center",
                            end: () => `+=${getScrollAmount() + window.innerHeight}`,
                            scrub: 1,
                            onUpdate: (self) => {
                                const panelProgress = self.progress * panels.length - index;
                                const revealed = panelProgress > -0.2 && panelProgress < 1.2;
                                desc.style.opacity = revealed ? 1 : 0;
                            }
                        }
                    }
                );
            }
        });

        // Image parallax on scroll (3D depth effect)
        panels.forEach((panel, index) => {
            const image = panel.querySelector('.ritual-image');
            if (image) {
                gsap.to(image, {
                    scrollTrigger: {
                        trigger: ritualsSection,
                        start: "center center",
                        end: () => `+=${getScrollAmount() + window.innerHeight}`,
                        scrub: 2, // Slower for parallax depth
                        onUpdate: (self) => {
                            const panelProgress = self.progress * panels.length - index;
                            const parallaxX = (panelProgress - 0.5) * 30; // Horizontal parallax
                            gsap.set(image, { x: parallaxX });
                        }
                    }
                });
            }
        });

        // Magnetic hover effect
        panels.forEach(panel => {
            const image = panel.querySelector('.ritual-image');

            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Panel magnetic pull
                gsap.to(panel, {
                    x: x * 0.05,
                    y: y * 0.05,
                    rotationY: x * 0.02,
                    rotationX: -y * 0.02,
                    duration: 0.6,
                    ease: "power2.out",
                    transformPerspective: 1000
                });

                // Image scale on hover
                if (image) {
                    gsap.to(image, {
                        scale: 1.1,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                }
            });

            panel.addEventListener('mouseleave', () => {
                // Reset magnetic pull
                gsap.to(panel, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });

                // Reset image scale
                if (image) {
                    gsap.to(image, {
                        scale: 1,
                        duration: 0.8,
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
            panels.forEach(panel => {
                gsap.set(panel, { scale: 1, opacity: 1, filter: 'none' });
            });
        });

        console.log('✨ Ultra premium rituals scroll initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRitualsScroll);
    } else {
        initRitualsScroll();
    }
})();
