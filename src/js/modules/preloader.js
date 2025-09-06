class Preloader {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.progressBar = document.querySelector('.preloader-progress-bar');
    this.init();
  }
  
  init() {
    if (!this.preloader) return;
    
    this.simulateLoading();
    this.handlePageLoad();
  }
  
  simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      
      if (this.progressBar) {
        this.progressBar.style.width = `${progress}%`;
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        this.hidePreloader();
      }
    }, 200);
  }
  
  handlePageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hidePreloader();
      }, 500);
    });
  }
  
  hidePreloader() {
    if (!this.preloader) return;
    
    this.preloader.classList.add('preloader-hidden');
    
    setTimeout(() => {
      this.preloader.style.display = 'none';
      document.body.style.overflow = '';
      this.animateContent();
    }, 500);
  }
  
  animateContent() {
    const elements = document.querySelectorAll('[data-aos], .animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate', 'animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    elements.forEach(el => observer.observe(el));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Preloader();
});