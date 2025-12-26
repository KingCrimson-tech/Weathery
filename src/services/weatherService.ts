import { WeatherData } from '@/types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

if (!API_KEY) {
  console.error('Weather API key is not configured. Please set VITE_WEATHER_API_KEY in your .env file.');
}

// Note: This API key is used on the client-side for demo purposes.
// In a production environment, consider implementing a backend proxy
// to keep your API keys secure and avoid exposing them in the client bundle.

export const weatherService = {
  async getWeatherByCity(city: string): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('Weather API key is not configured. Please check your .env file.');
    }

    const response = await fetch(
      `${BASE_URL}/${city}?unitGroup=metric&key=${API_KEY}&include=current,days,hours`
    );

    if (!response.ok) {
      throw new Error('City not found. Please check the spelling and try again.');
    }

    return response.json();
  },

  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
    if (!API_KEY) {
      throw new Error('Weather API key is not configured. Please check your .env file.');
    }

    const response = await fetch(
      `${BASE_URL}/${latitude},${longitude}?unitGroup=metric&key=${API_KEY}&include=current,days,hours`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch weather data for your location');
    }

    return response.json();
  },

  async getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000,
        enableHighAccuracy: true,
      });
    });
  },

  convertTemp(temp: number, toCelsius: boolean): number {
    if (toCelsius) {
      return ((temp - 32) * 5) / 9;
    }
    return (temp * 9) / 5 + 32;
  },
};
