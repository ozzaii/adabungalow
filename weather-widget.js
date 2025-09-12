// Simple Weather Widget for Uzungöl
(function() {
    'use strict';
    
    class WeatherWidget {
        constructor() {
            // Uzungöl coordinates
            this.lat = 40.6167;
            this.lon = 39.4000;
            this.apiKey = '439d4b804bc8187953eb36d2a8c26a02'; // OpenWeatherMap free tier
            this.init();
        }
        
        async init() {
            await this.fetchWeather();
            // Update every 30 minutes
            setInterval(() => this.fetchWeather(), 1800000);
        }
        
        async fetchWeather() {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
                );
                
                if (!response.ok) throw new Error('Weather fetch failed');
                
                const data = await response.json();
                this.updateWidget(data);
            } catch (error) {
                console.error('Weather error:', error);
                // Keep default values on error
            }
        }
        
        updateWidget(data) {
            const temp = Math.round(data.main.temp);
            const description = this.getSimpleDescription(data.weather[0].id);
            
            // Update temperature
            const tempElement = document.querySelector('.weather-temp');
            if (tempElement) {
                tempElement.textContent = `${temp}°C`;
            }
            
            // Update description
            const descElement = document.querySelector('.weather-desc');
            if (descElement) {
                descElement.textContent = description;
            }
            
            // Add weather icon
            this.addWeatherIcon(data.weather[0].icon);
        }
        
        getSimpleDescription(weatherId) {
            // Simplified weather descriptions
            if (weatherId >= 200 && weatherId < 300) return 'Stormy';
            if (weatherId >= 300 && weatherId < 400) return 'Drizzle';
            if (weatherId >= 500 && weatherId < 600) return 'Rainy';
            if (weatherId >= 600 && weatherId < 700) return 'Snowy';
            if (weatherId >= 700 && weatherId < 800) return 'Misty';
            if (weatherId === 800) return 'Clear';
            if (weatherId > 800 && weatherId < 900) return 'Cloudy';
            return 'Partly cloudy';
        }
        
        addWeatherIcon(iconCode) {
            const weatherChip = document.querySelector('.weather-chip');
            if (!weatherChip) return;
            
            // Remove existing icon if any
            const existingIcon = weatherChip.querySelector('.weather-icon');
            if (existingIcon) existingIcon.remove();
            
            // Map to simple emoji icons
            const iconMap = {
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
            
            const icon = document.createElement('span');
            icon.className = 'weather-icon';
            icon.textContent = iconMap[iconCode] || '☁️';
            icon.style.marginRight = '0.5rem';
            weatherChip.insertBefore(icon, weatherChip.firstChild);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new WeatherWidget();
        });
    } else {
        new WeatherWidget();
    }
})();