export interface CurrentConditions {
  temp: number;
  feelslike: number;
  humidity: number;
  windspeed: number;
  visibility: number;
  uvindex: number;
  conditions: string;
  icon: string;
  aq?: number;
}

export interface DayForecast {
  datetime: string;
  temp: number;
  tempmax: number;
  tempmin: number;
  conditions: string;
  icon: string;
}

export interface WeatherData {
  address: string;
  currentConditions: CurrentConditions;
  days: DayForecast[];
}
