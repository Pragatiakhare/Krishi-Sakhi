import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function WeatherWidget() {
  // Mock weather data - in real app would fetch from weather API
  const currentWeather = {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    precipitation: 10,
    forecast: [
      { day: 'Today', high: 75, low: 62, condition: 'sunny' },
      { day: 'Tomorrow', high: 78, low: 65, condition: 'cloudy' },
      { day: 'Wed', high: 71, low: 58, condition: 'rainy' },
      { day: 'Thu', high: 74, low: 60, condition: 'sunny' },
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Weather */}
          <div className="text-center">
            <div className="text-3xl mb-2">{currentWeather.temperature}°F</div>
            <div className="text-muted-foreground mb-4">{currentWeather.condition}</div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>{currentWeather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-gray-500" />
                <span>{currentWeather.windSpeed} mph</span>
              </div>
              <div className="flex items-center gap-1">
                <CloudRain className="h-4 w-4 text-blue-500" />
                <span>{currentWeather.precipitation}%</span>
              </div>
            </div>
          </div>

          {/* 4-Day Forecast */}
          <div className="space-y-2">
            <h4 className="text-sm text-muted-foreground">4-Day Forecast</h4>
            <div className="space-y-2">
              {currentWeather.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{day.day}</span>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(day.condition)}
                    <span className="text-sm">{day.high}°/{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}