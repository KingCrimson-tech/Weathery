import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';

interface AirQualityProps {
  aqi?: number;
}

export function AirQuality({ aqi }: AirQualityProps) {
  if (!aqi) return null;

  let variant: 'default' | 'secondary' | 'destructive' = 'default';
  let label = 'Good';
  let description = 'Air quality is satisfactory, and air pollution poses little or no risk.';

  if (aqi > 300) {
    variant = 'destructive';
    label = 'Hazardous';
    description = 'Health warning of emergency conditions. The entire population is more likely to be affected.';
  } else if (aqi > 200) {
    variant = 'destructive';
    label = 'Very Unhealthy';
    description = 'Health alert: everyone may experience more serious health effects.';
  } else if (aqi > 150) {
    variant = 'destructive';
    label = 'Unhealthy';
    description = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
  } else if (aqi > 100) {
    variant = 'secondary';
    label = 'Moderate';
    description = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people.';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl font-bold text-primary">{aqi}</div>
          <Badge variant={variant} className="text-lg px-4 py-1">
            {label}
          </Badge>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
