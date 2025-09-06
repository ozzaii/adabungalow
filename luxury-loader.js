// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM LOADING SEQUENCES - ADA BUNGALOW UZUNGÖL
// Golden Ratio Based Loading Animations
// ═══════════════════════════════════════════════════════════════════════════════

class PremiumLoader {
  constructor() {
    this.golden = 1.618;
    this.init();
  }

  init() {
    this.createLoader();
    this.animateLoader();
    this.setupContentReveal();
  }

  createLoader() {
    const loader = document.createElement('div');
    loader.className = 'premium-loader';
    loader.innerHTML = `
      <div class="loader-container">
        <div class="loader-logo">
          <svg class="logo-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#D4AF37;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#F4E5C1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#D4AF37;stop-opacity:1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <!-- ADA Letters -->
            <path class="letter letter-a1" d="M 20,80 L 35,40 L 50,80 M 27,65 L 43,65" 
                  stroke="url(#goldGradient)" stroke-width="2" fill="none" filter="url(#glow)"/>
            <path class="letter letter-d" d="M 60,40 L 60,80 M 60,55 C 75,55 75,65 60,65" 
                  stroke="url(#goldGradient)" stroke-width="2" fill="none" filter="url(#glow)"/>
            <path class="letter letter-a2" d="M 90,80 L 105,40 L 120,80 M 97,65 L 113,65" 
                  stroke="url(#goldGradient)" stroke-width="2" fill="none" filter="url(#glow)"/>
            
            <!-- Mountain Icon -->
            <path class="mountain" d="M 140,80 L 160,50 L 180,80 M 150,65 L 170,45 L 185,65" 
                  stroke="url(#goldGradient)" stroke-width="1.5" fill="none" 
                  opacity="0" filter="url(#glow)"/>
          </svg>
        </div>
        
        <div class="loader-progress">
          <div class="progress-track">
            <div class="progress-fill"></div>
            <div class="progress-glow"></div>
          </div>
          <div class="progress-counter">
            <span class="counter-value">0</span>
            <span class="counter-percent">%</span>
          </div>
        </div>
        
        <div class="loader-text">
          <div class="text-line text-line-1">Preparing</div>
          <div class="text-line text-line-2">Your Journey</div>
        </div>
      </div>
      
      <div class="loader-overlay"></div>
    `;
    
    document.body.insertBefore(loader, document.body.firstChild);
    this.loader = loader;
  }

  animateLoader() {
    const progressFill = this.loader.querySelector('.progress-fill');
    const progressGlow = this.loader.querySelector('.progress-glow');
    const counterValue = this.loader.querySelector('.counter-value');
    const letters = this.loader.querySelectorAll('.letter');
    const mountain = this.loader.querySelector('.mountain');
    const textLines = this.loader.querySelectorAll('.text-line');
    
    // Animate letters with golden ratio timing
    letters.forEach((letter, i) => {
      const delay = i * (100 * this.golden);
      setTimeout(() => {
        letter.style.strokeDasharray = letter.getTotalLength();
        letter.style.strokeDashoffset = letter.getTotalLength();
        letter.style.animation = `drawPath 1s ${delay}ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards`;
      }, delay);
    });
    
    // Mountain appears after letters
    setTimeout(() => {
      mountain.style.opacity = '1';
      mountain.style.strokeDasharray = mountain.getTotalLength();
      mountain.style.strokeDashoffset = mountain.getTotalLength();
      mountain.style.animation = 'drawPath 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }, 500 * this.golden);
    
    // Text animations
    textLines.forEach((line, i) => {
      line.style.animation = `fadeSlideUp 0.8s ${i * 200}ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards`;
    });
    
    // Progress animation
    let progress = 0;
    const duration = 2500; // Total loading duration
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      
      // Apply easing to progress
      progress = this.easeOutQuart(linearProgress) * 100;
      
      // Update UI
      progressFill.style.width = `${progress}%`;
      progressGlow.style.left = `${progress}%`;
      counterValue.textContent = Math.floor(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => this.hideLoader(), 300);
      }
    };
    
    // Start progress after initial animations
    setTimeout(() => {
      requestAnimationFrame(updateProgress);
    }, 800);
  }

  hideLoader() {
    const overlay = this.loader.querySelector('.loader-overlay');
    const container = this.loader.querySelector('.loader-container');
    
    // Fade out loader content
    container.style.animation = 'fadeOut 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    
    // Reveal animation
    overlay.style.animation = 'revealSlideUp 1s cubic-bezier(0.76, 0, 0.24, 1) forwards';
    
    setTimeout(() => {
      this.loader.style.pointerEvents = 'none';
      this.revealContent();
      
      // Remove loader after animation
      setTimeout(() => {
        this.loader.remove();
      }, 1000);
    }, 600);
  }

