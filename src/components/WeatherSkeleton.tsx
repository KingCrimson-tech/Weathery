import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function WeatherSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="flex items-center justify-center gap-8 mb-8">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div>
              <Skeleton className="h-20 w-40 mb-4" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
