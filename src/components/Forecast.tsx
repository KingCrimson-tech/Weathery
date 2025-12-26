import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DayForecast } from '@/types/weather';
import { Calendar } from 'lucide-react';

interface ForecastProps {
  forecast: DayForecast[];
  isCelsius: boolean;
  convertTemp: (temp: number, toCelsius: boolean) => number;
}

export function Forecast({ forecast, isCelsius, convertTemp }: ForecastProps) {
  const unit = isCelsius ? '°C' : '°F';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {forecast.slice(1, 6).map((day) => {
            const date = new Date(day.datetime);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = isCelsius ? day.temp : convertTemp(day.temp, false);

            return (
              <div
                key={day.datetime}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="font-semibold text-lg mb-2">{dayName}</div>
                <img
                  src={`https://weather.visualcrossing.com/img/weather-icons/${day.icon}.svg`}
                  alt={day.conditions}
                  className="w-16 h-16 my-2"
                />
                <div className="text-2xl font-bold mb-1">
                  {Math.round(temp)}{unit}
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  {day.conditions}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
