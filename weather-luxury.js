// ═══════════════════════════════════════════════════════════════════════════════
// UZUNGÖL WEATHER - LUXURY DISPLAY
// Real-time weather integration with stunning visuals
// ═══════════════════════════════════════════════════════════════════════════════

class UzungolWeather {
    constructor() {
        // Uzungöl coordinates
        this.lat = 40.6167;
        this.lon = 39.4000;
        this.apiKey = '439d4b804bc8187953eb36d2a8c26a02'; // OpenWeatherMap free tier
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
            this.displayWeather(data);
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.displayFallback();
        }
    }
    
    displayWeather(data) {
        const weatherWidget = document.getElementById('weather-widget');
        if (!weatherWidget) return;
        
        const temp = Math.round(data.main.temp);
        const feels = Math.round(data.main.feels_like);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
        
        // Weather icons mapping
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
        
        const icon = weatherIcons[data.weather[0].icon] || '🌤️';
        
        weatherWidget.innerHTML = `
            <div class="weather-header">
                <h3 class="weather-location">Uzungöl</h3>
                <p class="weather-live">• CANLI</p>
            </div>
            
            <div class="weather-main">
                <div class="weather-temp-group">
                    <span class="weather-icon">${icon}</span>
                    <div class="weather-temp">
                        <span class="temp-value">${temp}</span>
                        <span class="temp-unit">°C</span>
                    </div>
                </div>
                <p class="weather-desc">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            </div>
            
            <div class="weather-details">
                <div class="weather-detail">
                    <span class="detail-icon">🌡️</span>
                    <div class="detail-info">
                        <p class="detail-label">Hissedilen</p>
                        <p class="detail-value">${feels}°C</p>
                    </div>
                </div>
                <div class="weather-detail">
                    <span class="detail-icon">💧</span>
                    <div class="detail-info">
                        <p class="detail-label">Nem</p>
                        <p class="detail-value">${humidity}%</p>
                    </div>
                </div>
                <div class="weather-detail">
                    <span class="detail-icon">💨</span>
                    <div class="detail-info">
                        <p class="detail-label">Rüzgar</p>
                        <p class="detail-value">${windSpeed} km/s</p>
                    </div>
                </div>
            </div>
            
            <div class="weather-footer">
                <p class="weather-update">Son güncelleme: ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
        `;
        
        // Add animation class
        weatherWidget.classList.add('weather-loaded');
    }
    
    displayFallback() {
        const weatherWidget = document.getElementById('weather-widget');
        if (!weatherWidget) return;
        
        // Display typical Uzungöl weather as fallback
        weatherWidget.innerHTML = `
            <div class="weather-header">
                <h3 class="weather-location">Uzungöl</h3>
                <p class="weather-offline">• ÇEVRİMDIŞI</p>
            </div>
            
            <div class="weather-main">
                <div class="weather-temp-group">
                    <span class="weather-icon">🌤️</span>
                    <div class="weather-temp">
                        <span class="temp-value">18</span>
                        <span class="temp-unit">°C</span>
                    </div>
                </div>
                <p class="weather-desc">Parçalı Bulutlu</p>
            </div>
            
            <div class="weather-details">
                <div class="weather-detail">
                    <span class="detail-icon">🌡️</span>
                    <div class="detail-info">
                        <p class="detail-label">Hissedilen</p>
                        <p class="detail-value">16°C</p>
                    </div>
                </div>
                <div class="weather-detail">
                    <span class="detail-icon">💧</span>
                    <div class="detail-info">
                        <p class="detail-label">Nem</p>
                        <p class="detail-value">75%</p>
                    </div>
                </div>
                <div class="weather-detail">
                    <span class="detail-icon">💨</span>
                    <div class="detail-info">
                        <p class="detail-label">Rüzgar</p>
                        <p class="detail-value">12 km/s</p>
                    </div>
                </div>
            </div>
            
            <div class="weather-footer">
                <p class="weather-update">Tipik Uzungöl havası</p>
            </div>
        `;
        
        weatherWidget.classList.add('weather-loaded');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new UzungolWeather();
    });
} else {
    new UzungolWeather();
}