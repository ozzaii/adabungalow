/* ═══════════════════════════════════════════════════════════════════════════════
   LIQUID GLASS INTERACTIVE EFFECTS
   Mouse movement interactions, SVG filter animations, and dynamic highlights
   ═══════════════════════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLiquidGlass);
    } else {
        initLiquidGlass();
    }

    function initLiquidGlass() {
        console.log('[Liquid Glass] Initializing interactive effects...');

        // Add interactive classes to glass elements
        addInteractiveClasses();

        // Setup mouse tracking for all glass-interactive elements
        setupMouseTracking();

        // Setup SVG filter animations
        setupSVGFilterAnimations();

        // Setup scroll-based opacity adjustments
        setupScrollEffects();

        console.log('[Liquid Glass] Initialization complete!');
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       ADD INTERACTIVE CLASSES
       ───────────────────────────────────────────────────────────────────────────── */

    function addInteractiveClasses() {
        const glassElements = document.querySelectorAll('.villa-chapter, .booking-card, .ritual-panel');

        glassElements.forEach(element => {
            if (!element.classList.contains('glass-interactive')) {
                element.classList.add('glass-interactive');
            }
        });

        console.log(`[Liquid Glass] Added interactive class to ${glassElements.length} elements`);
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       MOUSE TRACKING FOR GLASS HIGHLIGHTS
       ───────────────────────────────────────────────────────────────────────────── */

    function setupMouseTracking() {
        const glassInteractiveElements = document.querySelectorAll('.glass-interactive');

        glassInteractiveElements.forEach(element => {
            let rafId = null;
            let lastX = 0;
            let lastY = 0;

            // Mousemove handler - THROTTLED with RAF
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Only update if mouse moved more than 5px (reduce calculations)
                if (Math.abs(x - lastX) < 5 && Math.abs(y - lastY) < 5) {
                    return;
                }

                lastX = x;
                lastY = y;

                // Cancel previous RAF if still pending
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }

                // Schedule update for next frame
                rafId = requestAnimationFrame(() => {
                    // Calculate percentages for CSS custom properties
                    const xPercent = (x / rect.width) * 100;
                    const yPercent = (y / rect.height) * 100;

                    // Update CSS custom properties for radial gradient positioning
                    this.style.setProperty('--mouse-x', `${xPercent}%`);
                    this.style.setProperty('--mouse-y', `${yPercent}%`);

                    // Update SVG filter distortion based on mouse position (desktop only)
                    if (!isMobile()) {
                        updateSVGDistortion(this, x, y, rect);
                    }

                    // Create specular highlight at mouse position (desktop only)
                    if (!isMobile()) {
                        updateSpecularHighlight(this, x, y);
                    }

                    rafId = null;
                });
            }.bind(element));

            // Mouseleave handler - reset effects
            element.addEventListener('mouseleave', function() {
                // Reset CSS custom properties
                this.style.removeProperty('--mouse-x');
                this.style.removeProperty('--mouse-y');

                // Reset SVG filter
                resetSVGDistortion();

                // Remove specular highlight
                removeSpecularHighlight(this);
            });
        });

        console.log(`[Liquid Glass] Mouse tracking enabled for ${glassInteractiveElements.length} elements`);
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       SVG FILTER DYNAMIC DISTORTION
       ───────────────────────────────────────────────────────────────────────────── */

    let currentScale = 77; // Default scale from SVG filter

    function updateSVGDistortion(element, x, y, rect) {
        // Only update if SVG filter exists
        const filter = document.querySelector('#glass-distortion feDisplacementMap');
        if (!filter) return;

        // Calculate distortion scale based on mouse distance from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distanceX = Math.abs(x - centerX);
        const distanceY = Math.abs(y - centerY);
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const currentDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const distanceRatio = currentDistance / maxDistance;

        // Scale ranges from 50 (center) to 100 (edges)
        const targetScale = 50 + (distanceRatio * 50);

        // Smooth interpolation
        currentScale += (targetScale - currentScale) * 0.15;

        // Apply to SVG filter
        filter.setAttribute('scale', currentScale.toFixed(2));
    }

    function resetSVGDistortion() {
        const filter = document.querySelector('#glass-distortion feDisplacementMap');
        if (!filter) return;

        // Smoothly return to default value
        const resetInterval = setInterval(() => {
            currentScale += (77 - currentScale) * 0.2;

            if (Math.abs(currentScale - 77) < 0.5) {
                currentScale = 77;
                clearInterval(resetInterval);
            }

            filter.setAttribute('scale', currentScale.toFixed(2));
        }, 16); // ~60fps
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       SPECULAR HIGHLIGHT EFFECT
       ───────────────────────────────────────────────────────────────────────────── */

    function updateSpecularHighlight(element, x, y) {
        // Find or create specular highlight element
        let specular = element.querySelector('.glass-specular-dynamic');

        if (!specular) {
            specular = document.createElement('div');
            specular.className = 'glass-specular-dynamic';
            specular.style.cssText = `
                position: absolute;
                inset: 0;
                border-radius: inherit;
                pointer-events: none;
                z-index: 5;
                transition: background 0.1s ease;
            `;
            element.appendChild(specular);
        }

        // Create radial gradient at mouse position
        specular.style.background = `
            radial-gradient(
                circle 200px at ${x}px ${y}px,
                rgba(255, 255, 255, 0.2) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                rgba(255, 255, 255, 0) 60%
            )
        `;
    }

    function removeSpecularHighlight(element) {
        const specular = element.querySelector('.glass-specular-dynamic');
        if (specular) {
            specular.style.opacity = '0';
            setTimeout(() => specular.remove(), 300);
        }
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       SVG FILTER ANIMATIONS
       ───────────────────────────────────────────────────────────────────────────── */

    function setupSVGFilterAnimations() {
        // Skip SVG animations on mobile for performance
        if (isMobile()) {
            console.log('[Liquid Glass] SVG animations disabled on mobile');
            return;
        }

        const turbulence = document.querySelector('#glass-distortion feTurbulence');
        if (!turbulence) {
            console.warn('[Liquid Glass] SVG filter not found in DOM');
            return;
        }

        let baseFrequency = 0.008;
        let time = 0;
        let frameCount = 0;

        // Animate turbulence frequency for liquid motion effect
        // UPDATE ONLY EVERY 3RD FRAME for performance (20fps instead of 60fps)
        function animateTurbulence() {
            frameCount++;

            if (frameCount % 3 === 0) {
                time += 0.0001;
                const newFrequency = baseFrequency + Math.sin(time) * 0.001;
                turbulence.setAttribute('baseFrequency', newFrequency.toFixed(6));
            }

            requestAnimationFrame(animateTurbulence);
        }

        // Start animation
        requestAnimationFrame(animateTurbulence);

        console.log('[Liquid Glass] SVG filter animation started (optimized 20fps)');
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       SCROLL-BASED GLASS EFFECTS
       ───────────────────────────────────────────────────────────────────────────── */

    function setupScrollEffects() {
        const glassElements = document.querySelectorAll('.glass-interactive');

        // Create Intersection Observer for scroll effects
        const observerOptions = {
            root: null,
            rootMargin: '-50px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Adjust glass opacity based on viewport position
                const opacity = entry.intersectionRatio;
                const element = entry.target;

                if (entry.isIntersecting) {
                    element.style.opacity = Math.max(0.6, opacity);

                    // Add subtle scale animation when entering viewport
                    if (opacity > 0.5 && !element.dataset.glassSeen) {
                        element.style.transform = 'translate3d(0, 0, 0) scale(1)';
                        element.dataset.glassSeen = 'true';
                    }
                }
            });
        }, observerOptions);

        // Observe all glass elements
        glassElements.forEach(element => {
            // Initial state for entrance animation
            element.style.opacity = '0.6';
            element.style.transform = 'translate3d(0, 0, 0) scale(0.98)';
            element.style.transition = 'opacity 0.6s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';

            observer.observe(element);
        });

        console.log(`[Liquid Glass] Scroll effects enabled for ${glassElements.length} elements`);
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       PERFORMANCE MONITORING (optional debug mode)
       ───────────────────────────────────────────────────────────────────────────── */

    if (window.location.search.includes('debug-glass')) {
        let frameCount = 0;
        let lastTime = performance.now();

        function measureFPS() {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime >= lastTime + 1000) {
                console.log(`[Liquid Glass FPS] ${frameCount} frames in last second`);
                frameCount = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(measureFPS);
        }

        requestAnimationFrame(measureFPS);
        console.log('[Liquid Glass] Performance monitoring enabled (?debug-glass)');
    }

    /* ─────────────────────────────────────────────────────────────────────────────
       MOBILE DETECTION & OPTIMIZATION
       ───────────────────────────────────────────────────────────────────────────── */

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth < 768;
    }

    if (isMobile()) {
        console.log('[Liquid Glass] Mobile device detected - disabling expensive effects');

        // Disable mouse tracking on mobile
        document.body.classList.add('glass-mobile-optimized');

        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            .glass-distortion-overlay {
                animation: none !important;
                opacity: 0.3 !important;
            }
            .glass-interactive::after {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

})();
