import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { useLanguage } from './language-context';

export function KeralaWeather() {
  const { t, language } = useLanguage();
  
  // Mock weather data for Kerala context
  const currentWeather = {
    location: language === 'ml' ? 'കോട്ടയം ജില്ല' : 'Kottayam District',
    temperature: 28,
    condition: t('monsoon'),
    humidity: 82,
    windSpeed: 12,
    precipitation: 75,
    uvIndex: 3,
    forecast: [
      { day: t('today'), high: 30, low: 24, condition: 'rainy', rain: 80 },
      { day: t('tomorrow'), high: 29, low: 23, condition: 'cloudy', rain: 60 },
      { day: t('dayAfter'), high: 31, low: 25, condition: 'sunny', rain: 20 },
      { day: t('thursday'), high: 28, low: 22, condition: 'rainy', rain: 85 },
    ]
  };

  const alerts = [
    {
      type: 'warning',
      message: language === 'ml' 
        ? 'കനത്ത മഴയ്ക്ക് സാധ്യത - നെൽവയലിൽ വെള്ളം കെട്ടാതെ നോക്കുക'
        : 'Heavy rain expected - ensure no waterlogging in paddy fields',
      priority: 'high'
    },
    {
      type: 'info', 
      message: language === 'ml'
        ? 'കുരുമുളകിൽ കീടബാധയുടെ സാധ്യത - പ്രിവന്റീവ് സ്പ്രേ ചെയ്യുക'
        : 'Pest attack possibility in pepper - do preventive spray',
      priority: 'medium'
    }
  ];

  const farmingTips = language === 'ml' ? [
    '• മഴ കൂടുതൽ ആയതിനാൽ നെൽവയലിൽ വെള്ളം കെട്ടി നിൽക്കരുത്',
    '• കുരുമുളകിൽ ഫംഗസ് രോഗത്തിന് സാധ്യത - ബോർഡോ മിക്സ്ചർ തളിക്കുക',
    '• തേങ്ങയിൽ വെള്ളം കയറാതെ നോക്കുക'
  ] : [
    '• Due to heavy rain, don\'t let water stagnate in paddy fields',
    '• Fungus disease possibility in pepper - spray Bordeaux mixture',
    '• Ensure no waterlogging around coconut trees'
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-500" />;
      default: return <CloudRain className="h-6 w-6 text-blue-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    return type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Cloud className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            {t('weatherReport')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="text-center">
              <div className="text-3xl mb-1">{currentWeather.temperature}°C</div>
              <div className="text-muted-foreground mb-1">{currentWeather.condition}</div>
              <div className="text-sm text-muted-foreground">{currentWeather.location}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <div>{t('humidity')} {currentWeather.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <div>
                  <div>{t('wind')} {currentWeather.windSpeed} km/h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4 text-blue-500" />
                <div>
                  <div>{t('rain')} {currentWeather.precipitation}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <div>
                  <div>UV: {currentWeather.uvIndex}/10</div>
                </div>
              </div>
            </div>

            {/* 4-Day Forecast */}
            <div className="space-y-2">
              <h4 className="text-sm">{t('forecast4days')}</h4>
              <div className="space-y-2">
                {currentWeather.forecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <span className="text-sm w-16">{day.day}</span>
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(day.condition)}
                      <span className="text-sm w-20">{day.high}°/{day.low}°</span>
                      <Badge variant="secondary" className="text-xs">
                        {day.rain}% {language === 'ml' ? 'മഴ' : 'rain'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <Alert key={index} className={alert.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}>
            {getAlertIcon(alert.type)}
            <AlertDescription className="text-sm">
              {alert.message}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Farming Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('farmingAdviceToday')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {farmingTips.map((tip, index) => (
              <p key={index}>{tip}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}