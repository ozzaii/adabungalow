// Navigation Enhancements - Smooth scrolling and smart navigation
(function() {
    'use strict';

    class NavigationEnhancer {
        constructor() {
            this.header = document.querySelector('.header-minimal');
            this.sections = [];
            this.currentSection = null;
            this.scrollTimeout = null;
            this.lastScrollY = 0;
            this.init();
        }

        init() {
            this.setupSmoothScrolling();
            this.setupIntelligentHeader();
            this.setupScrollSpy();
            this.setupKeyboardNavigation();
            this.setupTouchGestures();
            this.addNavigationIndicators();
        }

        setupSmoothScrolling() {
            // Enhanced smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const target = document.querySelector(targetId);
                    if (!target) return;

                    // Calculate offset for fixed header
                    const headerHeight = this.header ? this.header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

                    // Smooth scroll with easing
                    this.smoothScrollTo(targetPosition, 800);
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, targetId);
                    
                    // Announce to screen readers
                    this.announceNavigation(target);
                });
            });
        }

        smoothScrollTo(targetY, duration) {
            const startY = window.scrollY;
            const difference = targetY - startY;
            const startTime = performance.now();

            const easeInOutCubic = (t) => {
                return t < 0.5 
                    ? 4 * t * t * t 
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };

            const step = () => {
                const progress = (performance.now() - startTime) / duration;
                
                if (progress < 1) {
                    const ease = easeInOutCubic(progress);
                    window.scrollTo(0, startY + difference * ease);
                    requestAnimationFrame(step);
                } else {
                    window.scrollTo(0, targetY);
                }
            };

            requestAnimationFrame(step);
        }

        setupIntelligentHeader() {
            if (!this.header) return;

            let scrollDirection = 'up';
            let lastScrollY = window.scrollY;
            let ticking = false;

            const updateHeader = () => {
                const currentScrollY = window.scrollY;
                
                // Determine scroll direction
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    scrollDirection = 'down';
                } else if (currentScrollY < lastScrollY) {
                    scrollDirection = 'up';
                }

                // Show/hide header based on scroll
                if (scrollDirection === 'down' && currentScrollY > 200) {
                    this.header.classList.add('header-hidden');
                } else {
                    this.header.classList.remove('header-hidden');
                }

                // Add scrolled state
                if (currentScrollY > 50) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }

                lastScrollY = currentScrollY;
                ticking = false;
            };

            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateHeader);
                    ticking = true;
                }
            }, { passive: true });
        }

        setupScrollSpy() {
            // Track which section is currently in view
            const sections = document.querySelectorAll('section[id]');
            if (sections.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };

            const observerCallback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.currentSection = entry.target.id;
                        this.updateActiveNavItem(entry.target.id);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);
            sections.forEach(section => observer.observe(section));
        }

        updateActiveNavItem(sectionId) {
            // Update navigation indicators
            document.querySelectorAll('.nav-indicator').forEach(indicator => {
                indicator.classList.remove('active');
                if (indicator.dataset.section === sectionId) {
                    indicator.classList.add('active');
                }
            });

            // Update any navigation menu items
            document.querySelectorAll(`a[href="#${sectionId}"]`).forEach(link => {
                link.classList.add('active');
            });
        }

        setupKeyboardNavigation() {
            // Enhanced keyboard navigation
            document.addEventListener('keydown', (e) => {
                // Arrow keys for section navigation
                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                    e.preventDefault();
                    this.navigateToNextSection();
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                    e.preventDefault();
                    this.navigateToPreviousSection();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    this.smoothScrollTo(0, 500);
                } else if (e.key === 'End') {
                    e.preventDefault();
                    this.smoothScrollTo(document.body.scrollHeight, 500);
                }
            });
        }

        setupTouchGestures() {
            // Touch gesture support for mobile navigation
            let touchStartY = 0;
            let touchEndY = 0;

            document.addEventListener('touchstart', (e) => {
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            document.addEventListener('touchend', (e) => {
                touchEndY = e.changedTouches[0].screenY;
                this.handleSwipeGesture(touchStartY, touchEndY);
            }, { passive: true });
        }

        handleSwipeGesture(startY, endY) {
            const swipeThreshold = 50;
            const difference = startY - endY;

            if (Math.abs(difference) < swipeThreshold) return;

            // Quick swipe navigation between sections
            if (difference > swipeThreshold * 2) {
                // Swipe up - next section
                this.navigateToNextSection();
            } else if (difference < -swipeThreshold * 2) {
                // Swipe down - previous section
                this.navigateToPreviousSection();
            }
        }

        navigateToNextSection() {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentIndex = sections.findIndex(s => s.id === this.currentSection);
            
            if (currentIndex < sections.length - 1) {
                const nextSection = sections[currentIndex + 1];
                const headerHeight = this.header ? this.header.offsetHeight : 0;
                const targetY = nextSection.offsetTop - headerHeight;
                this.smoothScrollTo(targetY, 600);
            }
        }

        navigateToPreviousSection() {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentIndex = sections.findIndex(s => s.id === this.currentSection);
            
            if (currentIndex > 0) {
                const prevSection = sections[currentIndex - 1];
                const headerHeight = this.header ? this.header.offsetHeight : 0;
                const targetY = prevSection.offsetTop - headerHeight;
                this.smoothScrollTo(targetY, 600);
            }
        }

        addNavigationIndicators() {
            // Create side navigation dots
            const sections = document.querySelectorAll('section[id]');
            if (sections.length === 0) return;

            const nav = document.createElement('nav');
            nav.className = 'side-navigation';
            nav.setAttribute('aria-label', 'Page sections');

            sections.forEach((section, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'nav-indicator';
                indicator.dataset.section = section.id;
                indicator.setAttribute('aria-label', `Go to ${section.getAttribute('aria-label') || `section ${index + 1}`}`);
                
                indicator.addEventListener('click', () => {
                    const headerHeight = this.header ? this.header.offsetHeight : 0;
                    const targetY = section.offsetTop - headerHeight;
                    this.smoothScrollTo(targetY, 600);
                });

                nav.appendChild(indicator);
            });

            document.body.appendChild(nav);
        }

        announceNavigation(target) {
            // Create announcement for screen readers
            const announcement = document.createElement('div');
            announcement.className = 'sr-only';
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.textContent = `Navigated to ${target.getAttribute('aria-label') || target.id || 'section'}`;
            
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        }
    }

    // Quick Navigation Menu
    class QuickNav {
        constructor() {
            this.init();
        }

        init() {
            this.createQuickNavMenu();
            this.setupQuickNavTrigger();
        }

        createQuickNavMenu() {
            const quickNav = document.createElement('div');
            quickNav.className = 'quick-nav';
            quickNav.innerHTML = `
                <button class="quick-nav-trigger" aria-label="Quick navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="quick-nav-menu" role="navigation" aria-label="Quick navigation">
                    <a href="#hero" class="quick-nav-item">Home</a>
                    <a href="#villas" class="quick-nav-item">Villas</a>
                    <a href="#amenities" class="quick-nav-item">Amenities</a>
                    <a href="#gallery" class="quick-nav-item">Gallery</a>
                    <a href="#availability" class="quick-nav-item">Book Now</a>
                </div>
            `;
            document.body.appendChild(quickNav);
        }

        setupQuickNavTrigger() {
            const trigger = document.querySelector('.quick-nav-trigger');
            const menu = document.querySelector('.quick-nav-menu');
            
            trigger.addEventListener('click', () => {
                menu.classList.toggle('active');
                trigger.classList.toggle('active');
                
                // Trap focus when menu is open
                if (menu.classList.contains('active')) {
                    this.trapFocus(menu);
                }
            });

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    trigger.classList.remove('active');
                    trigger.focus();
                }
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.quick-nav')) {
                    menu.classList.remove('active');
                    trigger.classList.remove('active');
                }
            });
        }

        trapFocus(element) {
            const focusableElements = element.querySelectorAll(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            element.addEventListener('keydown', (e) => {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            });

            firstFocusable.focus();
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new NavigationEnhancer();
            new QuickNav();
        });
    } else {
        new NavigationEnhancer();
        new QuickNav();
    }
})();