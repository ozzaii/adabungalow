// Navbar Language Switcher with Full Turkish Support
(function() {
    'use strict';
    
    class NavbarLanguageSwitcher {
        constructor() {
            this.currentLang = localStorage.getItem('adaBungalowLang') || 'tr';
            this.init();
        }
        
        init() {
            this.setupButtons();
            this.updateActiveButton();
            this.loadTranslations();
        }
        
        setupButtons() {
            const buttons = document.querySelectorAll('.navbar-language-switcher .lang-btn');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = btn.dataset.lang;
                    this.switchLanguage(lang);
                });
            });
        }
        
        switchLanguage(lang) {
            if (lang === this.currentLang) return;
            
            // Save preference
            this.currentLang = lang;
            localStorage.setItem('adaBungalowLang', lang);
            
            // Update HTML attributes
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            // Update active button
            this.updateActiveButton();
            
            // Apply translations
            this.applyTranslations();
            
            // Dispatch event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        }
        
        updateActiveButton() {
            const buttons = document.querySelectorAll('.navbar-language-switcher .lang-btn');
            buttons.forEach(btn => {
                if (btn.dataset.lang === this.currentLang) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        loadTranslations() {
            // Load translations if not already loaded
            if (typeof window.translations === 'undefined') {
                // Basic translations object
                window.translations = {
                    tr: {
                        hero_title: "Dağların Lüksü Fısıldadığı Yer",
                        hero_subtitle: "Yer ve gök arasında asılı, sabah sisinin mimari şiirle kucaklaştığı yer",
                        cta_button: "Yolculuğunuza Başlayın",
                        check_availability: "Müsaitlik Kontrol Et",
                        checkin: "Giriş",
                        checkout: "Çıkış",
                        villa_type: "Villa Tipi",
                        guests: "Misafir",
                        special_requests: "Özel İstekler",
                        contact_whatsapp: "WhatsApp ile İletişim",
                        // Villa names
                        villa_pool: "Havuzlu VIP",
                        villa_waterfall: "Şelaleli",
                        villa_luxury: "Lüks 3+1",
                        // Section titles
                        daily_rituals: "Günlük Ritüeller",
                        gallery: "Galeri",
                        location: "Konum"
                    },
                    en: {
                        hero_title: "Where Mountains Whisper Luxury",
                        hero_subtitle: "Suspended between earth and sky, where morning mist embraces architectural poetry",
                        cta_button: "Begin Your Journey",
                        check_availability: "Check Availability",
                        checkin: "Check-in",
                        checkout: "Check-out",
                        villa_type: "Villa Type",
                        guests: "Guests",
                        special_requests: "Special Requests",
                        contact_whatsapp: "Contact via WhatsApp",
                        // Villa names
                        villa_pool: "VIP with Pool",
                        villa_waterfall: "Waterfall View",
                        villa_luxury: "Luxury 3+1",
                        // Section titles
                        daily_rituals: "Daily Rituals",
                        gallery: "Gallery",
                        location: "Location"
                    },
                    ar: {
                        hero_title: "حيث تهمس الجبال بالفخامة",
                        hero_subtitle: "معلق بين الأرض والسماء، حيث يعانق ضباب الصباح الشعر المعماري",
                        cta_button: "ابدأ رحلتك",
                        check_availability: "تحقق من التوفر",
                        checkin: "تسجيل الدخول",
                        checkout: "تسجيل الخروج",
                        villa_type: "نوع الفيلا",
                        guests: "الضيوف",
                        special_requests: "طلبات خاصة",
                        contact_whatsapp: "التواصل عبر واتساب",
                        // Villa names
                        villa_pool: "VIP مع مسبح",
                        villa_waterfall: "إطلالة الشلال",
                        villa_luxury: "فاخر 3+1",
                        // Section titles
                        daily_rituals: "الطقوس اليومية",
                        gallery: "معرض الصور",
                        location: "الموقع"
                    }
                };
            }
            
            // Apply translations on load
            setTimeout(() => this.applyTranslations(), 100);
        }
        
        applyTranslations() {
            const trans = window.translations[this.currentLang];
            if (!trans) return;
            
            // Update text content with data attributes
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.dataset.translate;
                if (trans[key]) {
                    el.textContent = trans[key];
                }
            });
            
            // Update specific elements manually if needed
            const heroTitle = document.querySelector('.hero-headline');
            if (heroTitle && trans.hero_title) {
                // Keep the structure but update text
                const words = trans.hero_title.split(' ');
                heroTitle.innerHTML = `
                    <span class="line line-1">
                        ${words.slice(0, Math.ceil(words.length/2)).map(w => `<span class="word">${w}</span>`).join(' ')}
                    </span>
                    <span class="line line-2">
                        ${words.slice(Math.ceil(words.length/2)).map(w => `<span class="word">${w}</span>`).join(' ')}
                    </span>
                `;
            }
            
            // Update CTA button
            const ctaButton = document.querySelector('.btn-supreme .btn-label');
            if (ctaButton && trans.cta_button) {
                ctaButton.textContent = trans.cta_button;
            }
            
            // Update form labels
            const labels = {
                '#checkin': trans.checkin,
                '#checkout': trans.checkout,
                '#villa': trans.villa_type,
                '#guests': trans.guests
            };
            
            Object.entries(labels).forEach(([selector, text]) => {
                const field = document.querySelector(selector);
                if (field && text) {
                    const label = field.closest('.booking-field')?.querySelector('.field-label');
                    if (label) label.textContent = text;
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.navbarLanguage = new NavbarLanguageSwitcher();
        });
    } else {
        window.navbarLanguage = new NavbarLanguageSwitcher();
    }
})();