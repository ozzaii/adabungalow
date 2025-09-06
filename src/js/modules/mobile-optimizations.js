class MobileOptimizations {
  constructor() {
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.init();
  }
  
  init() {
    if (!this.isMobile) return;
    
    this.optimizePerformance();
    this.setupTouchHandling();
    this.setupMobileViewport();
    this.optimizeImages();
    this.setupPullToRefresh();
  }
  
  optimizePerformance() {
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    document.addEventListener('wheel', () => {}, { passive: true });
    
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      });
      
      observer.observe(video);
    });
  }
  
  setupTouchHandling() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].clientY;
      this.handleSwipe();
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
  
  handleSwipe() {
    const navbar = document.querySelector('.navbar');
    const swipeDistance = this.touchStartY - this.touchEndY;
    
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0 && window.scrollY > 100) {
        navbar?.classList.add('navbar-hidden');
      } else {
        navbar?.classList.remove('navbar-hidden');
      }
    }
  }
  
  setupMobileViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
    
    const addressBar = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', addressBar);
    addressBar();
    
    if (window.CSS && CSS.supports('height', '100dvh')) {
      document.documentElement.style.setProperty('--full-height', '100dvh');
    } else {
      document.documentElement.style.setProperty('--full-height', 'calc(var(--app-height, 100vh))');
    }
  }
  
  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      if (!img.getAttribute('decoding')) {
        img.decoding = 'async';
      }
      
      const src = img.src || img.dataset.src;
      if (src && !src.includes('placeholder')) {
        const width = img.getBoundingClientRect().width;
        
        if (width > 0 && width < 400) {
          img.dataset.mobileSrc = src.replace(/\.(jpg|jpeg|png)$/i, '-mobile.$1');
        }
      }
    });
    
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        images.forEach(img => {
          if (img.dataset.lowSrc) {
            img.src = img.dataset.lowSrc;
          }
        });
      }
    }
  }
  
  setupPullToRefresh() {
    let touchStartY = 0;
    let touchCurrentY = 0;
    const threshold = 150;
    
    const refreshIndicator = document.createElement('div');
    refreshIndicator.className = 'refresh-indicator';
    refreshIndicator.innerHTML = '<div class="refresh-spinner"></div>';
    document.body.appendChild(refreshIndicator);
    
    document.addEventListener('touchstart', (e) => {
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
      if (window.scrollY === 0 && touchStartY > 0) {
        touchCurrentY = e.touches[0].clientY;
        const distance = touchCurrentY - touchStartY;
        
        if (distance > 0 && distance < threshold * 2) {
          refreshIndicator.style.transform = `translateY(${Math.min(distance, threshold)}px)`;
          refreshIndicator.style.opacity = Math.min(distance / threshold, 1);
          
          if (distance > threshold) {
            refreshIndicator.classList.add('ready');
          } else {
            refreshIndicator.classList.remove('ready');
          }
        }
      }
    }, { passive: true });
    
    document.addEventListener('touchend', () => {
      const distance = touchCurrentY - touchStartY;
      
      if (distance > threshold && window.scrollY === 0) {
        refreshIndicator.classList.add('refreshing');
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        refreshIndicator.style.transform = '';
        refreshIndicator.style.opacity = '';
        refreshIndicator.classList.remove('ready');
      }
      
      touchStartY = 0;
      touchCurrentY = 0;
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MobileOptimizations();
});

const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
  .refresh-indicator {
    position: fixed;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 9999;
  }
  
  .refresh-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #ddd;
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .refresh-indicator.ready .refresh-spinner {
    border-top-color: var(--color-secondary);
  }
  
  .refresh-indicator.refreshing {
    animation: spin 0.5s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    .hero {
      height: var(--full-height, 100vh);
    }
    
    body {
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: transparent;
    }
    
    * {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }
    
    input,
    textarea {
      -webkit-user-select: text;
      user-select: text;
    }
  }
`;
document.head.appendChild(mobileStyles);