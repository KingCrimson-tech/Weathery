# Weathery - Smart Weather App 
A modern, responsive weather application that provides real-time weather information, forecasts, and air quality data for any location worldwide.

##  Features
###  **Current Weather**
- Real-time temperature, humidity, wind speed, and visibility
- "Feels like" temperature
- UV index information
- Weather conditions with animated icons
- Temperature unit toggle (Celsius/Fahrenheit)

###  **Location Services**
- Search any city worldwide
- Use current GPS location for instant weather data
- Automatic location detection with user permission

###  **5-Day Forecast**
- Detailed weather predictions for the next 5 days
- Daily high/low temperatures
- Weather conditions for each day
- Responsive grid layout

###  **Air Quality Index**
- Real-time air quality data
- Color-coded AQI levels (Good, Moderate, Unhealthy, etc.)
- Health recommendations based on air quality

###  **Responsive Design**
- Fully responsive across all devices (desktop, tablet, mobile)
- Mobile-first approach with touch-friendly interface
- Dark mode support (follows system preferences)
- Smooth animations and transitions

###  **Modern UI/UX**
- Beautiful gradient backgrounds
- Glassmorphism design elements
- Smooth hover effects and animations
- Intuitive navigation and user feedback

##  Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Webpack
- **Weather API**: Visual Crossing Weather API
- **Icons**: Font Awesome
- **Styling**: Custom CSS with modern design patterns

##  API Endpoints Used
- **Current Weather**: `/timeline/{location}?unitGroup=metric`
- **Forecast Data**: Includes 5-day forecast in the same response
- **Air Quality**: Available in current conditions data