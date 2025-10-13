/* ═══════════════════════════════════════════════════════════════════════════════
   LANGUAGE SWITCHER
   Dynamic language switching with localStorage persistence
   ═══════════════════════════════════════════════════════════════════════════════ */

class LanguageSwitcher {
    constructor() {
        // Auto-detect browser language or use stored preference
        const browserLang = navigator.language.split('-')[0]; // Gets 'en', 'tr', 'ar', etc.
        const supportedLangs = ['tr', 'en', 'ar'];
        const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'tr';

        this.currentLang = localStorage.getItem('adaBungalowLang') || detectedLang;
        this.init();
    }

    init() {
        // Load translations script first
        this.loadTranslations(() => {
            // Set initial language
            this.switchLanguage(this.currentLang, false);

            // Setup language dropdown and buttons
            this.setupLanguageDropdown();
            this.setupLanguageButtons();

            // Mark elements for translation
            this.markTranslatableElements();
        });
    }
    
    loadTranslations(callback) {
        if (typeof translations !== 'undefined') {
            callback();
            return;
        }
        
        // If translations not loaded, wait a bit
        setTimeout(() => {
            if (typeof translations !== 'undefined') {
                callback();
            }
        }, 100);
    }
    
    setupLanguageDropdown() {
        // Get the language dropdown
        const dropdown = document.getElementById('language-dropdown');

        if (dropdown) {
            // Set dropdown to current language
            dropdown.value = this.currentLang;

            // Add change event listener
            dropdown.addEventListener('change', (e) => {
                this.switchLanguage(e.target.value);
            });
        }
    }

