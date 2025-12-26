import { useState } from 'react';
import { WeatherData } from '@/types/weather';
import { weatherService } from '@/services/weatherService';
import { MOCK_WEATHER_DATA } from '@/data/mockWeatherData';
import { SearchBar } from '@/components/SearchBar';
import { WeatherCard } from '@/components/WeatherCard';
import { Forecast } from '@/components/Forecast';
import { AirQuality } from '@/components/AirQuality';
import { WeatherSkeleton } from '@/components/WeatherSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CloudSun, Thermometer, Github, Sparkles } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [locationStatus, setLocationStatus] = useState<string>('');

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setLocationStatus('');

    try {
      const data = await weatherService.getWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseLocation = async () => {
    setIsLoading(true);
    setError(null);
    setLocationStatus('Getting your location...');

    try {
      const position = await weatherService.getCurrentLocation();
      setLocationStatus('Location found! Loading weather...');
      
      const data = await weatherService.getWeatherByCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
      setWeatherData(data);
      setLocationStatus('Weather loaded successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      setLocationStatus('Location access failed');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowDemo = () => {
    setError(null);
    setLocationStatus('');
    setWeatherData(MOCK_WEATHER_DATA);
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="w-12 h-12 text-primary animate-float" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weathery
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your intelligent weather companion
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            isLoading={isLoading}
            locationStatus={locationStatus}
          />
        </div>

        {/* Temperature Toggle */}
        {weatherData && (
          <div className="flex justify-center mb-6">
            <Button
              variant="outline"
              onClick={toggleUnit}
              className="gap-2"
            >
              <Thermometer className="w-4 h-4" />
              Switch to {isCelsius ? '°F' : '°C'}
            </Button>
          </div>
        )}

        {/* Content */}
        <div className="space-y-6">
          {isLoading && <WeatherSkeleton />}

          {error && (
            <Card className="border-destructive">
              <CardContent className="p-8 text-center">
                <div className="text-destructive text-lg font-semibold mb-2">
                  {error}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Try checking your internet connection or searching for a different city.
                </p>
                <Button onClick={handleShowDemo} variant="outline" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  View Demo
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && !weatherData && (
            <Card className="border-2 border-dashed">
              <CardContent className="p-12 text-center">
                <CloudSun className="w-24 h-24 mx-auto mb-6 text-primary opacity-50 animate-float" />
                <h3 className="text-2xl font-semibold mb-3">Welcome to Weathery!</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Get real-time weather information, forecasts, and air quality data for any location worldwide.
                </p>
                <Button onClick={handleShowDemo} className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  View Demo with Sample Data
                </Button>
              </CardContent>
            </Card>
          )}

          {weatherData && !isLoading && (
            <>
              <WeatherCard
                address={weatherData.address}
                conditions={weatherData.currentConditions}
                isCelsius={isCelsius}
                convertTemp={weatherService.convertTemp}
              />

              {weatherData.currentConditions.aq && (
                <AirQuality aqi={weatherData.currentConditions.aq} />
              )}

              <Forecast
                forecast={weatherData.days}
                isCelsius={isCelsius}
                convertTemp={weatherService.convertTemp}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <a
            href="https://github.com/KingCrimson-tech/Weathery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
