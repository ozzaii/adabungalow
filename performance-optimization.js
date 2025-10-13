// ═══════════════════════════════════════════════════════════════════════════════
// ADA BUNGALOW - 60FPS PERFORMANCE OPTIMIZATION
// Ensures buttery smooth animations and transitions across the entire site
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Performance configuration
    const config = {
        enableGPUAcceleration: true,
        enableDynamicWillChange: true,
        enableScrollOptimization: true,
        enableImageOptimization: true,
        throttleDelay: 16, // ~60fps
        rafThrottle: true
    };

    // ═══════════════════════════════════════════════════════════════════════════════
    // 1. GPU ACCELERATION SETUP
    // Force GPU compositing for heavy animation elements
    // ═══════════════════════════════════════════════════════════════════════════════

    function forceGPUAcceleration() {
        if (!config.enableGPUAcceleration) return;

        const gpuElements = [
            '.hero-image',
            '.hero-supreme',
            '.villa-image',
            '.ritual-panel',
            '.rituals-track',
            '.gallery-item',
            '.lightbox',
            '.lightbox-image',
            '.booking-card',
            '.btn',
            '.badge'
        ];

        gpuElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.transform = 'translate3d(0, 0, 0)';
                el.style.backfaceVisibility = 'hidden';
                el.style.perspective = '1000px';
            });
        });

        console.log('✓ GPU acceleration enabled for', gpuElements.length, 'element types');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 2. DYNAMIC WILL-CHANGE MANAGEMENT
    // Add/remove will-change only when needed to avoid memory issues
    // ═══════════════════════════════════════════════════════════════════════════════

    const willChangeManager = {
        activeElements: new Map(),

        add(element, properties) {
            if (!config.enableDynamicWillChange || !element) return;

            const key = element.dataset.willChangeKey || Math.random().toString(36);
            element.dataset.willChangeKey = key;

            element.style.willChange = properties;
            this.activeElements.set(key, { element, timeout: null });

            // Auto-remove after 1 second of no activity
            if (this.activeElements.get(key).timeout) {
                clearTimeout(this.activeElements.get(key).timeout);
            }

            const timeout = setTimeout(() => {
                this.remove(element);
            }, 1000);

            this.activeElements.get(key).timeout = timeout;
        },

        remove(element) {
            if (!element) return;

            const key = element.dataset.willChangeKey;
            if (key && this.activeElements.has(key)) {
                element.style.willChange = 'auto';
                const data = this.activeElements.get(key);
                if (data.timeout) clearTimeout(data.timeout);
                this.activeElements.delete(key);
            }
        },

        clearAll() {
            this.activeElements.forEach(data => {
                if (data.element) {
                    data.element.style.willChange = 'auto';
                }
                if (data.timeout) clearTimeout(data.timeout);
            });
            this.activeElements.clear();
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════════
    // 3. OPTIMIZED SCROLL HANDLING
    // Use RAF and passive listeners for smooth scrolling
    // ═══════════════════════════════════════════════════════════════════════════════

    const scrollOptimizer = {
        ticking: false,
        lastScrollY: 0,
        callbacks: new Set(),

        init() {
            if (!config.enableScrollOptimization) return;

            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
            console.log('✓ Scroll optimization enabled');
        },

        handleScroll() {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.callbacks.forEach(callback => callback(window.scrollY));
                    this.lastScrollY = window.scrollY;
                    this.ticking = false;
                });
                this.ticking = true;
            }
        },

        addCallback(callback) {
            this.callbacks.add(callback);
        },

        removeCallback(callback) {
            this.callbacks.delete(callback);
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════════
    // 4. IMAGE OPTIMIZATION
    // Lazy load and optimize images for performance
    // ═══════════════════════════════════════════════════════════════════════════════

    function optimizeImages() {
        if (!config.enableImageOptimization) return;

        const images = document.querySelectorAll('img');
        let optimizedCount = 0;

        images.forEach(img => {
            // Force GPU rendering
            img.style.transform = 'translate3d(0, 0, 0)';

            // Enable native lazy loading if not already set
            if (!img.loading) {
                img.loading = 'lazy';
            }

            // Decode images asynchronously
            if (img.decode && !img.complete) {
                img.decode().catch(() => {
                    // Decode failed, image will load normally
                });
            }

            optimizedCount++;
        });

        console.log('✓ Optimized', optimizedCount, 'images');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 5. HOVER PERFORMANCE OPTIMIZATION
    // Manage will-change on hover for smooth interactions
    // ═══════════════════════════════════════════════════════════════════════════════

    function optimizeHoverEffects() {
        const hoverElements = [
            { selector: '.btn', properties: 'transform, box-shadow' },
            { selector: '.badge', properties: 'transform, box-shadow' },
            { selector: '.villa-chapter', properties: 'transform' },
            { selector: '.ritual-panel', properties: 'transform, box-shadow' },
            { selector: '.gallery-item', properties: 'transform' },
            { selector: '.trust-badge', properties: 'transform' },
            { selector: '.footer-link', properties: 'color' },
            { selector: '.lang-dropdown', properties: 'transform, box-shadow' }
        ];

        hoverElements.forEach(({ selector, properties }) => {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    willChangeManager.add(el, properties);
                });

                el.addEventListener('mouseleave', () => {
                    setTimeout(() => willChangeManager.remove(el), 300);
                });
            });
        });

        console.log('✓ Hover effects optimized for', hoverElements.length, 'element types');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 6. ANIMATION FRAME THROTTLING
    // Throttle expensive operations to maintain 60fps
    // ═══════════════════════════════════════════════════════════════════════════════

    function throttleRAF(callback) {
        let ticking = false;
        return function(...args) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    callback.apply(this, args);
                    ticking = false;
                });
                ticking = true;
            }
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 7. LAYER CONTAINMENT
    // Use CSS containment for better rendering performance
    // ═══════════════════════════════════════════════════════════════════════════════

    function applyContainment() {
        const containmentRules = [
            { selector: '.villa-chapter', value: 'layout style paint' },
            { selector: '.ritual-panel', value: 'layout style paint' },
            { selector: '.gallery-item', value: 'layout style paint' },
            { selector: '.booking-card', value: 'layout style paint' },
            { selector: '.footer-content', value: 'layout style' }
        ];

        containmentRules.forEach(({ selector, value }) => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.contain = value;
            });
        });

        console.log('✓ Layer containment applied');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 8. INTERSECTION OBSERVER OPTIMIZATION
    // Batch DOM operations for better performance
    // ═══════════════════════════════════════════════════════════════════════════════

    function optimizeIntersectionObservers() {
        // Batch will-change additions for elements entering viewport
        const observerOptions = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        const animatedElements = document.querySelectorAll(
            '.villa-chapter, .ritual-panel, .gallery-item, .booking-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    willChangeManager.add(entry.target, 'transform, opacity');
                    entry.target.style.visibility = 'visible';
                } else {
                    willChangeManager.remove(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));

        console.log('✓ Intersection observers optimized for', animatedElements.length, 'elements');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 9. PASSIVE EVENT LISTENERS
    // Add passive flag to all scroll/touch events
    // ═══════════════════════════════════════════════════════════════════════════════

    function ensurePassiveListeners() {
        // Override addEventListener for scroll and touch events
        const originalAddEventListener = EventTarget.prototype.addEventListener;

        EventTarget.prototype.addEventListener = function(type, listener, options) {
            const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove', 'touchend'];

            if (passiveEvents.includes(type)) {
                if (typeof options === 'object') {
                    options.passive = options.passive !== false;
                } else {
                    options = { passive: true };
                }
            }

            return originalAddEventListener.call(this, type, listener, options);
        };

        console.log('✓ Passive event listeners enforced');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 10. RESIZE OPTIMIZATION
    // Debounce resize events and batch updates
    // ═══════════════════════════════════════════════════════════════════════════════

    function optimizeResize() {
        let resizeTimeout;

        window.addEventListener('resize', () => {
            // Clear any pending operations
            if (resizeTimeout) {
                cancelAnimationFrame(resizeTimeout);
            }

            // Batch resize operations
            resizeTimeout = requestAnimationFrame(() => {
                // Clear will-change during resize
                willChangeManager.clearAll();

                // Trigger GSAP refresh if available
                if (window.ScrollTrigger) {
                    ScrollTrigger.refresh();
                }

                // Re-optimize after resize
                setTimeout(() => {
                    forceGPUAcceleration();
                    applyContainment();
                }, 100);
            });
        }, { passive: true });

        console.log('✓ Resize optimization enabled');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 11. PERFORMANCE MONITORING
    // Track FPS and long tasks
    // ═══════════════════════════════════════════════════════════════════════════════

    const performanceMonitor = {
        fps: 60,
        frames: [],
        lastTime: performance.now(),

        init() {
            if (window.location.search.includes('debug-perf')) {
                this.startMonitoring();
            }
        },

        startMonitoring() {
            const measure = (time) => {
                this.frames.push(time);
                if (this.frames.length > 60) this.frames.shift();

                if (time - this.lastTime > 1000) {
                    this.fps = Math.round(this.frames.length);
                    this.lastTime = time;

                    if (this.fps < 55) {
                        console.warn('⚠ FPS dropped to', this.fps);
                    }
                }

                requestAnimationFrame(measure);
            };

            requestAnimationFrame(measure);
            console.log('✓ Performance monitoring started (add ?debug-perf to URL)');
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════════
    // 12. CONTENT VISIBILITY OPTIMIZATION
    // Use content-visibility for off-screen sections
    // ═══════════════════════════════════════════════════════════════════════════════

    function applyContentVisibility() {
        // Apply content-visibility to large sections
        const sections = document.querySelectorAll(
            '.chapter-villas, .chapter-rituals, .chapter-gallery, .chapter-availability, .footer-luxury'
        );

        sections.forEach(section => {
            section.style.contentVisibility = 'auto';
            section.style.containIntrinsicSize = '0 500px'; // Estimate height
        });

        console.log('✓ Content visibility applied to', sections.length, 'sections');
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════════════

    function init() {
        // Don't optimize if reduced motion is preferred
        if (prefersReducedMotion) {
            console.log('✓ Reduced motion preferred - performance optimizations skipped');
            return;
        }

        console.log('🚀 Initializing 60fps performance optimizations...');

        // Run optimizations in order
        ensurePassiveListeners();
        forceGPUAcceleration();
        optimizeImages();
        applyContainment();
        applyContentVisibility();
        scrollOptimizer.init();
        optimizeIntersectionObservers();
        optimizeHoverEffects();
        optimizeResize();
        performanceMonitor.init();

        console.log('✨ Performance optimizations complete - targeting 60fps');

        // Expose for debugging
        if (window.location.search.includes('debug')) {
            window.adaPerformance = {
                willChangeManager,
                scrollOptimizer,
                performanceMonitor,
                config
            };
            console.log('🔧 Debug mode: window.adaPerformance available');
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        willChangeManager.clearAll();
    });

})();
