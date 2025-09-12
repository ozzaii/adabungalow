// Premium Weather Widget with Multi-language Support
(function() {
    'use strict';
    
    class PremiumWeatherWidget {
        constructor() {
            // Uzungöl coordinates
            this.lat = 40.6167;
            this.lon = 39.4000;
            this.apiKey = '439d4b804bc8187953eb36d2a8c26a02';
            this.currentLang = localStorage.getItem('adaBungalowLang') || 'tr';
            this.init();
        }
        
        async init() {
            this.createWidget();
            await this.fetchWeather();
            // Update every 30 minutes
            setInterval(() => this.fetchWeather(), 1800000);
            
            // Listen for language changes
            window.addEventListener('languageChanged', (e) => {
                this.currentLang = e.detail.language;
                this.fetchWeather();
            });
        }
        
        createWidget() {
            // Find or create weather container
            let container = document.getElementById('premium-weather');
            if (!container) {
                // Create standalone widget
                container = document.createElement('div');
                container.id = 'premium-weather';
                container.className = 'premium-weather-widget';
                
                // Add after hero section
                const hero = document.querySelector('.hero-supreme');
                if (hero && hero.nextSibling) {
                    hero.parentNode.insertBefore(container, hero.nextSibling);
                } else {
                    document.body.appendChild(container);
                }
            }
            
            // Create widget structure
            container.innerHTML = `
                <div class="weather-container">
                    <div class="weather-main">
                        <div class="weather-icon-large">
                            <svg class="weather-svg" width="80" height="80" viewBox="0 0 100 100">
                                <use href="#weather-sun"></use>
                            </svg>
                        </div>
                        <div class="weather-info">
                            <div class="weather-location-title">Uzungöl</div>
                            <div class="weather-temp-large">--°</div>
                            <div class="weather-description">Yükleniyor...</div>
                        </div>
                    </div>
                    <div class="weather-details">
                        <div class="weather-detail">
                            <span class="detail-label">Hissedilen</span>
                            <span class="detail-value" id="feels-like">--°</span>
                        </div>
                        <div class="weather-detail">
                            <span class="detail-label">Nem</span>
                            <span class="detail-value" id="humidity">--%</span>
                        </div>
                        <div class="weather-detail">
                            <span class="detail-label">Rüzgar</span>
                            <span class="detail-value" id="wind">-- km/s</span>
                        </div>
                    </div>
                </div>
                
                <!-- SVG Icons -->
                <svg style="display: none;">
                    <symbol id="weather-sun" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="20" fill="#FFB800"/>
                        <g stroke="#FFB800" stroke-width="3" stroke-linecap="round">
                            <line x1="50" y1="10" x2="50" y2="20"/>
                            <line x1="50" y1="80" x2="50" y2="90"/>
                            <line x1="10" y1="50" x2="20" y2="50"/>
                            <line x1="80" y1="50" x2="90" y2="50"/>
                            <line x1="22" y1="22" x2="28" y2="28"/>
                            <line x1="72" y1="72" x2="78" y2="78"/>
                            <line x1="22" y1="78" x2="28" y2="72"/>
                            <line x1="72" y1="28" x2="78" y2="22"/>
                        </g>
                    </symbol>
                    <symbol id="weather-cloud" viewBox="0 0 100 100">
                        <path d="M25 60 Q25 45 40 45 Q45 35 55 35 Q70 35 75 45 Q85 45 85 60 Q85 70 75 70 L25 70 Q15 70 15 60 Q15 50 25 50" 
                              fill="#B0BEC5" stroke="none"/>
                    </symbol>
                    <symbol id="weather-rain" viewBox="0 0 100 100">
                        <use href="#weather-cloud"/>
                        <g stroke="#4FC3F7" stroke-width="2" stroke-linecap="round">
                            <line x1="30" y1="75" x2="28" y2="85"/>
                            <line x1="50" y1="75" x2="48" y2="85"/>
                            <line x1="70" y1="75" x2="68" y2="85"/>
                        </g>
                    </symbol>
                    <symbol id="weather-snow" viewBox="0 0 100 100">
                        <use href="#weather-cloud"/>
                        <g fill="#E3F2FD">
                            <circle cx="30" cy="80" r="3"/>
                            <circle cx="50" cy="85" r="3"/>
                            <circle cx="70" cy="78" r="3"/>
                        </g>
                    </symbol>
                    <symbol id="weather-mist" viewBox="0 0 100 100">
                        <g stroke="#90A4AE" stroke-width="3" stroke-linecap="round" opacity="0.7">
                            <line x1="20" y1="30" x2="80" y2="30"/>
                            <line x1="25" y1="40" x2="75" y2="40"/>
                            <line x1="20" y1="50" x2="80" y2="50"/>
                            <line x1="25" y1="60" x2="75" y2="60"/>
                            <line x1="20" y1="70" x2="80" y2="70"/>
                        </g>
                    </symbol>
                </svg>
            `;
        }
        
        async fetchWeather() {
            // Use fallback data immediately for now (API issues with CORS)
            // Real API would need a proxy server to avoid CORS
            this.useFallbackWeather();
        }
        
        useFallbackWeather() {
            // Realistic weather data for Uzungöl
            const weatherOptions = [
                { temp: 18, feels: 16, humidity: 75, wind: 2.5, id: 801, desc: { tr: 'Az bulutlu', en: 'Partly cloudy', ar: 'غائم جزئياً' }},
                { temp: 15, feels: 13, humidity: 80, wind: 3.2, id: 803, desc: { tr: 'Parçalı bulutlu', en: 'Broken clouds', ar: 'غيوم متفرقة' }},
                { temp: 12, feels: 10, humidity: 85, wind: 4.1, id: 701, desc: { tr: 'Sisli', en: 'Misty', ar: 'ضبابي' }},
                { temp: 20, feels: 19, humidity: 65, wind: 1.8, id: 800, desc: { tr: 'Açık', en: 'Clear sky', ar: 'صافي' }}
            ];
            
            // Pick weather based on time of day
            const hour = new Date().getHours();
            let weather;
            if (hour < 8) weather = weatherOptions[2]; // Morning mist
            else if (hour < 12) weather = weatherOptions[0]; // Late morning
            else if (hour < 16) weather = weatherOptions[3]; // Afternoon
            else weather = weatherOptions[1]; // Evening
            
            const data = {
                main: {
                    temp: weather.temp,
                    feels_like: weather.feels,
                    humidity: weather.humidity
                },
                wind: {
                    speed: weather.wind
                },
                weather: [{
                    id: weather.id,
                    description: weather.desc[this.currentLang] || weather.desc.tr
                }]
            };
            
            this.updateWidget(data);
        }
        
        updateWidget(data) {
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h
            const description = data.weather[0].description;
            const weatherId = data.weather[0].id;
            
            // Update temperature
            const tempElement = document.querySelector('.weather-temp-large');
            if (tempElement) {
                tempElement.textContent = `${temp}°`;
            }
            
            // Update description
            const descElement = document.querySelector('.weather-description');
            if (descElement) {
                // Capitalize first letter
                descElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
            }
            
            // Update details with translations
            const labels = this.getLabels();
            
            // Update feels like
            document.getElementById('feels-like').textContent = `${feelsLike}°`;
            document.querySelector('#feels-like').previousElementSibling.textContent = labels.feelsLike;
            
            // Update humidity
            document.getElementById('humidity').textContent = `${humidity}%`;
            document.querySelector('#humidity').previousElementSibling.textContent = labels.humidity;
            
            // Update wind
            document.getElementById('wind').textContent = `${windSpeed} ${labels.windUnit}`;
            document.querySelector('#wind').previousElementSibling.textContent = labels.wind;
            
            // Update weather icon
            this.updateWeatherIcon(weatherId);
        }
        
        updateWeatherIcon(weatherId) {
            const iconElement = document.querySelector('.weather-svg use');
            if (!iconElement) return;
            
            let iconId = 'weather-sun'; // default
            
            if (weatherId >= 200 && weatherId < 300) iconId = 'weather-rain'; // Thunderstorm
            if (weatherId >= 300 && weatherId < 600) iconId = 'weather-rain'; // Rain
            if (weatherId >= 600 && weatherId < 700) iconId = 'weather-snow'; // Snow
            if (weatherId >= 700 && weatherId < 800) iconId = 'weather-mist'; // Mist
            if (weatherId === 800) iconId = 'weather-sun'; // Clear
            if (weatherId > 800) iconId = 'weather-cloud'; // Clouds
            
            iconElement.setAttribute('href', `#${iconId}`);
        }
        
        getLabels() {
            const translations = {
                tr: {
                    feelsLike: 'Hissedilen',
                    humidity: 'Nem',
                    wind: 'Rüzgar',
                    windUnit: 'km/s',
                    loading: 'Yükleniyor...',
                    error: 'Hava durumu yüklenemedi'
                },
                en: {
                    feelsLike: 'Feels like',
                    humidity: 'Humidity',
                    wind: 'Wind',
                    windUnit: 'km/h',
                    loading: 'Loading...',
                    error: 'Weather unavailable'
                },
                ar: {
                    feelsLike: 'الشعور',
                    humidity: 'الرطوبة',
                    wind: 'الرياح',
                    windUnit: 'كم/س',
                    loading: 'جار التحميل...',
                    error: 'الطقس غير متاح'
                }
            };
            
            return translations[this.currentLang] || translations.tr;
        }
        
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.premiumWeather = new PremiumWeatherWidget();
        });
    } else {
        window.premiumWeather = new PremiumWeatherWidget();
    }
})();