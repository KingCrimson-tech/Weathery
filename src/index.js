import './style.css';
const API_KEY = '68D4RCUNCEK9UKMXJ4DF6H56Z';

const searchBtn = document.getElementById('search');
const cityInput = document.getElementById('city');
const weatherInfo = document.querySelector('.info');
const toggleUnitBtn = document.getElementById('toggleUnit');

let currentData = null;
let isCelsius = true;

toggleUnitBtn.addEventListener('click', () => {
    isCelsius = !isCelsius;
    toggleUnitBtn.querySelector('span').textContent = isCelsius ? 'Switch to °F' : 'Switch to °C';
    if (currentData) {
        displayWeather(currentData);
    }
});

function convertTemp(temp, toCelsius) {
    if (toCelsius) {
        return (temp - 32) * 5/9;
    }
    return (temp * 9/5) + 32;
}

searchBtn.addEventListener('click', async () => {
    try {
        const city = cityInput.value.trim();
        if (!city) {
            showError('Please enter a city name');
            return;
        }

        weatherInfo.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Loading weather data...</div>';
        
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        currentData = data;
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
});

function displayWeather(data) {
    const current = data.currentConditions;
    const temp = isCelsius ? current.temp : convertTemp(current.temp, false);
    const feelsLike = isCelsius ? current.feelslike : convertTemp(current.feelslike, false);
    const unit = isCelsius ? '°C' : '°F';
    
    const weatherHTML = `
        <div class="weather-card">
            <h2>${data.address}</h2>
            <div class="weather-main">
                <img src="https://weather.visualcrossing.com/img/weather-icons/${current.icon}.svg" alt="${current.conditions}">
                <div class="temperature">${Math.round(temp)}${unit}</div>
            </div>
            <div class="weather-details">
                <p><i class="fas fa-cloud"></i> Conditions: ${current.conditions}</p>
                <p><i class="fas fa-temperature-high"></i> Feels like: ${Math.round(feelsLike)}${unit}</p>
                <p><i class="fas fa-tint"></i> Humidity: ${current.humidity}%</p>
                <p><i class="fas fa-wind"></i> Wind: ${Math.round(current.windspeed)} km/h</p>
            </div>
        </div>
    `;
    weatherInfo.innerHTML = weatherHTML;
    cityInput.value = '';
}

function showError(message) {
    weatherInfo.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${message}</div>`;
}

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});