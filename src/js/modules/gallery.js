class Gallery {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.lightbox = null;
    this.init();
  }
  
  init() {
    if (!this.galleryItems.length) return;
    
    this.createLightbox();
    this.setupGalleryItems();
  }
  
  createLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Close">×</button>
      <button class="lightbox-prev" aria-label="Previous">‹</button>
      <button class="lightbox-next" aria-label="Next">›</button>
      <div class="lightbox-content">
        <img src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    
    document.body.appendChild(this.lightbox);
    
    this.setupLightboxControls();
  }
  
  setupGalleryItems() {
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.openLightbox(index);
      });
    });
  }
  
  setupLightboxControls() {
    const close = this.lightbox.querySelector('.lightbox-close');
    const prev = this.lightbox.querySelector('.lightbox-prev');
    const next = this.lightbox.querySelector('.lightbox-next');
    
    close.addEventListener('click', () => this.closeLightbox());
    prev.addEventListener('click', () => this.navigate(-1));
    next.addEventListener('click', () => this.navigate(1));
    
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    this.lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    });
  }
  
  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.navigate(1);
      } else {
        this.navigate(-1);
      }
    }
  }
  
  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightbox();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  navigate(direction) {
    this.currentIndex += direction;
    
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryItems.length - 1;
    } else if (this.currentIndex >= this.galleryItems.length) {
      this.currentIndex = 0;
    }
    
    this.updateLightbox();
  }
  
  updateLightbox() {
    const item = this.galleryItems[this.currentIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    
    const lightboxImg = this.lightbox.querySelector('img');
    const lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    if (caption) {
      lightboxCaption.textContent = caption.textContent;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Gallery();
});

const style = document.createElement('style');
style.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 10000;
  }
  
  .lightbox.active {
    opacity: 1;
    visibility: visible;
  }
  
  .lightbox-content {
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }
  
  .lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  
  .lightbox-close,
  .lightbox-prev,
  .lightbox-next {
    position: absolute;
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    padding: 1rem;
    transition: opacity 0.3s;
  }
  
  .lightbox-close {
    top: 1rem;
    right: 1rem;
  }
  
  .lightbox-prev {
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .lightbox-next {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .lightbox-close:hover,
  .lightbox-prev:hover,
  .lightbox-next:hover {
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    .lightbox-close,
    .lightbox-prev,
    .lightbox-next {
      font-size: 2rem;
      padding: 0.5rem;
    }
  }
`;
document.head.appendChild(style);