  revealContent() {
    // Trigger content reveal animations
    document.body.classList.add('content-loaded');
    
    // Stagger reveal sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, i) => {
      setTimeout(() => {
        section.classList.add('section-revealed');
      }, i * 100);
    });
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('element-revealed');
      }, 800 + (i * 150));
    });
  }

  setupContentReveal() {
    // Add reveal animations to elements as they enter viewport
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
            
            // Special animations for different element types
            if (entry.target.classList.contains('suite-card')) {
              this.animateSuiteCard(entry.target);
            } else if (entry.target.classList.contains('amenity-card')) {
              this.animateAmenityCard(entry.target);
            }
          }, i * 50);
          
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    revealElements.forEach(el => {
      el.classList.add('reveal-hidden');
      revealObserver.observe(el);
    });
  }

  animateSuiteCard(card) {
    const image = card.querySelector('.suite-image');
    const content = card.querySelector('.suite-content');
    const price = card.querySelector('.suite-price');
    
    if (image) {
      image.style.animation = 'imageReveal 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }
    
    if (content) {
      content.style.animation = 'contentSlideUp 0.8s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }
    
    if (price) {
      price.style.animation = 'priceReveal 0.6s 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }
  }

  animateAmenityCard(card) {
    const icon = card.querySelector('.amenity-icon');
    const title = card.querySelector('.amenity-title');
    const description = card.querySelector('.amenity-description');
    
    if (icon) {
      icon.style.animation = 'iconPulse 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }
    
    if (title) {
      title.style.animation = 'fadeInUp 0.6s 0.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }
    
    if (description) {
      description.style.animation = 'fadeInUp 0.6s 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards';
    }
  }

  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
}

// Loader Styles
const loaderStyles = document.createElement('style');
loaderStyles.textContent = `
  .premium-loader {
    position: fixed;
    inset: 0;
    z-index: 10000;
    background: #0A0E1A;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .loader-container {
    text-align: center;
    position: relative;
    z-index: 2;
  }
  
  .loader-logo {
    margin-bottom: 3rem;
    animation: logoFloat 3s ease-in-out infinite;
  }
  
  .logo-svg {
    width: 200px;
    height: 100px;
  }
  
  @keyframes drawPath {
    to {
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes logoFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .loader-progress {
    width: 300px;
    margin: 0 auto 2rem;
  }
  
  .progress-track {
    height: 2px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #D4AF37, #F4E5C1);
    width: 0;
    transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .progress-glow {
    position: absolute;
    top: -10px;
    left: 0;
    width: 50px;
    height: 20px;
    background: radial-gradient(ellipse, rgba(212, 175, 55, 0.5), transparent);
    filter: blur(10px);
    transition: left 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .progress-counter {
    margin-top: 1rem;
    font-family: 'Montserrat', sans-serif;
    color: #D4AF37;
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.1em;
  }
  
  .counter-percent {
    font-size: 1.2rem;
    opacity: 0.6;
  }
  
  .loader-text {
    opacity: 0;
    animation: fadeIn 1s 0.5s forwards;
  }
  
  .text-line {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: #F7FAFC;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes fadeSlideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
  
  .loader-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #0A0E1A 0%, #1A1F2E 50%, #0A0E1A 100%);
    z-index: 1;
  }
  
  @keyframes revealSlideUp {
    to {
      transform: translateY(-100%);
    }
  }
  
  /* Content Reveal Animations */
  .reveal-hidden {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .revealed {
    animation: revealElement 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  
  @keyframes revealElement {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes imageReveal {
    from {
      opacity: 0;
      transform: scale(1.1);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes contentSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes priceReveal {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes iconPulse {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Loading state for images */
  .image-loading {
    background: linear-gradient(
      90deg,
      rgba(212, 175, 55, 0.1) 0%,
      rgba(212, 175, 55, 0.2) 50%,
      rgba(212, 175, 55, 0.1) 100%
    );
    background-size: 200% 100%;
    animation: shimmerLoad 1.5s infinite;
  }
  
  @keyframes shimmerLoad {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .content-loaded .section-revealed {
    animation: sectionFadeIn 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  
  @keyframes sectionFadeIn {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .element-revealed {
    animation: elementReveal 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  
  @keyframes elementReveal {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

document.head.appendChild(loaderStyles);

// Initialize loader when DOM is ready
// DISABLED - Causing overlay issues on mobile
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', () => {
//     new PremiumLoader();
//   });
// } else {
//   new PremiumLoader();
// }