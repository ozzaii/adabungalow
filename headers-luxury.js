// ═══════════════════════════════════════════════════════════════════════════════
// LUXURY HEADERS - DYNAMIC HEADER ENHANCEMENT
// Transform all headers into luxury masterpieces
// ═══════════════════════════════════════════════════════════════════════════════

class LuxuryHeaders {
    constructor() {
        this.init();
    }
    
    init() {
        this.enhanceAllHeaders();
        this.addSectionNumbers();
    }
    
    enhanceAllHeaders() {
        // Define header configurations for each section
        const headerConfigs = [
            {
                selector: '#villas',
                label: 'Villalarımız',
                title: 'Lüks Konaklama',
                subtitle: 'Her detayı özenle tasarlanmış, konforun zirvesinde villalar',
                number: '01'
            },
            {
                selector: '#experience',
                label: 'Deneyim',
                title: 'Unutulmaz Anlar',
                subtitle: 'Doğanın kalbinde, huzurun ve lüksün mükemmel birleşimi',
                number: '02'
            },
            {
                selector: '#weather',
                label: 'Uzungöl',
                title: 'Hava Durumu',
                subtitle: 'Canlı meteorolojik veriler ile planlarınızı yapın',
                number: '03'
            },
            {
                selector: '#gallery',
                label: 'Galeri',
                title: 'Görsel Şölen',
                subtitle: 'Her kare, unutulmaz anılarınızın başlangıcı',
                number: '04'
            }
        ];
        
        // Process each section
        headerConfigs.forEach(config => {
            const section = document.querySelector(config.selector);
            if (!section) return;
            
            // Find or create header container
            let headerContainer = section.querySelector('.section-header, .weather-elegant-header, .gallery-header');
            
            if (!headerContainer) {
                // If no header exists, create one
                headerContainer = document.createElement('div');
                headerContainer.className = 'section-header-luxury';
                
                // Insert at the beginning of the section's container
                const container = section.querySelector('.container, .weather-elegant-container, [class*="container"]');
                if (container) {
                    container.insertBefore(headerContainer, container.firstChild);
                }
            } else {
                // Add luxury class to existing header
                headerContainer.classList.add('section-header-luxury');
            }
            
            // Update header content with luxury styling
            const headerHTML = `
                <span class="section-number">${config.number}</span>
                <div class="section-badge-luxury" data-aos="fade-down" data-aos-duration="800">
                    <p class="section-label-luxury">${config.label}</p>
                </div>
                <h2 class="section-title-luxury${config.selector === '#gallery' ? ' gold' : ''}" 
                    data-aos="fade-up" 
                    data-aos-delay="200" 
                    data-aos-duration="1000">
                    ${config.title}
                </h2>
                <div class="section-divider" data-aos="fade-up" data-aos-delay="400">
                    <span class="divider-line"></span>
                    <span class="divider-diamond"></span>
                    <span class="divider-line"></span>
                </div>
                <p class="section-subtitle-luxury" 
                   data-aos="fade-up" 
                   data-aos-delay="600" 
                   data-aos-duration="1000">
                    ${config.subtitle}
                </p>
            `;
            
            // Only update if the header doesn't already have luxury content
            if (!headerContainer.querySelector('.section-badge-luxury')) {
                headerContainer.innerHTML = headerHTML;
            }
        });
        
        // Special handling for weather section
        const weatherHeader = document.querySelector('.weather-elegant-header');
        if (weatherHeader && !weatherHeader.classList.contains('section-header-luxury')) {
            weatherHeader.classList.add('section-header-luxury', 'weather-header-luxury');
            weatherHeader.innerHTML = `
                <span class="section-number">03</span>
                <div class="section-badge-luxury" data-aos="fade-down">
                    <p class="section-label-luxury">Uzungöl</p>
                </div>
                <h2 class="section-title-luxury gold" data-aos="fade-up" data-aos-delay="200">
                    Hava Durumu
                </h2>
                <div class="section-divider" data-aos="fade-up" data-aos-delay="400">
                    <span class="divider-line"></span>
                    <span class="divider-diamond"></span>
                    <span class="divider-line"></span>
                </div>
                <p class="section-subtitle-luxury" data-aos="fade-up" data-aos-delay="600">
                    Canlı meteorolojik veriler ile planlarınızı yapın
                </p>
            `;
        }
        
        // Special handling for gallery section
        const gallerySection = document.querySelector('.gallery-excellence');
        if (gallerySection) {
            const galleryHeader = gallerySection.querySelector('.section-header, .gallery-header');
            if (galleryHeader && !galleryHeader.classList.contains('gallery-header-luxury')) {
                galleryHeader.classList.add('section-header-luxury', 'gallery-header-luxury');
            }
        }
    }
    
    addSectionNumbers() {
        // Add floating section numbers if they don't exist
        const sections = [
            { selector: '#villas', number: '01' },
            { selector: '#experience', number: '02' },
            { selector: '#weather', number: '03' },
            { selector: '#gallery', number: '04' }
        ];
        
        sections.forEach(section => {
            const element = document.querySelector(section.selector);
            if (element && !element.querySelector('.section-number')) {
                const numberEl = document.createElement('span');
                numberEl.className = 'section-number';
                numberEl.textContent = section.number;
                element.style.position = 'relative';
                element.appendChild(numberEl);
            }
        });
    }
    
    // Add parallax effect to section numbers
    initParallax() {
        const numbers = document.querySelectorAll('.section-number');
        
        window.addEventListener('scroll', () => {
            numbers.forEach(number => {
                const rect = number.getBoundingClientRect();
                const speed = 0.5;
                const yPos = rect.top * speed;
                
                number.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to create their elements
    setTimeout(() => {
        new LuxuryHeaders();
    }, 500);
});