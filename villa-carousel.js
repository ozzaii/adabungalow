// Villa Image Carousel Functionality
(function() {
    'use strict';

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', initCarousels);

    function initCarousels() {
        // Get all villa carousels
        const carousels = document.querySelectorAll('.villa-carousel');

        if (!carousels.length) return;

        carousels.forEach(carousel => {
            setupCarousel(carousel);
        });
    }

    function setupCarousel(carousel) {
        const images = carousel.querySelectorAll('.villa-image');
        const dots = carousel.querySelectorAll('.dot');

        if (!images.length || !dots.length) return;

        let currentIndex = 0;
        let autoPlayInterval;

        // Set up dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
                resetAutoPlay();
            });
        });

        // Auto-play functionality (switch every 5 seconds)
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Show specific image
        function showImage(index) {
            // Hide all images and deactivate all dots
            images.forEach(img => {
                img.classList.remove('active');
            });
            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            // Show selected image and activate corresponding dot
            images[index].classList.add('active');
            dots[index].classList.add('active');

            currentIndex = index;
        }

        // Add touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    currentIndex = (currentIndex + 1) % images.length;
                } else {
                    // Swipe right - previous image
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                }
                showImage(currentIndex);
                resetAutoPlay();
            }
        }

        // Add keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
                resetAutoPlay();
            }
        });

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoPlay();
        });

        // Start auto-play
        startAutoPlay();

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(autoPlayInterval);
        });
    }

    // Also add click-to-expand functionality for better UX
    document.querySelectorAll('.villa-image').forEach(img => {
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', function(e) {
            // Don't expand if clicking on dots
            if (e.target.classList.contains('dot')) return;

            // Create lightbox for expanded view
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: zoom-out;
                animation: fadeIn 0.3s ease;
            `;

            const expandedImg = document.createElement('img');
            expandedImg.src = this.src;
            expandedImg.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
                animation: zoomIn 0.3s ease;
            `;

            lightbox.appendChild(expandedImg);
            document.body.appendChild(lightbox);

            // Close on click
            lightbox.addEventListener('click', () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });

            // Close on escape key
            const closeOnEscape = (e) => {
                if (e.key === 'Escape' && document.body.contains(lightbox)) {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            };
            document.addEventListener('keydown', closeOnEscape);
        });
    });

    // Add necessary animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes zoomIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

})();