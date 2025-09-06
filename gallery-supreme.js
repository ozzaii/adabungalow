// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY SUPREME - INTERACTIVE LUXURY EXPERIENCE
// The Ultimate Visual Journey
// ═══════════════════════════════════════════════════════════════════════════════

class GallerySupreme {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        this.setupGalleryData();
        this.createGalleryDOM();
        this.initLightbox();
        this.initFilters();
        this.initParallax();
        this.initLazyLoad();
    }
    
    setupGalleryData() {
        this.images = [
            {
                src: 'images/bungalow-gallery/IMG_8723.JPG',
                title: 'Ada Bungalow Giriş',
                subtitle: 'Muhteşem karşılama',
                category: 'exterior',
                size: 'large',
                tag: 'VIP',
                tagClass: 'premium'
            },
            {
                src: 'images/bungalow-gallery/IMG_8744.JPG',
                title: 'Lüks İç Mekan',
                subtitle: 'Modern tasarım',
                category: 'interior',
                size: 'normal',
                tag: 'Özel',
                tagClass: ''
            },
            {
                src: 'images/bungalow-gallery/IMG_8746.JPG',
                title: 'Uzungöl Manzarası',
                subtitle: 'Nefes kesen görünüm',
                category: 'view',
                size: 'wide',
                tag: 'Popüler',
                tagClass: 'premium'
            },
            {
                src: 'images/bungalow-gallery/IMG_8754.JPG',
                title: 'Özel Havuz',
                subtitle: 'Kristal berraklığında',
                category: 'pool',
                size: 'tall',
                tag: 'Yeni',
                tagClass: 'new'
            },
            {
                src: 'images/bungalow-gallery/IMG_8758.JPG',
                title: 'Yaşam Alanı',
                subtitle: 'Konfor ve elegans',
                category: 'interior',
                size: 'normal',
                tag: 'Lüks',
                tagClass: ''
            },
            {
                src: 'images/bungalow-gallery/IMG_8760.JPG',
                title: 'Ana Yatak Odası',
                subtitle: 'Huzurlu dinlenme',
                category: 'interior',
                size: 'normal',
                tag: '3+1',
                tagClass: ''
            },
            {
                src: 'images/bungalow-gallery/IMG_8762.JPG',
                title: 'Teras Görünümü',
                subtitle: 'Açık hava keyfi',
                category: 'exterior',
                size: 'wide',
                tag: 'Manzaralı',
                tagClass: 'premium'
            },
            {
                src: 'images/bungalow-gallery/IMG_8766.JPG',
                title: 'Gece Manzarası',
                subtitle: 'Büyüleyici atmosfer',
                category: 'view',
                size: 'normal',
                tag: 'Romantik',
                tagClass: ''
            }
        ];
    }
    
    createGalleryDOM() {
        const gallery = document.querySelector('.gallery-excellence');
        if (!gallery) return;
        
        // Update header
        const header = gallery.querySelector('.section-header');
        if (header) {
            header.innerHTML = `
                <div class="gallery-badge" data-aos="fade-down">
                    <p class="gallery-label">Galeri</p>
                </div>
                <h2 class="gallery-title" data-aos="fade-up" data-aos-delay="100">Görsel Şölen</h2>
                <p class="gallery-subtitle" data-aos="fade-up" data-aos-delay="200">
                    Her kare, unutulmaz anılarınızın başlangıcı
                </p>
            `;
        }
        
        // Add filters
        const filtersHTML = `
            <div class="gallery-filters" data-aos="fade-up" data-aos-delay="300">
                <button class="filter-btn active" data-filter="all">Tümü</button>
                <button class="filter-btn" data-filter="exterior">Dış Mekan</button>
                <button class="filter-btn" data-filter="interior">İç Mekan</button>
                <button class="filter-btn" data-filter="view">Manzara</button>
                <button class="filter-btn" data-filter="pool">Havuz</button>
            </div>
        `;
        
        // Create new grid
        const gridHTML = `
            <div class="gallery-grid-supreme">
                ${this.images.map((img, index) => `
                    <figure class="gallery-item-supreme ${img.size}" 
                            data-category="${img.category}"
                            data-index="${index}"
                            data-parallax>
                        ${img.tag ? `<span class="photo-tag ${img.tagClass}">${img.tag}</span>` : ''}
                        <div class="gallery-loading"></div>
                        <img data-src="${img.src}" 
                             alt="${img.title}"
                             class="lazy">
                        <div class="gallery-overlay"></div>
                        <div class="gallery-caption">
                            <h3 class="caption-title">${img.title}</h3>
                            <p class="caption-subtitle">${img.subtitle}</p>
                        </div>
                        <div class="gallery-view-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M15 3h6v6l-2.29-2.29-4.88 4.88-4-4L4 13.41 2.59 12l7.17-7.17 4 4L18.71 3H15zm-3 9v10H2V12h10z"/>
                            </svg>
                        </div>
                    </figure>
                `).join('')}
            </div>
        `;
        
        // Create lightbox
        const lightboxHTML = `
            <div class="gallery-lightbox" id="galleryLightbox">
                <div class="lightbox-content">
                    <img class="lightbox-image" id="lightboxImage" alt="">
                    <button class="lightbox-close" id="lightboxClose">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                    </button>
                    <button class="lightbox-nav lightbox-prev" id="lightboxPrev">
                        <svg viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
                        </svg>
                    </button>
                    <button class="lightbox-nav lightbox-next" id="lightboxNext">
                        <svg viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Replace gallery grid
        const container = gallery.querySelector('.container');
        const oldGrid = container.querySelector('.gallery-grid');
        if (oldGrid) {
            oldGrid.remove();
        }
        
        // Add new elements
        header.insertAdjacentHTML('afterend', filtersHTML);
        container.insertAdjacentHTML('beforeend', gridHTML);
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    initLightbox() {
        const items = document.querySelectorAll('.gallery-item-supreme');
        const lightbox = document.getElementById('galleryLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        
        if (!lightbox) return;
        
        // Open lightbox
        items.forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.currentIndex = index;
                this.openLightbox(index);
            });
        });
        
        // Close lightbox
        closeBtn?.addEventListener('click', () => this.closeLightbox());
        lightbox?.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Navigation
        prevBtn?.addEventListener('click', () => this.navigateLightbox(-1));
        nextBtn?.addEventListener('click', () => this.navigateLightbox(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
            if (e.key === 'ArrowRight') this.navigateLightbox(1);
        });
    }
    
    openLightbox(index) {
        const lightbox = document.getElementById('galleryLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        
        if (!lightbox || !lightboxImage) return;
        
        const image = this.images[index];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        const lightbox = document.getElementById('galleryLightbox');
        if (!lightbox) return;
        
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    navigateLightbox(direction) {
        this.currentIndex += direction;
        
        if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        } else if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        }
        
        this.openLightbox(this.currentIndex);
    }
    
    initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.gallery-item-supreme');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter items
                items.forEach(item => {
                    const category = item.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    initParallax() {
        const items = document.querySelectorAll('[data-parallax]');
        
        if (items.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const speed = 0.5;
                const yPos = rect.top * speed;
                
                item.style.setProperty('--parallax-y', `${yPos}px`);
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    initLazyLoad() {
        const images = document.querySelectorAll('.gallery-item-supreme img.lazy');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    // Remove loading spinner
                    const loading = img.parentElement.querySelector('.gallery-loading');
                    
                    // Create new image to preload
                    const newImg = new Image();
                    newImg.onload = () => {
                        img.src = src;
                        img.classList.remove('lazy');
                        if (loading) loading.remove();
                        
                        // Add loaded class for animation
                        img.parentElement.classList.add('loaded');
                    };
                    newImg.src = src;
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GallerySupreme();
});