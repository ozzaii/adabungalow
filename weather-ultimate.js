// ═══════════════════════════════════════════════════════════════════════════════
// ULTIMATE WEATHER WIDGET - LUXURY EDITION
// The most beautiful weather display ever created
// ═══════════════════════════════════════════════════════════════════════════════

class UltimateWeatherWidget {
    constructor() {
        this.lat = 40.6167;
        this.lon = 39.4000;
        this.apiKey = '439d4b804bc8187953eb36d2a8c26a02';
        this.init();
    }
    
    async init() {
        this.createParticles();
        await this.fetchWeather();
        setInterval(() => this.fetchWeather(), 600000); // Update every 10 min
    }
    
    createParticles() {
        const particlesContainer = document.querySelector('.weather-particles');
        if (!particlesContainer) return;
        
        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    async fetchWeather() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric&lang=tr`
            );
            const data = await response.json();
            this.displayLuxuryWeather(data);
        } catch (error) {
            console.error('Weather error:', error);
            this.displayLuxuryFallback();
        }
    }
    
    displayLuxuryWeather(data) {
        const container = document.getElementById('weather-luxury-widget');
        if (!container) return;
        
        const temp = Math.round(data.main.temp);
        const feels = Math.round(data.main.feels_like);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6);
        const pressure = data.main.pressure;
        const visibility = Math.round(data.visibility / 1000);
        
        // Luxury weather icons
        const weatherIcons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '🌤️', '02n': '☁️',
            '03d': '⛅', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '🌨️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        
        const icon = weatherIcons[data.weather[0].icon] || '🌤️';
        
        container.innerHTML = `
            <div class="weather-status">
                <span class="status-dot"></span>
                <span class="status-text">Canlı</span>
            </div>
            
            <div class="weather-main-display">
                <div class="weather-primary">
                    <div class="weather-location-luxury">
                        <div class="location-pin">📍</div>
                        <div class="location-text">
                            <h3>Uzungöl</h3>
                            <p>Çaykara, Trabzon</p>
                        </div>
                    </div>
                    
                    <div class="temperature-display">
                        <div class="temp-main">
                            ${temp}<span class="degree">°C</span>
                        </div>
                        <div class="temp-feels">
                            Hissedilen ${feels}°C
                        </div>
                    </div>
                    
                    <div class="weather-description-luxury">
                        ${this.capitalizeFirst(description)}
                    </div>
                </div>
                
                <div class="weather-visual">
                    <div class="weather-rings">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                    </div>
                    <div class="weather-icon-3d">
                        <span class="weather-icon-main">${icon}</span>
                    </div>
                </div>
            </div>
            
            <div class="weather-details-luxury">
                <div class="detail-card">
                    <div class="detail-icon-luxury">💧</div>
                    <div class="detail-value-luxury">${humidity}%</div>
                    <div class="detail-label-luxury">Nem</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-icon-luxury">💨</div>
                    <div class="detail-value-luxury">${windSpeed}</div>
                    <div class="detail-label-luxury">km/saat</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-icon-luxury">🌡️</div>
                    <div class="detail-value-luxury">${pressure}</div>
                    <div class="detail-label-luxury">hPa</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-icon-luxury">👁️</div>
                    <div class="detail-value-luxury">${visibility}</div>
                    <div class="detail-label-luxury">km görüş</div>
                </div>
            </div>
        `;
        
        // Add entrance animation
        setTimeout(() => {
            container.classList.add('weather-loaded');
        }, 100);
    }
    
    displayLuxuryFallback() {
        const container = document.getElementById('weather-luxury-widget');
        if (!container) return;
        
        container.innerHTML = `
            <div class="weather-status">
                <span class="status-dot" style="background: #999;"></span>
                <span class="status-text" style="color: #999;">Çevrimdışı</span>
            </div>
            
            <div class="weather-main-display">
                <div class="weather-primary">
                    <div class="weather-location-luxury">
                        <div class="location-pin">📍</div>
                        <div class="location-text">
                            <h3>Uzungöl</h3>
                            <p>Çaykara, Trabzon</p>
                        </div>
                    </div>
                    
                    <div class="temperature-display">
                        <div class="temp-main">
                            18<span class="degree">°C</span>
                        </div>
                        <div class="temp-feels">
                            Hissedilen 16°C
                        </div>
                    </div>
                    
                    <div class="weather-description-luxury">
                        Parçalı Bulutlu
                    </div>
                </div>
                
                <div class="weather-visual">
                    <div class="weather-rings">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                    </div>
                    <div class="weather-icon-3d">
                        <span class="weather-icon-main">🌤️</span>
                    </div>
                </div>
            </div>
            
            <div class="weather-details-luxury">
                <div class="detail-card">
                    <div class="detail-icon-luxury">💧</div>
                    <div class="detail-value-luxury">75%</div>
                    <div class="detail-label-luxury">Nem</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-icon-luxury">💨</div>
                    <div class="detail-value-luxury">12</div>
                    <div class="detail-label-luxury">km/saat</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-icon-luxury">🌡️</div>
                    <div class="detail-value-luxury">1013</div>
                    <div class="detail-label-luxury">hPa</div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-icon-luxury">👁️</div>
                    <div class="detail-value-luxury">10</div>
                    <div class="detail-label-luxury">km görüş</div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            container.classList.add('weather-loaded');
        }, 100);
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new UltimateWeatherWidget();
});