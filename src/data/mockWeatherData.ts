import { WeatherData } from '@/types/weather';

// Generate mock data with dynamic dates
function generateMockWeatherData(): WeatherData {
  const today = new Date();
  const formatDate = (daysFromToday: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + daysFromToday);
    return date.toISOString().split('T')[0];
  };

  return {
    address: "San Francisco, CA, United States",
    currentConditions: {
      temp: 18,
      feelslike: 16,
      humidity: 72,
      windspeed: 15,
      visibility: 10,
      uvindex: 5,
      conditions: "Partly Cloudy",
      icon: "partly-cloudy-day",
      aq: 45
    },
    days: [
      {
        datetime: formatDate(0),
        temp: 18,
        tempmax: 22,
        tempmin: 14,
        conditions: "Partly Cloudy",
        icon: "partly-cloudy-day"
      },
      {
        datetime: formatDate(1),
        temp: 20,
        tempmax: 24,
        tempmin: 16,
        conditions: "Sunny",
        icon: "clear-day"
      },
      {
        datetime: formatDate(2),
        temp: 19,
        tempmax: 23,
        tempmin: 15,
        conditions: "Cloudy",
        icon: "cloudy"
      },
      {
        datetime: formatDate(3),
        temp: 17,
        tempmax: 21,
        tempmin: 13,
        conditions: "Rain",
        icon: "rain"
      },
      {
        datetime: formatDate(4),
        temp: 16,
        tempmax: 20,
        tempmin: 12,
        conditions: "Partly Cloudy",
        icon: "partly-cloudy-day"
      }
    ]
  };
}

export const MOCK_WEATHER_DATA = generateMockWeatherData();