    setupLanguageButtons() {
        // Get ALL language buttons (header, navbar, footer) - for backwards compatibility
        const allLangBtns = document.querySelectorAll('.lang-btn');

        allLangBtns.forEach(btn => {
            // Get language from data-lang attribute OR text content
            const lang = btn.getAttribute('data-lang') || btn.textContent.toLowerCase().trim();

            // Set initial active state
            btn.classList.remove('active');
            if (lang === this.currentLang) {
                btn.classList.add('active');
            }

            // Add click handler
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchLanguage(lang);
            });
        });
    }
    
    markTranslatableElements() {
        // Hero section
        const heroBadge = document.querySelector('.hero-badge .badge-text');
        if (heroBadge) heroBadge.setAttribute('data-i18n', 'hero.badge');
        
        const heroHeadline = document.querySelector('.hero-headline');
        if (heroHeadline) heroHeadline.setAttribute('data-i18n', 'hero.headline');
        
        const heroSubheadline = document.querySelector('.hero-subheadline');
        if (heroSubheadline) heroSubheadline.setAttribute('data-i18n', 'hero.subheadline');
        
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) heroDesc.setAttribute('data-i18n', 'hero.description');
        
        const heroCta = document.querySelector('.hero-cta-group .btn-primary');
        if (heroCta) {
            heroCta.setAttribute('data-i18n', 'hero.cta');
            heroCta.setAttribute('data-i18n-append', 'hero.ctaIcon');
        }
        
        // Villa sections - DISABLED: Using inline data-lang-* system in HTML instead
        // The HTML already has proper language structure with data-lang-en/tr/ar
        // Using CSS-only show/hide system to avoid conflicts

        /*
        const villas = document.querySelectorAll('.villa-chapter');
        villas.forEach((villa, index) => {
            // NOTE: Villa content uses inline data-lang-* attributes in HTML
            // Managed via CSS: styles.css lines 134-170
            // DO NOT add data-i18n here - it causes duplicate text issues
        });
        */
        
        // Rituals section - DISABLED: Using inline data-lang-* system in HTML instead
        /*
        const ritualsLabel = document.querySelector('.rituals-header .micro-label');
        if (ritualsLabel) ritualsLabel.setAttribute('data-i18n', 'rituals.sectionLabel');

        const ritualsTitle = document.querySelector('.rituals-header .section-title');
        if (ritualsTitle) ritualsTitle.setAttribute('data-i18n', 'rituals.sectionTitle');

        const ritualPanels = document.querySelectorAll('.ritual-panel');
        // NOTE: Rituals use inline data-lang-* attributes - managed via CSS
        */
        
        // Booking section
        const bookingTitle = document.querySelector('.booking-title');
        if (bookingTitle) bookingTitle.setAttribute('data-i18n', 'booking.sectionTitle');
        
        const bookingSubtitle = document.querySelector('.booking-subtitle');
        if (bookingSubtitle) bookingSubtitle.setAttribute('data-i18n', 'booking.subtitle');
        
        // Form labels
        const formLabels = {
            'checkin': 'booking.form.checkin',
            'checkout': 'booking.form.checkout',
            'villa': 'booking.form.villa',
            'guests': 'booking.form.guests'
        };
        
        Object.keys(formLabels).forEach(id => {
            const field = document.querySelector(`#${id}`);
            if (field) {
                const label = field.closest('.booking-field')?.querySelector('.field-label');
                if (label) label.setAttribute('data-i18n', formLabels[id]);
            }
        });
        
        // Special requests
        const specialLabel = document.querySelector('.special-requests')?.closest('.booking-field')?.querySelector('.field-label');
        if (specialLabel) specialLabel.setAttribute('data-i18n', 'booking.form.specialRequests');
        
        const specialTextarea = document.querySelector('.special-requests');
        if (specialTextarea) specialTextarea.setAttribute('data-i18n-placeholder', 'booking.form.specialRequestsPlaceholder');
        
        // Villa select placeholder
        const villaSelect = document.querySelector('#villa');
        if (villaSelect) {
            const placeholder = villaSelect.querySelector('option[value=""]');
            if (placeholder) placeholder.setAttribute('data-i18n', 'booking.form.villaPlaceholder');
        }
        
        // Price preview
        const priceRows = document.querySelectorAll('.price-row');
        priceRows.forEach(row => {
            const label = row.querySelector('.price-label');
            if (label) {
                const text = label.textContent.toLowerCase();
                if (text.includes('total')) {
                    label.setAttribute('data-i18n', 'booking.pricing.total');
                }
            }
            
            const value = row.querySelector('.price-value');
            if (value && value.textContent.includes('Fiyat')) {
                value.setAttribute('data-i18n', 'booking.pricing.note');
            }
        });
        
        // Final note
        const finalNote = document.querySelector('.price-preview + p, .booking-actions + p');
        if (finalNote && finalNote.textContent.includes('WhatsApp')) {
            finalNote.setAttribute('data-i18n', 'booking.pricing.finalNote');
        }
        
        // Booking CTA
        const bookingCta = document.querySelector('#whatsapp-btn, .booking-actions .btn-whatsapp');
        if (bookingCta) bookingCta.setAttribute('data-i18n', 'booking.cta');
        
        // Trust badges
        const trustBadges = document.querySelectorAll('.trust-badge');
        const trustKeys = ['instant', 'secure', 'support'];
        trustBadges.forEach((badge, i) => {
            const label = badge.querySelector('.trust-label');
            if (label && trustKeys[i]) {
                label.setAttribute('data-i18n', `booking.trust.${trustKeys[i]}`);
            }
        });
        
        // Gallery
        const galleryTitle = document.querySelector('.chapter-gallery .chapter-title');
        if (galleryTitle) galleryTitle.setAttribute('data-i18n', 'gallery.title');
        
        const gallerySubtitle = document.querySelector('.chapter-gallery .chapter-subtitle');
        if (gallerySubtitle) gallerySubtitle.setAttribute('data-i18n', 'gallery.subtitle');
        
        // Footer
        const footerTitle = document.querySelector('.footer-brand h3');
        if (footerTitle) footerTitle.setAttribute('data-i18n', 'footer.about.title');
        
        const footerDesc = document.querySelector('.footer-brand p');
        if (footerDesc) footerDesc.setAttribute('data-i18n', 'footer.about.description');
        
        // Footer sections
        const footerSections = document.querySelectorAll('.footer-section h4');
        footerSections.forEach(section => {
            const text = section.textContent;
            if (text.includes('Links') || text.includes('Bağlantı')) {
                section.setAttribute('data-i18n', 'footer.quickLinks.title');
            } else if (text.includes('Contact') || text.includes('İletişim')) {
                section.setAttribute('data-i18n', 'footer.contact.title');
            } else if (text.includes('Location') || text.includes('Konum')) {
                section.setAttribute('data-i18n', 'footer.location.title');
            }
        });
        
        // Footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes('villa')) link.setAttribute('data-i18n', 'footer.quickLinks.villas');
            else if (text.includes('gallery') || text.includes('galeri')) link.setAttribute('data-i18n', 'footer.quickLinks.gallery');
            else if (text.includes('location') || text.includes('konum')) link.setAttribute('data-i18n', 'footer.quickLinks.location');
            else if (text.includes('contact') || text.includes('iletişim')) link.setAttribute('data-i18n', 'footer.quickLinks.contact');
        });
        
        // Footer bottom
        const copyright = document.querySelector('.footer-copyright');
        if (copyright) copyright.setAttribute('data-i18n', 'footer.bottom.copyright');
        
        const crafted = document.querySelector('.footer-crafted');
        if (crafted) crafted.setAttribute('data-i18n', 'footer.bottom.crafted');
    }
    
    switchLanguage(lang, animate = true) {
        if (!translations[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('adaBungalowLang', lang);
        
        // Update document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = translations[lang].dir;
        
        // Add RTL class if Arabic
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
        
        // Update all translatable elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = this.getTranslation(key, lang);
            
            if (value) {
                // Check if there's an append attribute
                const appendKey = el.getAttribute('data-i18n-append');
                if (appendKey) {
                    const appendValue = this.getTranslation(appendKey, lang);
                    el.textContent = value + ' ' + appendValue;
                } else {
                    el.textContent = value;
                }
            }
        });
        
        // Update placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = this.getTranslation(key, lang);
            if (value) el.placeholder = value;
        });
        
        // Update WhatsApp links
        const whatsappLinks = document.querySelectorAll('[data-i18n-whatsapp]');
        whatsappLinks.forEach(el => {
            const key = el.getAttribute('data-i18n-whatsapp');
            const message = this.getTranslation(key, lang);
            if (message) {
                const href = el.getAttribute('href');
                if (href && href.includes('wa.me')) {
                    const baseUrl = href.split('?')[0];
                    el.setAttribute('href', `${baseUrl}?text=${encodeURIComponent(message)}`);
                }
            }
        });
        
        // Update language dropdown
        const dropdown = document.getElementById('language-dropdown');
        if (dropdown) {
            dropdown.value = lang;
        }

        // Update active language buttons (for backwards compatibility)
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang') || btn.textContent.toLowerCase().trim();
            btn.classList.remove('active');
            if (btnLang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update weather if needed
        this.updateWeatherTranslation(lang);
        
        // Animate if requested
        if (animate) {
            document.body.style.opacity = '0.95';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 150);
        }
    }
    
    getTranslation(key, lang) {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            value = value?.[k];
            if (!value) break;
        }
        
        return value;
    }
    
    updateWeatherTranslation(lang) {
        const weatherDesc = document.querySelector('.weather-desc');
        if (weatherDesc) {
            const currentWeather = weatherDesc.textContent.toLowerCase();
            let weatherKey = 'clear';
            
            if (currentWeather.includes('cloud') || currentWeather.includes('bulut')) weatherKey = 'cloudy';
            else if (currentWeather.includes('partly') || currentWeather.includes('parçalı')) weatherKey = 'partly_cloudy';
            else if (currentWeather.includes('rain') || currentWeather.includes('yağmur')) weatherKey = 'rain';
            else if (currentWeather.includes('snow') || currentWeather.includes('kar')) weatherKey = 'snow';
            else if (currentWeather.includes('mist') || currentWeather.includes('sis')) weatherKey = 'mist';
            else if (currentWeather.includes('storm') || currentWeather.includes('fırtına')) weatherKey = 'thunderstorm';
            
            const translation = translations[lang].weather[weatherKey];
            if (translation) weatherDesc.textContent = translation;
        }
        
        const weatherLocation = document.querySelector('.weather-location');
        if (weatherLocation) {
            weatherLocation.textContent = translations[lang].weather.location;
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});