import { WeatherData } from '@/types/weather';

const API_KEY = '68D4RCUNCEK9UKMXJ4DF6H56Z';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

export const weatherService = {
  async getWeatherByCity(city: string): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/${city}?unitGroup=metric&key=${API_KEY}&include=current,days,hours`
    );

    if (!response.ok) {
      throw new Error('City not found. Please check the spelling and try again.');
    }

    return response.json();
  },

  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
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
