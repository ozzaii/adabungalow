// Daily Rituals - Vertical to Horizontal Scroll Transformation
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
        
        if (!ritualsSection || !ritualsTrack) return;
        
        // Get all ritual panels
        const panels = gsap.utils.toArray('.ritual-panel');
        
        // Calculate the total width we need to scroll
        const getScrollAmount = () => {
            let panelWidth = 0;
            panels.forEach(panel => {
                panelWidth += panel.offsetWidth + parseInt(window.getComputedStyle(panel).marginRight);
            });
            return panelWidth - window.innerWidth + 100; // Extra padding
        };
        
        // Only apply on desktop
        const mm = gsap.matchMedia();
        
        mm.add("(min-width: 768px)", () => {
            // Pin the section and transform vertical scroll to horizontal
            const scrollTween = gsap.to(ritualsTrack, {
                x: () => -getScrollAmount(),
                ease: "none",
                scrollTrigger: {
                    trigger: ritualsSection,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
            
            // Add progress indicators
            ScrollTrigger.create({
                trigger: ritualsSection,
                start: "top top",
                end: () => `+=${getScrollAmount()}`,
                onUpdate: self => {
                    // Update a progress bar if needed
                    const progress = self.progress;
                    // console.log('Scroll progress:', progress);
                }
            });
            
            // Parallax effect for individual panels
            panels.forEach((panel, i) => {
                gsap.from(panel, {
                    opacity: 0.7,
                    scale: 0.95,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: ritualsSection,
                        start: "top top",
                        end: () => `+=${getScrollAmount()}`,
                        scrub: 1,
                        onUpdate: self => {
                            const progress = self.progress;
                            const panelProgress = (progress * panels.length) - i;
                            
                            if (panelProgress > -0.5 && panelProgress < 1.5) {
                                panel.style.transform = `scale(${0.95 + (0.05 * Math.min(1, Math.max(0, 1 - Math.abs(panelProgress - 0.5))))})`;
                            }
                        }
                    }
                });
            });
            
            return () => {
                // Cleanup
                scrollTween.kill();
            };
        });
        
        // Mobile - keep regular horizontal scroll
        mm.add("(max-width: 767px)", () => {
            // Reset any transforms
            gsap.set(ritualsTrack, { x: 0 });
            gsap.set(panels, { scale: 1, opacity: 1 });
        });
        
        // Refresh ScrollTrigger on window resize
        ScrollTrigger.addEventListener("refreshInit", () => gsap.set(ritualsTrack, { x: 0 }));
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRitualsScroll);
    } else {
        initRitualsScroll();
    }
})();