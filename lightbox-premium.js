/* ═══════════════════════════════════════════════════════════════════════════════
   LIGHTBOX PREMIUM - CINEMATIC GALLERY EXPERIENCE
   Origin transform, keyboard nav, swipe, captions
   ═══════════════════════════════════════════════════════════════════════════════ */

class LightboxPremium {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.lightbox = null;
        this.lightboxImage = null;
        this.isOpen = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Get all gallery images
        const galleryItems = document.querySelectorAll('.gallery-item');
        this.images = Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('.gallery-image');
            return {
                src: img.dataset.fullSrc || img.src,
                alt: img.alt,
                caption: item.dataset.caption || '',
                element: item,
                index: index
            };
        });

        if (!this.images.length) return;

        // Create enhanced lightbox
        this.createLightbox();

        // Bind gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => this.open(index));
        });
    }

    createLightbox() {
        // Remove old lightbox if exists
        const oldLightbox = document.querySelector('.lightbox');
        if (oldLightbox) oldLightbox.remove();

        // Create new premium lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-premium';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <button class="lightbox-close" aria-label="Close gallery">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            <button class="lightbox-nav lightbox-next" aria-label="Next image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
            <div class="lightbox-container">
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
                <div class="lightbox-counter"></div>
            </div>
        `;

        document.body.appendChild(lightbox);

        this.lightbox = lightbox;
        this.lightboxImage = lightbox.querySelector('.lightbox-image');

        // Bind controls
        this.bindControls();
    }

    bindControls() {
        // Close button
        this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());

        // Navigation buttons
        this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

        // Click backdrop to close
        this.lightbox.querySelector('.lightbox-backdrop').addEventListener('click', () => this.close());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });

        // Touch/Swipe support
        this.lightbox.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.lightbox.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        if (diff > 0) {
            // Swipe left - next image
            this.next();
        } else {
            // Swipe right - previous image
            this.prev();
        }
    }

    open(index) {
        this.currentIndex = index;
        this.isOpen = true;

        // Get origin position for animation
        const originElement = this.images[index].element;
        const rect = originElement.getBoundingClientRect();

        // Set image
        const imageData = this.images[index];
        this.lightboxImage.src = imageData.src;
        this.lightboxImage.alt = imageData.alt;

        // Set caption
        const caption = this.lightbox.querySelector('.lightbox-caption');
        if (imageData.caption) {
            caption.textContent = imageData.caption;
            caption.style.display = 'block';
        } else {
            caption.style.display = 'none';
        }

        // Set counter
        const counter = this.lightbox.querySelector('.lightbox-counter');
        counter.textContent = `${index + 1} / ${this.images.length}`;

        // Update nav buttons
        this.updateNavButtons();

        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Origin transform animation (CLAUDE.md spec: 400-500ms)
        requestAnimationFrame(() => {
            this.lightboxImage.style.transformOrigin = `${rect.left + rect.width/2}px ${rect.top + rect.height/2}px`;
            this.lightboxImage.style.transform = `scale(0.2)`;
            this.lightboxImage.style.opacity = '0';

            requestAnimationFrame(() => {
                this.lightboxImage.style.transition = 'all 450ms cubic-bezier(0.2, 0.8, 0.2, 1)';
                this.lightboxImage.style.transform = 'scale(1)';
                this.lightboxImage.style.opacity = '1';
            });
        });
    }

    close() {
        if (!this.isOpen) return;

        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;

        // Reset transform
        setTimeout(() => {
            this.lightboxImage.style.transform = '';
            this.lightboxImage.style.transition = '';
        }, 300);
    }

    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.updateImage('next');
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateImage('prev');
        }
    }

    updateImage(direction = 'next') {
        const imageData = this.images[this.currentIndex];

        // Slide animation
        const slideDistance = direction === 'next' ? -30 : 30;
        this.lightboxImage.style.transition = 'all 280ms cubic-bezier(0.2, 0.8, 0.2, 1)';
        this.lightboxImage.style.transform = `translateX(${slideDistance}px)`;
        this.lightboxImage.style.opacity = '0.4';

        setTimeout(() => {
            // Update image
            this.lightboxImage.src = imageData.src;
            this.lightboxImage.alt = imageData.alt;

            // Update caption
            const caption = this.lightbox.querySelector('.lightbox-caption');
            if (imageData.caption) {
                caption.textContent = imageData.caption;
                caption.style.display = 'block';
            } else {
                caption.style.display = 'none';
            }

            // Update counter
            const counter = this.lightbox.querySelector('.lightbox-counter');
            counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;

            // Update nav buttons
            this.updateNavButtons();

            // Slide in
            requestAnimationFrame(() => {
                this.lightboxImage.style.transform = 'translateX(0)';
                this.lightboxImage.style.opacity = '1';
            });
        }, 140);
    }

    updateNavButtons() {
        const prevBtn = this.lightbox.querySelector('.lightbox-prev');
        const nextBtn = this.lightbox.querySelector('.lightbox-next');

        prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';

        nextBtn.style.opacity = this.currentIndex === this.images.length - 1 ? '0.3' : '1';
        nextBtn.style.pointerEvents = this.currentIndex === this.images.length - 1 ? 'none' : 'auto';
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.lightboxPremium = new LightboxPremium();
});
