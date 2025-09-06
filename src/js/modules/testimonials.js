import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

class Testimonials {
  constructor() {
    this.container = document.querySelector('[data-testimonials]');
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    this.setupSwiper();
  }
  
  setupSwiper() {
    new Swiper(this.container, {
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 800,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}"><span></span></span>`;
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init: function() {
          this.el.classList.add('swiper-initialized');
        }
      }
    });
    
    this.addSwiperStyles();
  }
  
  addSwiperStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .swiper {
        width: 100%;
        height: 100%;
      }
      
      .swiper-pagination {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2rem;
      }
      
      .swiper-pagination-bullet {
        width: 40px;
        height: 3px;
        background: var(--color-border);
        border-radius: 3px;
        opacity: 1;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      
      .swiper-pagination-bullet span {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: var(--color-primary);
        transition: width 5s linear;
      }
      
      .swiper-pagination-bullet-active span {
        width: 100%;
      }
      
      .swiper-button-prev,
      .swiper-button-next {
        color: var(--color-primary);
        width: 44px;
        height: 44px;
      }
      
      .swiper-button-prev:after,
      .swiper-button-next:after {
        font-size: 1.5rem;
      }
      
      @media (max-width: 768px) {
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }
        
        .swiper-pagination-bullet {
          width: 30px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Testimonials();
});