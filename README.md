# Weathery - Smart Weather App 
A modern, responsive weather application built with React, TypeScript, and shadcn/ui that provides real-time weather information, forecasts, and air quality data for any location worldwide.

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
- Built with shadcn/ui components for professional design
- Beautiful gradient backgrounds
- Card-based layout with clean shadows
- Smooth hover effects and animations
- Intuitive navigation and user feedback
- Skeleton loading states

##  Technologies Used
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Weather API**: Visual Crossing Weather API
- **Utilities**: class-variance-authority, clsx, tailwind-merge

##  Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation
1. Clone the repository:
```bash
git clone https://github.com/KingCrimson-tech/Weathery.git
cd Weathery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

##  API Endpoints Used
- **Current Weather**: `/timeline/{location}?unitGroup=metric`
- **Forecast Data**: Includes 5-day forecast in the same response
- **Air Quality**: Available in current conditions data