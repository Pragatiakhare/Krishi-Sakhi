import { Sprout, Calendar, TrendingUp, AlertTriangle, Camera, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useLanguage } from './language-context';

export function KeralaCrops() {
  const { t, language } = useLanguage();
  
  const crops = [
    {
      id: 1,
      name: language === 'ml' ? 'പടിഞ്ഞാറൻ നെൽവയൽ' : 'Western Paddy Field',
      type: language === 'ml' ? 'നെല്ല് - ജ്യോതി' : 'Rice - Jyothi variety',
      planted: '2024-06-15',
      expectedHarvest: '2024-10-15',
      progress: 65,
      status: 'healthy',
      area: language === 'ml' ? '0.8 ഏക്കർ' : '0.8 acres',
      stage: language === 'ml' ? 'പുഷ്പിക്കുന്ന ഘട്ടം' : 'Flowering stage',
      notes: language === 'ml' ? 'നല്ല വളർച്ച. ബ്രൗൺ പ്ലാന്റ് ഹോപ്പർ ശ്രദ്ധിക്കുക' : 'Good growth. Watch for brown plant hopper',
      lastActivity: language === 'ml' ? 'വള നൽകി - 3 ദിവസം മുമ്പ്' : 'Fertilizer applied - 3 days ago',
      nextActivity: language === 'ml' ? 'കീടനാശിനി തളിക്കുക - 2 ദിവസം കൂടി' : 'Spray pesticide - in 2 days'
    },
    {
      id: 2,  
      name: language === 'ml' ? 'കിഴക്കൻ കുരുമുളക് തോട്ടം' : 'Eastern Pepper Garden',
      type: language === 'ml' ? 'കുരുമുളക് - കരിമുണ്ട' : 'Pepper - Karimunda variety',
      planted: '2023-03-20',
      expectedHarvest: '2024-12-01',
      progress: 80,
      status: 'attention',
      area: language === 'ml' ? '0.3 ഏക്കർ' : '0.3 acres',
      stage: language === 'ml' ? 'കായ്ക്കുന്ന ഘട്ടം' : 'Fruiting stage',
      notes: language === 'ml' ? 'ഫംഗസ് രോഗത്തിന് സാധ്യത. ബോർഡോ മിക്സ്ചർ വേണം' : 'Fungus disease possibility. Need Bordeaux mixture',
      lastActivity: language === 'ml' ? 'വളം ചേർത്തു - 1 ആഴ്ച മുമ്പ്' : 'Added fertilizer - 1 week ago',
      nextActivity: language === 'ml' ? 'ഫംഗിസൈഡ് സ്പ്രേ - നാളെ' : 'Fungicide spray - tomorrow'
    },
    {
      id: 3,
      name: language === 'ml' ? 'വാഴത്തോട്ടം' : 'Banana Plantation',
      type: language === 'ml' ? 'വാഴ - റോബസ്റ്റ' : 'Banana - Robusta variety',
      planted: '2024-02-10',
      expectedHarvest: '2024-11-10',
      progress: 70,
      status: 'ready',
      area: language === 'ml' ? '0.2 ഏക്കർ' : '0.2 acres',
      stage: language === 'ml' ? 'കായ് വികസിക്കുന്ന ഘട്ടം' : 'Fruit development stage',
      notes: language === 'ml' ? 'നല്ല വളർച്ച. ചുറ്റും തുണ്ട് നീക്കം ചെയ്യുക' : 'Good growth. Remove suckers around',
      lastActivity: language === 'ml' ? 'സക്കർ നീക്കം - 5 ദിവസം മുമ്പ്' : 'Sucker removal - 5 days ago',
      nextActivity: language === 'ml' ? 'വിളവെടുപ്പ് - 1 മാസം കൂടി' : 'Harvest - in 1 month'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'attention': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'ready': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return t('healthy');
      case 'attention': return t('needsAttention');
      case 'ready': return t('ready');
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5" />
            {t('cropManagement')}
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            {t('newCrop')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg">{crop.name}</h4>
                  <p className="text-sm text-muted-foreground">{crop.type} • {crop.area}</p>
                  <p className="text-xs text-muted-foreground mt-1">{crop.stage}</p>
                </div>
                <Badge className={getStatusColor(crop.status)}>
                  {getStatusIcon(crop.status)}
                  <span className="ml-1">{getStatusText(crop.status)}</span>
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('growthProgress')}</span>
                  <span>{crop.progress}%</span>
                </div>
                <Progress value={crop.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('plantingDate')}</span>
                  <div>{new Date(crop.planted).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('expectedHarvest')}</span>
                  <div>{new Date(crop.expectedHarvest).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">{t('lastActivity')}</span>
                  <div className="text-green-600">{crop.lastActivity}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('nextActivity')}</span>
                  <div className="text-blue-600">{crop.nextActivity}</div>
                </div>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">{t('notes')}</span>
                <p className="mt-1">{crop.notes}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <Camera className="h-4 w-4" />
                  {t('takePhoto')}
                </Button>
                <Button size="sm" variant="outline">
                  {t('logActivity')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Add New Crop */}
        <div className="mt-6 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
          <Sprout className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <h4 className="text-sm">{t('addNewCrop')}</h4>
          <p className="text-xs text-muted-foreground mb-3">{t('addNewCropDesc')}</p>
          <Button size="sm" className="flex items-center gap-1 mx-auto">
            <Plus className="h-4 w-4" />
            {t('add')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}