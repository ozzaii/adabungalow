/* ═══════════════════════════════════════════════════════════════════════════════
   ADA BUNGALOW - WHATSAPP BOOKING UTILITY
   Simple, bulletproof WhatsApp booking integration
   ═══════════════════════════════════════════════════════════════════════════════ */

// Configuration
const WHATSAPP_NUMBER = '905454174344'; // Ada Bungalow WhatsApp

// Message templates per locale
const TEMPLATES = {
    tr: {
        greeting: 'Merhaba Ada Bungalow 👋',
        title: 'Rezervasyon talebim:',
        fields: {
            range: '• Tarih: {value}',
            guests: '• Kişi: {value}',
            villa: '• Villa: {value}',
            note: '• Özel istek: {value}'
        },
        closing: 'Uygunluk ve toplam fiyatı iletebilir misiniz? Teşekkürler.'
    },
    en: {
        greeting: 'Hello Ada Bungalow 👋',
        title: 'My reservation request:',
        fields: {
            range: '• Dates: {value}',
            guests: '• Guests: {value}',
            villa: '• Villa: {value}',
            note: '• Special request: {value}'
        },
        closing: 'Could you please confirm availability and pricing? Thank you.'
    },
    ar: {
        greeting: 'مرحبا Ada Bungalow 👋',
        title: 'طلب الحجز الخاص بي:',
        fields: {
            range: '• التواريخ: {value}',
            guests: '• الضيوف: {value}',
            villa: '• الفيلا: {value}',
            note: '• طلب خاص: {value}'
        },
        closing: 'هل يمكنك تأكيد التوفر والسعر؟ شكراً.'
    }
};

/**
 * Detects if user is on mobile device
 * @returns {boolean}
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Builds WhatsApp message from payload
 * @param {string} locale - Language code (tr/en/ar)
 * @param {object} payload - Message data
 * @param {string} [payload.range] - Date range (e.g., "12-14 Nov")
 * @param {string} [payload.guests] - Guest count (e.g., "2 adults, 1 child")
 * @param {string} [payload.villa] - Villa name
 * @param {string} [payload.note] - Special requests
 * @returns {string} Formatted message
 */
function buildMessage(locale, payload = {}) {
    const template = TEMPLATES[locale] || TEMPLATES.tr;
    let message = `${template.greeting}\n\n${template.title}\n`;

    // Add fields only if they have values
    Object.keys(template.fields).forEach(key => {
        if (payload[key]) {
            message += template.fields[key].replace('{value}', payload[key]) + '\n';
        }
    });

    message += `\n${template.closing}`;
    return message;
}

/**
 * Builds WhatsApp URL with prefilled message
 * @param {string} locale - Language code (tr/en/ar)
 * @param {object} payload - Message data
 * @returns {string} WhatsApp URL
 */
function buildWhatsAppURL(locale, payload = {}) {
    const message = buildMessage(locale, payload);
    const encodedMessage = encodeURIComponent(message);

    // Mobile: wa.me (opens app directly)
    // Desktop: web.whatsapp.com (opens web version)
    const baseURL = isMobile()
        ? `https://wa.me/${WHATSAPP_NUMBER}`
        : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;

    return `${baseURL}${isMobile() ? '?' : '&'}text=${encodedMessage}`;
}

/**
 * Tracks WhatsApp click event
 * @param {object} eventData - Analytics data
 */
function trackWhatsAppClick(eventData) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'wa_click', {
            location: eventData.location || 'unknown',
            locale: eventData.locale || 'tr',
            villa_slug: eventData.villaSlug || '',
            has_dates: eventData.hasDates || false,
            has_guests: eventData.hasGuests || false
        });
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact', {
            content_name: 'WhatsApp Booking',
            content_category: eventData.location
        });
    }

    // Console log for debugging
    console.log('[Ada Bungalow] WhatsApp Click:', eventData);
}

/**
 * Initializes WhatsApp booking on all CTAs
 */
function initWhatsAppBooking() {
    // Get current language
    const currentLang = document.documentElement.lang || 'tr';

    // Find all elements with data-wa attribute
    const whatsappCTAs = document.querySelectorAll('[data-wa]');

    whatsappCTAs.forEach(cta => {
        cta.addEventListener('click', function(e) {
            e.preventDefault();

            // Get payload from data attributes
            const payload = {
                range: this.dataset.waRange || '',
                guests: this.dataset.waGuests || '',
                villa: this.dataset.waVilla || '',
                note: this.dataset.waNote || ''
            };

            // Get location from data attribute
            const location = this.dataset.waLocation || 'unknown';

            // Build URL
            const url = buildWhatsAppURL(currentLang, payload);

            // Track event
            trackWhatsAppClick({
                location: location,
                locale: currentLang,
                villaSlug: payload.villa.toLowerCase().replace(/\s+/g, '-'),
                hasDates: !!payload.range,
                hasGuests: !!payload.guests
            });

            // Open WhatsApp
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });

    console.log(`[Ada Bungalow] WhatsApp booking initialized for ${whatsappCTAs.length} CTAs`);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppBooking);
} else {
    initWhatsAppBooking();
}

// Export for manual use
window.AdaBungalow = window.AdaBungalow || {};
window.AdaBungalow.buildWhatsAppURL = buildWhatsAppURL;
window.AdaBungalow.trackWhatsAppClick = trackWhatsAppClick;
