import "./style.css"

const API_KEY = "68D4RCUNCEK9UKMXJ4DF6H56Z"

const searchBtn = document.getElementById("search")
const cityInput = document.getElementById("city")
const weatherInfo = document.querySelector(".info")
const toggleUnitBtn = document.getElementById("toggleUnit")
const getLocationBtn = document.getElementById("getLocation")
const locationStatus = document.getElementById("locationStatus")

let currentData = null
let isCelsius = true

// Event Listeners
toggleUnitBtn.addEventListener("click", () => {
  isCelsius = !isCelsius
  toggleUnitBtn.querySelector("span").textContent = isCelsius ? "Switch to °F" : "Switch to °C"
  if (currentData) {
    displayWeather(currentData)
  }
})

getLocationBtn.addEventListener("click", getCurrentLocation)

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault()
  searchBtn.innerHTML = '<i class="fas fa-spinner"></i>'
  searchBtn.disabled = true

  try {
    await searchWeather()
  } finally {
    // Reset button state
    setTimeout(() => {
      searchBtn.innerHTML = '<i class="fas fa-arrow-right"></i>'
      searchBtn.disabled = false
    }, 1000)
  }
})

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault()
    searchWeather()
  }
})

// Functions
function convertTemp(temp, toCelsius) {
  if (toCelsius) {
    return ((temp - 32) * 5) / 9
  }
  return (temp * 9) / 5 + 32
}

async function searchWeather() {
  try {
    const city = cityInput.value.trim()
    if (!city) {
      showError("Please enter a city name")
      return
    }

    weatherInfo.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Loading weather data...</div>'

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&include=current,days,hours`,
    )

    if (!response.ok) {
      throw new Error("City not found. Please check the spelling and try again.")
    }

    const data = await response.json()
    currentData = data
    displayWeather(data)
  } catch (error) {
    showError(error.message)
  }
}

async function getCurrentLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser")
    return
  }

  getLocationBtn.disabled = true
  locationStatus.textContent = "Getting your location..."

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: true,
      })
    })

    const { latitude, longitude } = position.coords
    locationStatus.textContent = "Location found! Loading weather..."

    weatherInfo.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Loading weather data...</div>'

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${API_KEY}&include=current,days,hours`,
    )

    if (!response.ok) {
      throw new Error("Unable to fetch weather data for your location")
    }

    const data = await response.json()
    currentData = data
    displayWeather(data)
    locationStatus.textContent = "Weather loaded successfully!"
  } catch (error) {
    showError(error.message)
    locationStatus.textContent = "Location access failed"
  } finally {
    getLocationBtn.disabled = false
  }
}

function displayWeather(data) {
  const current = data.currentConditions
  const temp = isCelsius ? current.temp : convertTemp(current.temp, false)
  const feelsLike = isCelsius ? current.feelslike : convertTemp(current.feelslike, false)
  const unit = isCelsius ? "°C" : "°F"

  // Get 5-day forecast
  const forecast = data.days.slice(1, 6)

  const weatherHTML = `
        <div class="weather-card">
            <h2><i class="fas fa-map-marker-alt"></i> ${data.address}</h2>
            <div class="weather-main">
                <img src="https://weather.visualcrossing.com/img/weather-icons/${current.icon}.svg" alt="${current.conditions}">
                <div class="temperature">${Math.round(temp)}${unit}</div>
            </div>
            <div class="weather-details">
                <p><i class="fas fa-cloud"></i> Conditions: ${current.conditions}</p>
                <p><i class="fas fa-temperature-high"></i> Feels like: ${Math.round(feelsLike)}${unit}</p>
                <p><i class="fas fa-tint"></i> Humidity: ${current.humidity}%</p>
                <p><i class="fas fa-wind"></i> Wind: ${Math.round(current.windspeed)} km/h</p>
                <p><i class="fas fa-eye"></i> Visibility: ${Math.round(current.visibility)} km</p>
                <p><i class="fas fa-sun"></i> UV Index: ${current.uvindex}</p>
            </div>
            
            ${displayAirQuality(current)}
            ${displayForecast(forecast)}
        </div>
    `
  weatherInfo.innerHTML = weatherHTML
  cityInput.value = ""
}

function displayAirQuality(current) {
  if (!current.aq) return ""

  const aqi = current.aq
  let aqiClass = "aqi-good"
  let aqiText = "Good"

  if (aqi > 300) {
    aqiClass = "aqi-hazardous"
    aqiText = "Hazardous"
  } else if (aqi > 200) {
    aqiClass = "aqi-very-unhealthy"
    aqiText = "Very Unhealthy"
  } else if (aqi > 150) {
    aqiClass = "aqi-unhealthy"
    aqiText = "Unhealthy"
  } else if (aqi > 100) {
    aqiClass = "aqi-moderate"
    aqiText = "Moderate"
  }

  return `
        <div class="air-quality">
            <h3><i class="fas fa-leaf"></i> Air Quality</h3>
            <div class="aqi-value ${aqiClass}">${aqi}</div>
            <p>${aqiText}</p>
        </div>
    `
}

function displayForecast(forecast) {
  if (!forecast || forecast.length === 0) return ""

  const forecastHTML = forecast
    .map((day) => {
      const date = new Date(day.datetime)
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      const temp = isCelsius ? day.temp : convertTemp(day.temp, false)
      const unit = isCelsius ? "°C" : "°F"

      return `
            <div class="forecast-item">
                <div class="forecast-date">${dayName}</div>
                <img src="https://weather.visualcrossing.com/img/weather-icons/${day.icon}.svg" alt="${day.conditions}" class="forecast-icon">
                <div class="forecast-temp">${Math.round(temp)}${unit}</div>
                <div>${day.conditions}</div>
            </div>
        `
    })
    .join("")

  return `
        <div class="forecast-container">
            <h3 class="forecast-title"><i class="fas fa-calendar-alt"></i> 5-Day Forecast</h3>
            <div class="forecast-grid">
                ${forecastHTML}
            </div>
        </div>
    `
}

function showError(message) {
  weatherInfo.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i> 
            ${message}
            <br><br>
            <small>Try checking your internet connection or searching for a different city.</small>
        </div>
    `
}

// Add some helpful features
function addHelpfulFeatures() {
  // Auto-focus on input
  cityInput.focus()
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  addHelpfulFeatures()

  // Show enhanced welcome message
  weatherInfo.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-cloud-sun"></i>
            <h3>Welcome to Weathery!</h3>
            <p>Get real-time weather information, forecasts, and air quality data for any location worldwide.</p>
        </div>
    `
})
