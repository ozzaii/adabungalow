// ═══════════════════════════════════════════════════════════════════════════════
// ULTRA LUXURY JAVASCRIPT - ADA BUNGALOW UZUNGÖL
// Golden Ratio Interactions & Auto Language Detection
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const translations = {
  en: {
    nav: {
      home: 'Home',
      experience: 'Experience',
      suites: 'Suites',
      amenities: 'Amenities',
      gallery: 'Gallery',
      contact: 'Contact',
      reserve: 'Reserve'
    },
    hero: {
      badge: 'Exclusive Alpine Retreat',
      title1: 'ADA',
      title2: 'BUNGALOW',
      title3: 'UZUNGÖL',
      description: 'Where time stands still and luxury finds its true meaning',
      cta1: 'Discover Paradise',
      cta2: 'Check Availability',
      scroll: 'Scroll',
      meta: {
        elevation: 'Elevation',
        suites: 'Exclusive Suites',
        rating: 'Luxury Rating'
      }
    },
    experience: {
      label: 'The Experience',
      title1: 'A Sanctuary',
      title2: 'Above The Clouds',
      lead: 'Perched majestically at 1,090 meters above sea level, Ada Bungalow redefines luxury in the heart of Turkey\'s mystical Black Sea highlands.',
      text: 'Each meticulously crafted bungalow offers an intimate escape where modern sophistication meets timeless natural beauty. Wake to the ethereal mist dancing over Uzungöl\'s pristine waters, and retire under a canopy of stars in absolute tranquility.',
      features: {
        luxury: { title: 'Elevated Luxury', desc: 'Panoramic views from every suite' },
        service: { title: 'Bespoke Service', desc: '24/7 personal concierge' },
        moments: { title: 'Timeless Moments', desc: 'Curated experiences daily' }
      },
      stat: 'Guest Satisfaction'
    },
    suites: {
      label: 'Accommodations',
      title1: 'Exceptional',
      title2: 'Living Spaces',
      from: 'From',
      night: 'per night',
      explore: 'Explore',
      mountain: {
        category: 'Deluxe',
        title: 'Mountain View Suite',
        desc: '45m² of refined elegance with panoramic mountain vistas and handcrafted furnishings that celebrate local artisanship.',
        amenities: ['King Bed', 'Mountain View', 'Fireplace']
      },
      lake: {
        category: 'Premium',
        title: 'Lake View Premium',
        desc: '65m² sanctuary featuring floor-to-ceiling windows, private terrace, and unobstructed views of Uzungöl\'s serene waters.',
        amenities: ['2 Bedrooms', 'Lake View', 'Jacuzzi']
      },
      presidential: {
        category: 'Signature',
        title: 'Presidential Villa',
        desc: '95m² of ultimate luxury with private sauna, butler service, and 360-degree panoramic views of the alpine landscape.',
        amenities: ['3 Bedrooms', 'Private Sauna', 'Butler Service']
      }
    },
    amenities: {
      label: 'Amenities',
      title1: 'Curated',
      title2: 'Experiences',
      dining: {
        title: 'Michelin-Inspired Dining',
        desc: 'Savor exquisite Black Sea cuisine reimagined by our award-winning chefs using locally-sourced organic ingredients.'
      },
      spa: {
        title: 'Alpine Wellness Spa',
        desc: 'Rejuvenate in our world-class spa featuring traditional hammam, therapeutic massages, and meditation gardens.'
      },
      adventure: {
        title: 'Curated Adventures',
        desc: 'Explore pristine hiking trails, private helicopter tours, and exclusive access to hidden alpine lakes.'
      },
      butler: {
        title: 'Butler Service',
        desc: 'Experience unparalleled hospitality with 24/7 personal butler service attending to your every desire.'
      }
    },
    gallery: {
      label: 'Gallery',
      title1: 'Visual',
      title2: 'Journey',
      captions: {
        panoramic: 'Panoramic Views',
        interiors: 'Refined Interiors',
        lake: 'Uzungöl Lake',
        wellness: 'Wellness Sanctuary',
        dining: 'Fine Dining',
        adventures: 'Alpine Adventures'
      }
    },
    contact: {
      label: 'Contact',
      title1: 'Begin Your',
      title2: 'Journey',
      desc: 'Let us craft your perfect alpine escape. Our dedicated team is available 24/7 to curate an unforgettable experience.',
      reservations: 'Reservations',
      concierge: 'Concierge',
      location: 'Location',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        checkin: 'Check-in Date',
        checkout: 'Check-out Date',
        suite: 'Preferred Suite',
        message: 'Special Requests',
        submit: 'Send Reservation Request'
      }
    },
    footer: {
      tagline: 'Where Alpine Elegance Meets Black Sea Tranquility',
      discover: 'Discover',
      services: 'Services',
      connect: 'Connect',
      rights: '© 2024 Ada Bungalow Uzungöl. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      experience: 'Deneyim',
      suites: 'Süitler',
      amenities: 'Olanaklar',
      gallery: 'Galeri',
      contact: 'İletişim',
      reserve: 'Rezervasyon'
    },
    hero: {
      badge: 'Özel Alp Tatil Köyü',
      title1: 'ADA',
      title2: 'BUNGALOW',
      title3: 'UZUNGÖL',
      description: 'Zamanın durduğu ve lüksün gerçek anlamını bulduğu yer',
      cta1: 'Cenneti Keşfet',
      cta2: 'Müsaitlik Kontrol',
      scroll: 'Kaydır',
      meta: {
        elevation: 'Rakım',
        suites: 'Özel Süitler',
        rating: 'Lüks Derecelendirme'
      }
    },
    experience: {
      label: 'Deneyim',
      title1: 'Bulutların',
      title2: 'Üzerinde Bir Sığınak',
      lead: 'Deniz seviyesinden 1.090 metre yükseklikte görkemli bir şekilde konumlanan Ada Bungalow, Türkiye\'nin mistik Karadeniz yaylalarının kalbinde lüksü yeniden tanımlıyor.',
      text: 'Titizlikle hazırlanmış her bungalov, modern sofistikenin zamansız doğal güzellikle buluştuğu samimi bir kaçış sunuyor. Uzungöl\'ün kristal berraklığındaki suları üzerinde dans eden ruhani sisle uyanın ve mutlak huzur içinde yıldızların altında dinlenin.',
      features: {
        luxury: { title: 'Yüksek Lüks', desc: 'Her süitten panoramik manzara' },
        service: { title: 'Kişiye Özel Hizmet', desc: '7/24 kişisel concierge' },
        moments: { title: 'Zamansız Anlar', desc: 'Günlük özenle seçilmiş deneyimler' }
      },
      stat: 'Misafir Memnuniyeti'
    },
    suites: {
      label: 'Konaklama',
      title1: 'Olağanüstü',
      title2: 'Yaşam Alanları',
      from: 'Başlangıç',
      night: 'gecelik',
      explore: 'Keşfet',
      mountain: {
        category: 'Deluxe',
        title: 'Dağ Manzaralı Süit',
        desc: 'Panoramik dağ manzarası ve yerel zanaatkarlığı kutlayan el yapımı mobilyalarla 45m² rafine zarafet.',
        amenities: ['King Yatak', 'Dağ Manzarası', 'Şömine']
      },
      lake: {
        category: 'Premium',
        title: 'Göl Manzaralı Premium',
        desc: 'Yerden tavana pencereler, özel teras ve Uzungöl\'ün sakin sularının engelsiz manzarasına sahip 65m² sığınak.',
        amenities: ['2 Yatak Odası', 'Göl Manzarası', 'Jakuzi']
      },
      presidential: {
        category: 'İmza',
        title: 'Başkanlık Villası',
        desc: 'Özel sauna, kişisel hizmet ve alp manzarasının 360 derece panoramik görünümü ile 95m² üstün lüks.',
        amenities: ['3 Yatak Odası', 'Özel Sauna', 'Kişisel Hizmet']
      }
    },
    amenities: {
      label: 'Olanaklar',
      title1: 'Özenle Seçilmiş',
      title2: 'Deneyimler',
      dining: {
        title: 'Michelin Seviyesinde Yemek',
        desc: 'Ödüllü şeflerimiz tarafından yerel kaynaklı organik malzemeler kullanılarak yeniden tasarlanan enfes Karadeniz mutfağının tadını çıkarın.'
      },
      spa: {
        title: 'Alp Wellness Spa',
        desc: 'Geleneksel hamam, terapötik masajlar ve meditasyon bahçeleri içeren dünya standartlarındaki spa\'mızda yenilenin.'
      },
      adventure: {
        title: 'Özel Maceralar',
        desc: 'Bozulmamış yürüyüş parkurlarını, özel helikopter turlarını ve gizli alp göllerine özel erişimi keşfedin.'
      },
      butler: {
        title: 'Kişisel Hizmet',
        desc: 'Her arzunuza cevap veren 7/24 kişisel hizmetle eşsiz misafirperverliği deneyimleyin.'
      }
    },
    gallery: {
      label: 'Galeri',
      title1: 'Görsel',
      title2: 'Yolculuk',
      captions: {
        panoramic: 'Panoramik Manzaralar',
        interiors: 'Zarif İç Mekanlar',
        lake: 'Uzungöl Gölü',
        wellness: 'Wellness Cenneti',
        dining: 'Gurme Yemek',
        adventures: 'Alp Maceraları'
      }
    },
    contact: {
      label: 'İletişim',
      title1: 'Yolculuğunuza',
      title2: 'Başlayın',
      desc: 'Mükemmel alp kaçışınızı sizin için tasarlayalım. Özel ekibimiz unutulmaz bir deneyim yaratmak için 7/24 hizmetinizde.',
      reservations: 'Rezervasyon',
      concierge: 'Concierge',
      location: 'Konum',
      form: {
        name: 'Ad Soyad',
        email: 'E-posta Adresi',
        phone: 'Telefon Numarası',
        checkin: 'Giriş Tarihi',
        checkout: 'Çıkış Tarihi',
        suite: 'Tercih Edilen Süit',
        message: 'Özel İstekler',
        submit: 'Rezervasyon Talebi Gönder'
      }
    },
    footer: {
      tagline: 'Alp Zarafeti ile Karadeniz Huzurunun Buluştuğu Yer',
      discover: 'Keşfet',
      services: 'Hizmetler',
      connect: 'Bağlantı',
      rights: '© 2024 Ada Bungalow Uzungöl. Tüm hakları saklıdır.',
      privacy: 'Gizlilik Politikası',
      terms: 'Kullanım Şartları'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      experience: 'التجربة',
      suites: 'الأجنحة',
      amenities: 'المرافق',
      gallery: 'المعرض',
      contact: 'اتصل بنا',
      reserve: 'احجز'
    },
    hero: {
      badge: 'منتجع جبلي حصري',
      title1: 'آدا',
      title2: 'بنغالو',
      title3: 'أوزنجول',
      description: 'حيث يتوقف الزمن وتجد الفخامة معناها الحقيقي',
      cta1: 'اكتشف الجنة',
      cta2: 'تحقق من التوفر',
      scroll: 'مرر',
      meta: {
        elevation: 'الارتفاع',
        suites: 'أجنحة حصرية',
        rating: 'تصنيف الفخامة'
      }
    },
    experience: {
      label: 'التجربة',
      title1: 'ملاذ',
      title2: 'فوق السحاب',
      lead: 'يقع آدا بنغالو بشكل مهيب على ارتفاع 1090 مترًا فوق مستوى سطح البحر، ويعيد تعريف الفخامة في قلب مرتفعات البحر الأسود الصوفية في تركيا.',
      text: 'يوفر كل بنغالو مصمم بدقة ملاذًا حميميًا حيث تلتقي الرقي الحديث بالجمال الطبيعي الخالد. استيقظ على الضباب الأثيري الراقص فوق مياه أوزنجول النقية، واسترح تحت مظلة من النجوم في هدوء مطلق.',
      features: {
        luxury: { title: 'فخامة مرتفعة', desc: 'إطلالات بانورامية من كل جناح' },
        service: { title: 'خدمة مخصصة', desc: 'كونسيرج شخصي على مدار الساعة' },
        moments: { title: 'لحظات خالدة', desc: 'تجارب منسقة يوميًا' }
      },
      stat: 'رضا الضيوف'
    },
    suites: {
      label: 'أماكن الإقامة',
      title1: 'مساحات',
      title2: 'معيشة استثنائية',
      from: 'ابتداءً من',
      night: 'لليلة',
      explore: 'استكشف',
      mountain: {
        category: 'ديلوكس',
        title: 'جناح بإطلالة جبلية',
        desc: '45 م² من الأناقة الراقية مع إطلالات جبلية بانورامية وأثاث مصنوع يدويًا يحتفل بالحرفية المحلية.',
        amenities: ['سرير كينج', 'إطلالة جبلية', 'موقد']
      },
      lake: {
        category: 'بريميوم',
        title: 'بريميوم بإطلالة على البحيرة',
        desc: 'ملاذ بمساحة 65 م² يتميز بنوافذ من الأرض إلى السقف وتراس خاص وإطلالات غير محجوبة على مياه أوزنجول الهادئة.',
        amenities: ['غرفتا نوم', 'إطلالة على البحيرة', 'جاكوزي']
      },
      presidential: {
        category: 'توقيع',
        title: 'الفيلا الرئاسية',
        desc: '95 م² من الفخامة المطلقة مع ساونا خاصة وخدمة الخادم الشخصي وإطلالات بانورامية 360 درجة على المناظر الطبيعية الجبلية.',
        amenities: ['3 غرف نوم', 'ساونا خاصة', 'خدمة الخادم']
      }
    },
    amenities: {
      label: 'المرافق',
      title1: 'تجارب',
      title2: 'منسقة',
      dining: {
        title: 'طعام مستوحى من ميشلان',
        desc: 'تذوق مأكولات البحر الأسود الرائعة التي أعاد تصميمها طهاتنا الحائزون على جوائز باستخدام مكونات عضوية محلية المصدر.'
      },
      spa: {
        title: 'سبا العافية الألبي',
        desc: 'جدد نشاطك في منتجعنا الصحي العالمي الذي يضم الحمام التقليدي والتدليك العلاجي وحدائق التأمل.'
      },
      adventure: {
        title: 'مغامرات منسقة',
        desc: 'استكشف مسارات المشي البكر وجولات الهليكوبتر الخاصة والوصول الحصري إلى البحيرات الجبلية المخفية.'
      },
      butler: {
        title: 'خدمة الخادم',
        desc: 'اختبر الضيافة التي لا مثيل لها مع خدمة الخادم الشخصي على مدار الساعة طوال أيام الأسبوع التي تلبي كل رغباتك.'
      }
    },
    gallery: {
      label: 'المعرض',
      title1: 'رحلة',
      title2: 'بصرية',
      captions: {
        panoramic: 'مناظر بانورامية',
        interiors: 'تصاميم داخلية راقية',
        lake: 'بحيرة أوزنجول',
        wellness: 'ملاذ العافية',
        dining: 'تناول الطعام الفاخر',
        adventures: 'مغامرات جبلية'
      }
    },
    contact: {
      label: 'اتصل بنا',
      title1: 'ابدأ',
      title2: 'رحلتك',
      desc: 'دعنا نصمم لك ملاذك الجبلي المثالي. فريقنا المخصص متاح على مدار الساعة طوال أيام الأسبوع لتنسيق تجربة لا تُنسى.',
      reservations: 'الحجوزات',
      concierge: 'الكونسيرج',
      location: 'الموقع',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        checkin: 'تاريخ الوصول',
        checkout: 'تاريخ المغادرة',
        suite: 'الجناح المفضل',
        message: 'طلبات خاصة',
        submit: 'إرسال طلب الحجز'
      }
    },
    footer: {
      tagline: 'حيث تلتقي أناقة جبال الألب مع هدوء البحر الأسود',
      discover: 'اكتشف',
      services: 'الخدمات',
      connect: 'تواصل',
      rights: '© 2024 آدا بنغالو أوزنجول. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// LANGUAGE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

class LanguageManager {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  detectLanguage() {
    // Check saved preference
    const saved = localStorage.getItem('luxuryLang');
    if (saved && translations[saved]) return saved;

    // Auto-detect from browser/phone
    const browserLang = navigator.language || navigator.userLanguage;
    
    if (browserLang.startsWith('tr')) return 'tr';
    if (browserLang.startsWith('ar')) return 'ar';
    
    return 'en';
  }

  init() {
    this.applyLanguage();
    this.setupLanguageToggle();
  }

  applyLanguage() {
    const t = translations[this.currentLang];
    
    // Update HTML attributes
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update navigation
    document.querySelectorAll('.nav-link span').forEach((el, i) => {
      const keys = ['home', 'experience', 'suites', 'amenities', 'gallery', 'contact'];
      if (t.nav[keys[i]]) {
        el.textContent = t.nav[keys[i]];
        el.parentElement.querySelector('::after')?.setAttribute('data-text', t.nav[keys[i]]);
      }
    });
    
    // Update CTA
    const navCta = document.querySelector('.nav-cta span');
    if (navCta) navCta.textContent = t.nav.reserve;
    
    // Update hero
    const heroBadge = document.querySelector('.hero-badge span');
    if (heroBadge) heroBadge.textContent = t.hero.badge;
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const lines = heroTitle.querySelectorAll('.title-word');
      if (lines[0]) lines[0].textContent = t.hero.title1;
      if (lines[1]) lines[1].textContent = t.hero.title2;
      if (lines[2]) lines[2].textContent = t.hero.title3;
    }
    
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) heroDesc.textContent = t.hero.description;
    
    const heroActions = document.querySelectorAll('.hero-actions .btn-luxury span');
    if (heroActions[0]) heroActions[0].textContent = t.hero.cta1;
    if (heroActions[1]) heroActions[1].textContent = t.hero.cta2;
    
    // Update all sections
    this.updateSections(t);
    
    // Update language button
    const langCurrent = document.querySelector('.lang-current');
    if (langCurrent) langCurrent.textContent = this.currentLang.toUpperCase();
  }

  updateSections(t) {
    // Experience section
    const expLabel = document.querySelector('.experience-luxury .section-label');
    if (expLabel) expLabel.textContent = t.experience.label;
    
    const expTitle = document.querySelector('.experience-luxury .section-title');
    if (expTitle) {
      const spans = expTitle.querySelectorAll('span');
      if (spans[0]) spans[0].textContent = t.experience.title1;
      if (spans[1]) spans[1].textContent = t.experience.title2;
    }
    
    // Continue with other sections...
  }

  setupLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', () => {
      this.showLanguageMenu();
    });
  }

  showLanguageMenu() {
    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.innerHTML = `
      <div class="language-menu-content">
        <button data-lang="en" ${this.currentLang === 'en' ? 'class="active"' : ''}>English</button>
        <button data-lang="tr" ${this.currentLang === 'tr' ? 'class="active"' : ''}>Türkçe</button>
        <button data-lang="ar" ${this.currentLang === 'ar' ? 'class="active"' : ''}>العربية</button>
      </div>
    `;
    
    document.body.appendChild(menu);
    setTimeout(() => menu.classList.add('active'), 10);
    
    menu.addEventListener('click', (e) => {
      if (e.target.dataset.lang) {
        this.changeLanguage(e.target.dataset.lang);
        menu.remove();
      } else if (e.target === menu) {
        menu.remove();
      }
    });
  }

  changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('luxuryLang', lang);
    this.applyLanguage();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LUXURY INTERACTIONS
