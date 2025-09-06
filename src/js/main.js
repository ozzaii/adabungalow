import './modules/preloader.js';
import './modules/navbar.js';
import './modules/animations.js';
import './modules/smooth-scroll.js';
import './modules/gallery.js';
import './modules/testimonials.js';
import './modules/booking.js';
import './modules/language.js';
import './modules/cursor.js';
import './modules/mobile-optimizations.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeWebsite();
});

function initializeWebsite() {
  detectDevice();
  setupViewportHeight();
  initializeLazyLoading();
  initializeFormValidation();
  setupAccessibility();
}

function detectDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /(iPad|Android(?!.*Mobile))/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  document.body.classList.toggle('is-mobile', isMobile);
  document.body.classList.toggle('is-tablet', isTablet);
  document.body.classList.toggle('is-touch', isTouchDevice);
  document.body.classList.toggle('is-desktop', !isMobile && !isTablet);
}

function setupViewportHeight() {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
}

function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

function initializeFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      if (validateForm(data)) {
        submitForm(data, form);
      }
    });
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });
  });
}

function validateForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  
  if (data.email && !emailRegex.test(data.email)) {
    showError('Please enter a valid email address');
    return false;
  }
  
  if (data.phone && !phoneRegex.test(data.phone)) {
    showError('Please enter a valid phone number');
    return false;
  }
  
  return true;
}

function validateField(field) {
  const value = field.value.trim();
  const isRequired = field.hasAttribute('required');
  
  if (isRequired && !value) {
    field.classList.add('error');
    return false;
  }
  
  field.classList.remove('error');
  return true;
}

function submitForm(data, form) {
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    showSuccess('Your request has been sent successfully!');
    form.reset();
  }, 2000);
}

function showError(message) {
  showNotification(message, 'error');
}

function showSuccess(message) {
  showNotification(message, 'success');
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function setupAccessibility() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
  
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}