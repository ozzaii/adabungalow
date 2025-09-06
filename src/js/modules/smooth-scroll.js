import Lenis from 'lenis';

class SmoothScroll {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }
  
  init() {
    if (this.isMobile || 'ontouchstart' in window) {
      this.setupNativeScroll();
    } else {
      this.setupSmoothScroll();
    }
    
    this.setupAnchorLinks();
  }
  
  setupSmoothScroll() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    });
    
    const raf = (time) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);
  }
  
  setupNativeScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
  setupAnchorLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          
          if (this.lenis) {
            this.lenis.scrollTo(targetPosition);
          } else {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
  }
}

let smoothScroll;

document.addEventListener('DOMContentLoaded', () => {
  smoothScroll = new SmoothScroll();
});

window.addEventListener('resize', () => {
  if (smoothScroll) {
    smoothScroll.destroy();
    smoothScroll = new SmoothScroll();
  }
});