// ═══════════════════════════════════════════════════════════════════════════════

class LuxuryWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupPreloader();
    this.setupNavigation();
    this.setupCursor();
    this.setupScrollAnimations();
    this.setupCounters();
    this.setupForm();
    this.setupPageTransitions();
    this.setupMicroInteractions();
    this.setupParallaxEffects();
    this.setupMagneticButtons();
    this.setupRevealAnimations();
  }

  setupPreloader() {
    const preloader = document.getElementById('preloader');
    const counter = document.querySelector('.counter-number');
    
    if (!preloader || !counter) return;
    
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 10) + 1;
      if (count > 100) count = 100;
      
      counter.textContent = count;
      
      if (count === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('hidden');
          this.animateHero();
        }, 500);
      }
    }, 50);
  }

  animateHero() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
      const delay = el.dataset.aosDelay || 0;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay);
    });
  }

  setupNavigation() {
    const nav = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    
    if (!nav) return;
    
    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
    
    // Mobile menu
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
      });
      
      // Close on link click
      menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          menu.classList.remove('active');
        });
      });
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;
    
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      dot.style.left = cursorX + 'px';
      dot.style.top = cursorY + 'px';
    });
    
    const animateOutline = () => {
      outlineX += (cursorX - outlineX) * 0.1;
      outlineY += (cursorY - outlineY) * 0.1;
      
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
      
      requestAnimationFrame(animateOutline);
    };
    animateOutline();
    
    // Hover effects
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => outline.classList.add('hover'));
      el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
      observer.observe(el);
    });
  }

  setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const interval = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              counter.textContent = Math.floor(current);
            }, 16);
            observer.unobserve(counter);
          }
        });
      });
      
      observer.observe(counter);
    });
  }

  setupForm() {
    const form = document.getElementById('luxuryReservation');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Animate button
      const btn = form.querySelector('.btn-submit');
      const originalText = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate submission
      setTimeout(() => {
        btn.querySelector('span').textContent = '✓ Sent Successfully';
        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.disabled = false;
          form.reset();
        }, 2000);
      }, 2000);
    });
  }

  setupPageTransitions() {
    // Disabled - causing overlay issues on mobile
    return;
  }

  setupMicroInteractions() {
    // Ripple effect on clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('button, .btn-luxury')) {
        const btn = e.target.closest('button, .btn-luxury');
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
    });
    
    // Text split animations
    document.querySelectorAll('.hero-title .title-word').forEach(word => {
      const text = word.textContent;
      word.innerHTML = text.split('').map((char, i) => 
        `<span class="char" style="animation-delay: ${i * 0.05}s">${char}</span>`
      ).join('');
    });
    
    // Hover glow effects
    document.querySelectorAll('.suite-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };
    
    window.addEventListener('scroll', () => {
      requestAnimationFrame(handleParallax);
    });
  }

  setupMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-luxury, .nav-cta');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  setupRevealAnimations() {
    // Premium text reveal
    const revealTexts = document.querySelectorAll('.section-title, .section-lead');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Stagger child animations
          const chars = entry.target.querySelectorAll('.char');
          chars.forEach((char, i) => {
            char.style.animationDelay = `${i * 0.02}s`;
            char.classList.add('reveal-char');
          });
          
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    revealTexts.forEach(text => {
      // Split text for animation
      if (!text.querySelector('.char')) {
        const words = text.innerHTML.split(' ');
        text.innerHTML = words.map(word => 
          `<span class="word-reveal">${word}</span>`
        ).join(' ');
      }
      revealObserver.observe(text);
    });
    
    // Number increment animations
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.textContent);
          let current = 0;
          const increment = target / 50;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + '%';
          }, 30);
          
          statsObserver.unobserve(el);
        }
      });
    });
    
    stats.forEach(stat => statsObserver.observe(stat));
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE OPTIMIZATIONS
// ═══════════════════════════════════════════════════════════════════════════════

