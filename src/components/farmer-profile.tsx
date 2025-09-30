import { MapPin, User, Sprout, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from './language-context';

export function FarmerProfile() {
  const { t, language } = useLanguage();
  const farmer = {
    name: t('farmerName'),
    location: t('location'),
    farmName: t('farmName'),
    landSize: t('acres12'),
    crops: [t('rice'), t('pepper'), t('cardamom'), t('coconut')],
    soilType: t('claysoil'),
    irrigationType: t('borewell'),
    experience: t('years15'),
    phone: '+91 98765 43210'
  };

  const cropColors = ['bg-green-100 text-green-800', 'bg-red-100 text-red-800', 'bg-yellow-100 text-yellow-800', 'bg-brown-100 text-brown-800'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {t('farmerProfile')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl">{farmer.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {farmer.location}
            </p>
            <p className="text-sm text-muted-foreground">{farmer.farmName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div>
              <span className="text-muted-foreground">{t('farmArea')}</span>
              <div>{farmer.landSize}</div>
            </div>
            <div>
              <span className="text-muted-foreground">{t('soilType')}</span>
              <div>{farmer.soilType}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-muted-foreground">{t('irrigation')}</span>
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                {farmer.irrigationType}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">{t('experience')}</span>
              <div>{farmer.experience}</div>
            </div>
          </div>
        </div>

        <div>
          <span className="text-muted-foreground text-sm">{t('cropsGrown')}</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {farmer.crops.map((crop, index) => (
              <Badge key={index} className={cropColors[index % cropColors.length]}>
                <Sprout className="h-3 w-3 mr-1" />
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t('phoneNumber')}</span>
            <span>{farmer.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}