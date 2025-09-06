class LanguageSystem {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en';
    this.langToggle = document.querySelector('[data-lang-toggle]');
    this.langCurrent = document.querySelector('[data-lang-current]');
    this.translations = {};
    this.init();
  }
  
  async init() {
    await this.loadTranslations();
    this.setupLanguageToggle();
    this.applyLanguage();
  }
  
  async loadTranslations() {
    this.translations = {
      en: {
        nav: {
          home: 'Home',
          experience: 'Experience',
          accommodations: 'Accommodations',
          amenities: 'Amenities',
          gallery: 'Gallery',
          location: 'Location',
          contact: 'Contact',
          reserve: 'Reserve Now'
        },
        hero: {
          welcome: 'WELCOME TO',
          title: 'ADA BUNGALOW',
          subtitle: 'UZUNGÖL',
          description: 'Where Alpine Elegance Meets Black Sea Tranquility',
          explore: 'Explore',
          book: 'Book Your Stay'
        }
      },
      tr: {
        nav: {
          home: 'Ana Sayfa',
          experience: 'Deneyim',
          accommodations: 'Konaklama',
          amenities: 'Olanaklar',
          gallery: 'Galeri',
          location: 'Konum',
          contact: 'İletişim',
          reserve: 'Rezervasyon Yap'
        },
        hero: {
          welcome: 'HOŞ GELDİNİZ',
          title: 'ADA BUNGALOW',
          subtitle: 'UZUNGÖL',
          description: 'Alp Zarafeti ile Karadeniz Huzurunun Buluştuğu Yer',
          explore: 'Keşfet',
          book: 'Rezervasyon Yap'
        }
      },
      ar: {
        nav: {
          home: 'الرئيسية',
          experience: 'التجربة',
          accommodations: 'الإقامة',
          amenities: 'المرافق',
          gallery: 'المعرض',
          location: 'الموقع',
          contact: 'اتصل',
          reserve: 'احجز الآن'
        },
        hero: {
          welcome: 'مرحبا بكم في',
          title: 'آدا بنغالو',
          subtitle: 'أوزنجول',
          description: 'حيث تلتقي أناقة جبال الألب مع هدوء البحر الأسود',
          explore: 'استكشف',
          book: 'احجز إقامتك'
        }
      },
      ru: {
        nav: {
          home: 'Главная',
          experience: 'Опыт',
          accommodations: 'Размещение',
          amenities: 'Удобства',
          gallery: 'Галерея',
          location: 'Расположение',
          contact: 'Контакты',
          reserve: 'Забронировать'
        },
        hero: {
          welcome: 'ДОБРО ПОЖАЛОВАТЬ',
          title: 'АДА БУНГАЛО',
          subtitle: 'УЗУНГЁЛЬ',
          description: 'Где альпийская элегантность встречается с черноморским спокойствием',
          explore: 'Исследовать',
          book: 'Забронировать'
        }
      }
    };
  }
  
  setupLanguageToggle() {
    if (!this.langToggle) return;
    
    this.langToggle.addEventListener('click', () => {
      this.showLanguageMenu();
    });
  }
  
  showLanguageMenu() {
    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.innerHTML = `
      <div class="language-menu-content">
        <h3>Select Language</h3>
        <div class="language-options">
          <button data-lang="en" ${this.currentLang === 'en' ? 'class="active"' : ''}>
            <span class="flag">🇬🇧</span>
            <span>English</span>
          </button>
          <button data-lang="tr" ${this.currentLang === 'tr' ? 'class="active"' : ''}>
            <span class="flag">🇹🇷</span>
            <span>Türkçe</span>
          </button>
          <button data-lang="ar" ${this.currentLang === 'ar' ? 'class="active"' : ''}>
            <span class="flag">🇸🇦</span>
            <span>العربية</span>
          </button>
          <button data-lang="ru" ${this.currentLang === 'ru' ? 'class="active"' : ''}>
            <span class="flag">🇷🇺</span>
            <span>Русский</span>
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(menu);
    
    setTimeout(() => menu.classList.add('active'), 10);
    
    menu.addEventListener('click', (e) => {
      if (e.target === menu) {
        menu.classList.remove('active');
        setTimeout(() => menu.remove(), 300);
      }
    });
    
    const buttons = menu.querySelectorAll('[data-lang]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.changeLanguage(lang);
        menu.classList.remove('active');
        setTimeout(() => menu.remove(), 300);
      });
    });
  }
  
  changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.applyLanguage();
    
    if (this.langCurrent) {
      this.langCurrent.textContent = lang.toUpperCase();
    }
    
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  }
  
  applyLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.dataset.translate;
      const translation = this.getTranslation(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }
  
  getTranslation(key) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return null;
      }
    }
    
    return translation;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LanguageSystem();
});

const langStyles = document.createElement('style');
langStyles.textContent = `
  .language-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding: 1rem;
  }
  
  .language-menu.active {
    opacity: 1;
  }
  
  .language-menu-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 400px;
    width: 100%;
  }
  
  .language-menu h3 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .language-options {
    display: grid;
    gap: 0.5rem;
  }
  
  .language-options button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8f7f4;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .language-options button:hover {
    background: #efefec;
  }
  
  .language-options button.active {
    background: white;
    border-color: var(--color-primary);
  }
  
  .flag {
    font-size: 1.5rem;
  }
  
  .rtl {
    text-align: right;
  }
  
  .rtl .navbar-nav {
    flex-direction: row-reverse;
  }
  
  .rtl .navbar-actions {
    flex-direction: row-reverse;
  }
`;
document.head.appendChild(langStyles);