// Advanced Performance Optimization for Ada Bungalow
// Implements lazy loading, intersection observer, and resource hints

(function() {
    'use strict';

    // 1. Advanced Lazy Loading with Native Loading and Intersection Observer
    class ImageOptimizer {
        constructor() {
            this.imageObserver = null;
            this.loadedImages = new Set();
            this.init();
        }

        init() {
            // Use native lazy loading where supported
            if ('loading' in HTMLImageElement.prototype) {
                this.setupNativeLazyLoading();
            } else {
                this.setupIntersectionObserver();
            }
            
            // Preload critical images
            this.preloadCriticalImages();
            
            // Setup progressive image loading
            this.setupProgressiveLoading();
        }

        setupNativeLazyLoading() {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.loading = 'lazy';
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
            });
        }

        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '50px',
                threshold: 0.01
            };

            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.imageObserver.observe(img);
            });
        }

        loadImage(img) {
            if (this.loadedImages.has(img)) return;
            
            const src = img.dataset.src;
            if (!src) return;

            // Create a new image to preload
            const tempImg = new Image();
            
            tempImg.onload = () => {
                img.src = src;
                img.classList.add('loaded');
                this.loadedImages.add(img);
                
                // Add blur-up effect
                if (img.dataset.placeholder) {
                    setTimeout(() => {
                        img.style.filter = 'none';
                    }, 50);
                }
            };

            tempImg.src = src;
        }

        preloadCriticalImages() {
            // Preload hero image
            const heroImage = document.querySelector('.hero-image');
            if (heroImage && heroImage.dataset.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = heroImage.dataset.src;
                document.head.appendChild(link);
            }
        }

        setupProgressiveLoading() {
            // Load low-quality placeholders first
            document.querySelectorAll('img[data-placeholder]').forEach(img => {
                const placeholder = img.dataset.placeholder;
                if (placeholder) {
                    img.style.filter = 'blur(5px)';
                    img.style.transition = 'filter 0.3s ease-out';
                    img.src = placeholder;
                }
            });
        }
    }

    // 2. Advanced Animation Observer
    class AnimationOptimizer {
        constructor() {
            this.animationObserver = null;
            this.animatedElements = new Set();
            this.init();
        }

        init() {
            this.setupAnimationObserver();
            this.optimizeScrollAnimations();
            this.setupReducedMotion();
        }

        setupAnimationObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
            };

            this.animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const element = entry.target;
                    
                    if (entry.isIntersecting) {
                        // Progressive animation based on visibility
                        const visibilityRatio = entry.intersectionRatio;
                        
                        if (visibilityRatio > 0.1 && !this.animatedElements.has(element)) {
                            this.triggerAnimation(element, visibilityRatio);
                            this.animatedElements.add(element);
                        }
                        
                        // Parallax effects based on scroll position
                        if (element.dataset.parallax) {
                            this.updateParallax(element, visibilityRatio);
                        }
                    }
                });
            }, options);

            // Observe all animatable elements
            document.querySelectorAll('[data-animate], [data-parallax]').forEach(el => {
                this.animationObserver.observe(el);
            });
        }

        triggerAnimation(element, ratio) {
            const animationType = element.dataset.animate || 'fade';
            const delay = parseInt(element.dataset.animateDelay || 0);
            
            setTimeout(() => {
                element.classList.add('animate-in', `animate-${animationType}`);
                
                // Stagger children animations
                if (element.dataset.stagger) {
                    this.staggerChildren(element);
                }
            }, delay);
        }

        staggerChildren(parent) {
            const children = parent.querySelectorAll('[data-stagger-child]');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('stagger-in');
                }, index * 60);
            });
        }

        updateParallax(element, ratio) {
            const speed = parseFloat(element.dataset.parallax || 0.5);
            const yPos = -(ratio * 100 * speed);
            element.style.transform = `translateY(${yPos}px)`;
        }

        optimizeScrollAnimations() {
            let ticking = false;
            
            const updateAnimations = () => {
                // Batch DOM reads and writes
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                
                // Update scroll-based animations
                requestAnimationFrame(() => {
                    // Update progress bar
                    const progress = (scrollY / (document.body.scrollHeight - windowHeight)) * 100;
                    const progressBar = document.querySelector('.scroll-progress');
                    if (progressBar) {
                        progressBar.style.width = `${progress}%`;
                    }
                    
                    // Update header state
                    const header = document.querySelector('.header-minimal');
                    if (header) {
                        if (scrollY > 100) {
                            header.classList.add('scrolled');
                        } else {
                            header.classList.remove('scrolled');
                        }
                    }
                });
                
                ticking = false;
            };
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateAnimations);
                    ticking = true;
                }
            }, { passive: true });
        }

        setupReducedMotion() {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            const handleMotionPreference = () => {
                if (prefersReducedMotion.matches) {
                    document.documentElement.classList.add('reduced-motion');
                    // Disable complex animations
                    if (window.lenis) {
                        window.lenis.destroy();
                    }
                } else {
                    document.documentElement.classList.remove('reduced-motion');
                }
            };
            
            handleMotionPreference();
            prefersReducedMotion.addEventListener('change', handleMotionPreference);
        }
    }

    // 3. Resource Hint Manager
    class ResourceOptimizer {
        constructor() {
            this.init();
        }

        init() {
            this.setupResourceHints();
            this.optimizeFonts();
            this.setupServiceWorker();
            this.implementCriticalCSS();
        }

        setupResourceHints() {
            // Preconnect to external domains
            const preconnects = [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://cdn.jsdelivr.net',
                'https://unpkg.com'
            ];
            
            preconnects.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
            
            // DNS prefetch for additional resources
            const dnsPrefetch = ['https://api.openweathermap.org'];
            dnsPrefetch.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = url;
                document.head.appendChild(link);
            });
        }

        optimizeFonts() {
            // Font display swap for better perceived performance
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.as = 'style';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:ital,wght@0,400;0,500;1,400&display=swap';
            fontLink.onload = function() {
                this.rel = 'stylesheet';
            };
            document.head.appendChild(fontLink);
        }

        setupServiceWorker() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    // Register service worker for offline support and caching
                    // Commented out for now - implement sw.js when ready
                    // navigator.serviceWorker.register('/sw.js');
                });
            }
        }

        implementCriticalCSS() {
            // Mark critical styles
            document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                if (link.href.includes('styles.css') || 
                    link.href.includes('hero-supreme.css')) {
                    link.setAttribute('rel', 'preload');
                    link.setAttribute('as', 'style');
                    link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
                }
            });
        }
    }

    // 4. Performance Monitor
    class PerformanceMonitor {
        constructor() {
            this.metrics = {};
            this.init();
        }

        init() {
            this.measureCoreWebVitals();
            this.trackResourceTiming();
            this.monitorMemoryUsage();
        }

        measureCoreWebVitals() {
            // Largest Contentful Paint (LCP)
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                console.log('LCP:', this.metrics.lcp);
            }).observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay (FID)
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    console.log('FID:', this.metrics.fid);
                });
            }).observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        this.metrics.cls = clsValue;
                    }
                }
            }).observe({ entryTypes: ['layout-shift'] });
        }

        trackResourceTiming() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const resources = performance.getEntriesByType('resource');
                    const slowResources = resources
                        .filter(r => r.duration > 500)
                        .map(r => ({
                            name: r.name.split('/').pop(),
                            duration: Math.round(r.duration),
                            size: r.transferSize
                        }));
                    
                    if (slowResources.length > 0) {
                        console.log('Slow resources:', slowResources);
                    }
                }, 1000);
            });
        }

        monitorMemoryUsage() {
            if (performance.memory) {
                setInterval(() => {
                    const memoryInfo = {
                        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
                    };
                    
                    if (memoryInfo.used > memoryInfo.total * 0.9) {
                        console.warn('High memory usage detected:', memoryInfo);
                    }
                }, 30000);
            }
        }
    }

    // 5. Initialize all optimizations
    document.addEventListener('DOMContentLoaded', () => {
        // Start optimizations after initial render
        requestIdleCallback(() => {
            new ImageOptimizer();
            new AnimationOptimizer();
            new ResourceOptimizer();
            new PerformanceMonitor();
        });
    });

    // Export for external use
    window.AdaPerformance = {
        ImageOptimizer,
        AnimationOptimizer,
        ResourceOptimizer,
        PerformanceMonitor
    };
})();