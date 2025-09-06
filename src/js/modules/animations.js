import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

class Animations {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupTextAnimations();
    this.setupImageAnimations();
    this.setupParallax();
    this.setupCounters();
  }
  
  setupTextAnimations() {
    const splitTexts = document.querySelectorAll('[data-splitting]');
    
    splitTexts.forEach(text => {
      const split = new SplitType(text, { types: 'chars,words,lines' });
      
      gsap.from(split.chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          once: true
        }
      });
    });
  }
  
  setupImageAnimations() {
    const images = document.querySelectorAll('.experience-image, .room-image, .gallery-item');
    
    images.forEach(image => {
      const img = image.querySelector('img');
      
      gsap.timeline({
        scrollTrigger: {
          trigger: image,
          start: 'top 80%',
          once: true
        }
      })
      .from(image, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(img, {
        scale: 1.3,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1');
    });
  }
  
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      
      gsap.to(element, {
        y: (i, el) => -(100 * speed),
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }
  
  setupCounters() {
    const counters = document.querySelectorAll('.feature-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const suffix = counter.textContent.replace(/[0-9]/g, '');
      
      gsap.from(counter, {
        textContent: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
          once: true
        },
        snap: { textContent: 1 },
        onUpdate: function() {
          counter.textContent = Math.floor(this.targets()[0].textContent) + suffix;
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth > 768) {
    new Animations();
  }
});