class MobileOptimizations {
  constructor() {
    this.init();
  }

  init() {
    this.setupViewportHeight();
    this.setupTouchInteractions();
    this.optimizePerformance();
  }

  setupViewportHeight() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
  }

  setupTouchInteractions() {
    // Add touch feedback
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // Improve button responsiveness
    document.querySelectorAll('button, a').forEach(el => {
      el.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
      }, { passive: true });
      
      el.addEventListener('touchend', function() {
        this.style.opacity = '';
      }, { passive: true });
    });
  }

  optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  new LanguageManager();
  new LuxuryWebsite();
  new MobileOptimizations();
});

// Add dynamic styles for language menu and interactions
const style = document.createElement('style');
style.textContent = `
  .language-menu {
    position: fixed;
    inset: 0;
    background: rgba(10, 14, 26, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .language-menu.active {
    opacity: 1;
    pointer-events: auto;
  }
  
  .language-menu-content {
    display: flex;
    gap: 2rem;
  }
  
  .language-menu button {
    padding: 1rem 2rem;
    background: transparent;
    border: 1px solid rgba(212, 175, 55, 0.3);
    color: #F7FAFC;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 1.618rem;
  }
  
  .language-menu button:hover,
  .language-menu button.active {
    background: #D4AF37;
    border-color: #D4AF37;
    color: #0A0E1A;
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    .language-menu-content {
      flex-direction: column;
      gap: 1rem;
    }
    
    .language-menu button {
      width: 200px;
    }
  }
  
  /* Page Transitions */
  .page-transition-layer {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #0A0E1A 0%, #1A1F2E 50%, #D4AF37 100%);
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.76, 0, 0.24, 1);
  }
  
  .page-transition-layer.active {
    opacity: 1;
    transform: scaleY(1);
  }
  
  /* Ripple Effect */
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* Character Animations */
  .char {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px) rotateX(90deg);
    animation: charReveal 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  
  @keyframes charReveal {
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
  }
  
  /* Word Reveal */
  .word-reveal {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .revealed .word-reveal {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Suite Card Glow */
  .suite-card {
    position: relative;
    overflow: hidden;
  }
  
  .suite-card::before {
    content: '';
    position: absolute;
    top: var(--mouse-y, 50%);
    left: var(--mouse-x, 50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  
  .suite-card:hover::before {
    opacity: 1;
  }
  
  /* Magnetic Button Effect */
  .btn-luxury,
  .nav-cta {
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  /* Loading Sequence */
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .loading-shimmer {
    background: linear-gradient(
      90deg,
      rgba(212, 175, 55, 0.1) 0%,
      rgba(212, 175, 55, 0.3) 50%,
      rgba(212, 175, 55, 0.1) 100%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }
  
  /* Smooth Scroll Indicator */
  @keyframes scrollPulse {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    50% {
      transform: translateY(10px) scale(0.9);
      opacity: 0.5;
    }
  }
  
  .scroll-indicator {
    animation: scrollPulse 2s infinite;
  }
`;
document.head.appendChild(style);