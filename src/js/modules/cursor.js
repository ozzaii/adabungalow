class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('[data-cursor]');
    this.follower = document.querySelector('[data-cursor-follower]');
    this.isMobile = 'ontouchstart' in window || window.innerWidth <= 1024;
    this.init();
  }
  
  init() {
    if (this.isMobile || !this.cursor || !this.follower) return;
    
    this.setupCursor();
    this.setupHoverEffects();
  }
  
  setupCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animateCursor = () => {
      cursorX = mouseX;
      cursorY = mouseY;
      
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      this.cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      this.follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      
      requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.follower.style.opacity = '0.5';
    });
    
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.follower.style.opacity = '0';
    });
  }
  
  setupHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .room-card');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('cursor-hover');
        this.follower.classList.add('cursor-hover');
      });
      
      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('cursor-hover');
        this.follower.classList.remove('cursor-hover');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});