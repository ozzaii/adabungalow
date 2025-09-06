// ═══════════════════════════════════════════════════════════════════════════════
// ELEGANT WEATHER WIDGET - MINIMALIST LUXURY EDITION
// Sophisticated, Clean, Perfectly Integrated
// ═══════════════════════════════════════════════════════════════════════════════

class ElegantWeatherWidget {
    constructor() {
        this.lat = 40.6167;
        this.lon = 39.4000;
        this.apiKey = '439d4b804bc8187953eb36d2a8c26a02';
        this.init();
    }
    
    async init() {
        await this.fetchWeather();
        // Update every 10 minutes
        setInterval(() => this.fetchWeather(), 600000);
    }
    
    async fetchWeather() {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric&lang=tr`
            );
            const data = await response.json();
            this.displayElegantWeather(data);
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.displayElegantFallback();
        }
    }
    
    displayElegantWeather(data) {
        const container = document.getElementById('weather-elegant-display');
        if (!container) return;
        
        const temp = Math.round(data.main.temp);
        const feels = Math.round(data.main.feels_like);
        const description = this.capitalizeFirst(data.weather[0].description);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6);
        const pressure = data.main.pressure;
        const visibility = Math.round(data.visibility / 1000);
        
        // Elegant weather icons mapping
        const weatherIcons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        
        const icon = weatherIcons[data.weather[0].icon] || '⛅';
        
        container.innerHTML = `
            <div class="weather-elegant-card">
                <!-- Live Indicator -->
                <div class="weather-live-indicator">
                    <span class="live-dot"></span>
                    <span class="live-text">Canlı</span>
                </div>
                
                <!-- Left Side - Current Weather -->
                <div class="weather-current">
                    <div class="weather-location-elegant">
                        <svg class="location-icon-elegant" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span class="location-name-elegant">Uzungöl, Trabzon</span>
                    </div>
                    
                    <div class="weather-temp-elegant">
                        <span class="temp-number">${temp}</span>
                        <span class="temp-unit">°C</span>
                        <span class="weather-icon-elegant">${icon}</span>
                    </div>
                    
                    <div class="weather-desc-elegant">${description}</div>
                    <div class="weather-feels-elegant">Hissedilen ${feels}°C</div>
                </div>
                
                <!-- Right Side - Weather Details -->
                <div class="weather-details-elegant">
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">💧</span>
                            <span class="detail-value-elegant">${humidity}%</span>
                        </div>
                        <span class="detail-label-elegant">Nem Oranı</span>
                    </div>
                    
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">💨</span>
                            <span class="detail-value-elegant">${windSpeed} km/s</span>
                        </div>
                        <span class="detail-label-elegant">Rüzgar</span>
                    </div>
                    
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">🌡️</span>
                            <span class="detail-value-elegant">${pressure}</span>
                        </div>
                        <span class="detail-label-elegant">Basınç (hPa)</span>
                    </div>
                    
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">👁️</span>
                            <span class="detail-value-elegant">${visibility} km</span>
                        </div>
                        <span class="detail-label-elegant">Görüş Mesafesi</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add smooth entrance animation
        setTimeout(() => {
            const card = container.querySelector('.weather-elegant-card');
            if (card) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, 100);
    }
    
    displayElegantFallback() {
        const container = document.getElementById('weather-elegant-display');
        if (!container) return;
        
        container.innerHTML = `
            <div class="weather-elegant-card">
                <!-- Live Indicator (Offline) -->
                <div class="weather-live-indicator" style="border-color: rgba(150,150,150,0.2); background: rgba(150,150,150,0.08);">
                    <span class="live-dot" style="background: #999;"></span>
                    <span class="live-text" style="color: #999;">Çevrimdışı</span>
                </div>
                
                <!-- Left Side - Current Weather -->
                <div class="weather-current">
                    <div class="weather-location-elegant">
                        <svg class="location-icon-elegant" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span class="location-name-elegant">Uzungöl, Trabzon</span>
                    </div>
                    
                    <div class="weather-temp-elegant">
                        <span class="temp-number">18</span>
                        <span class="temp-unit">°C</span>
                        <span class="weather-icon-elegant">⛅</span>
                    </div>
                    
                    <div class="weather-desc-elegant">Parçalı Bulutlu</div>
                    <div class="weather-feels-elegant">Hissedilen 16°C</div>
                </div>
                
                <!-- Right Side - Weather Details -->
                <div class="weather-details-elegant">
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">💧</span>
                            <span class="detail-value-elegant">75%</span>
                        </div>
                        <span class="detail-label-elegant">Nem Oranı</span>
                    </div>
                    
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">💨</span>
                            <span class="detail-value-elegant">12 km/s</span>
                        </div>
                        <span class="detail-label-elegant">Rüzgar</span>
                    </div>
                    
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">🌡️</span>
                            <span class="detail-value-elegant">1013</span>
                        </div>
                        <span class="detail-label-elegant">Basınç (hPa)</span>
                    </div>
                    
                    <div class="detail-elegant">
                        <div class="detail-icon-row">
                            <span class="detail-icon-elegant">👁️</span>
                            <span class="detail-value-elegant">10 km</span>
                        </div>
                        <span class="detail-label-elegant">Görüş Mesafesi</span>
                    </div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            const card = container.querySelector('.weather-elegant-card');
            if (card) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        }, 100);
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ElegantWeatherWidget();
});