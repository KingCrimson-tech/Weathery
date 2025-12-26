import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  isLoading: boolean;
  locationStatus?: string;
}

export function SearchBar({ onSearch, onUseLocation, isLoading, locationStatus }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for your city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 h-12 text-lg"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" size="lg" disabled={isLoading || !city.trim()}>
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onUseLocation}
          disabled={isLoading}
          className="flex-1"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use My Location
        </Button>
        {locationStatus && (
          <span className="text-sm text-muted-foreground">{locationStatus}</span>
        )}
      </div>
    </div>
  );
}
