class Navbar {
  constructor() {
    this.navbar = document.querySelector('[data-navbar]');
    this.toggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    this.links = document.querySelectorAll('[data-nav-link]');
    this.lastScrollTop = 0;
    this.init();
  }
  
  init() {
    if (!this.navbar) return;
    
    this.setupMobileMenu();
    this.setupScrollBehavior();
    this.setupActiveLinks();
  }
  
  setupMobileMenu() {
    if (!this.toggle || !this.menu) return;
    
    this.toggle.addEventListener('click', () => {
      this.toggleMenu();
    });
    
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          this.closeMenu();
        }
      });
    });
    
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && 
          !this.navbar.contains(e.target) && 
          this.menu.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.menu.classList.toggle('active');
    this.toggle.classList.toggle('active');
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
  }
  
  closeMenu() {
    this.menu.classList.remove('active');
    this.toggle.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  setupScrollBehavior() {
    let scrollTimer;
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        this.handleScroll();
      }, 10);
    });
  }
  
  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      this.navbar.classList.add('navbar-scrolled');
    } else {
      this.navbar.classList.remove('navbar-scrolled');
    }
    
    if (scrollTop > this.lastScrollTop && scrollTop > 200) {
      this.navbar.classList.add('navbar-hidden');
    } else {
      this.navbar.classList.remove('navbar-hidden');
    }
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
  
  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
});