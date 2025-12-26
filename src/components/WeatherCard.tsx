import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrentConditions } from '@/types/weather';
import { 
  Cloud, 
  Thermometer, 
  Droplet, 
  Wind, 
  Eye, 
  Sun 
} from 'lucide-react';

interface WeatherCardProps {
  address: string;
  conditions: CurrentConditions;
  isCelsius: boolean;
  convertTemp: (temp: number, toCelsius: boolean) => number;
}

export function WeatherCard({ address, conditions, isCelsius, convertTemp }: WeatherCardProps) {
  const temp = isCelsius ? conditions.temp : convertTemp(conditions.temp, false);
  const feelsLike = isCelsius ? conditions.feelslike : convertTemp(conditions.feelslike, false);
  const unit = isCelsius ? '°C' : '°F';

  return (
    <Card className="weather-gradient text-white border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl">
          <Cloud className="w-8 h-8" />
          {address}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 mb-8">
          <img
            src={`https://weather.visualcrossing.com/img/weather-icons/${conditions.icon}.svg`}
            alt={conditions.conditions}
            className="w-32 h-32 animate-float"
          />
          <div>
            <div className="text-7xl font-bold">{Math.round(temp)}{unit}</div>
            <div className="text-xl opacity-90 mt-2">{conditions.conditions}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WeatherDetail
            icon={<Thermometer className="w-5 h-5" />}
            label="Feels like"
            value={`${Math.round(feelsLike)}${unit}`}
          />
          <WeatherDetail
            icon={<Droplet className="w-5 h-5" />}
            label="Humidity"
            value={`${conditions.humidity}%`}
          />
          <WeatherDetail
            icon={<Wind className="w-5 h-5" />}
            label="Wind"
            value={`${Math.round(conditions.windspeed)} km/h`}
          />
          <WeatherDetail
            icon={<Eye className="w-5 h-5" />}
            label="Visibility"
            value={`${Math.round(conditions.visibility)} km`}
          />
          <WeatherDetail
            icon={<Sun className="w-5 h-5" />}
            label="UV Index"
            value={conditions.uvindex.toString()}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
      <div className="opacity-90">{icon}</div>
      <div>
        <div className="text-sm opacity-75">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}
