import { useState } from 'react';
import { Plus, Calendar, Droplets, Sprout, Bug, Scissors, Camera, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useLanguage } from './language-context';

export function ActivityLogger() {
  const { t, language } = useLanguage();
  const [isLogging, setIsLogging] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [notes, setNotes] = useState('');

  const activityTypes = [
    { id: 'watering', label: t('watering'), icon: Droplets, color: 'bg-blue-100 text-blue-800' },
    { id: 'fertilizer', label: t('fertilizing'), icon: Sprout, color: 'bg-green-100 text-green-800' },
    { id: 'pesticide', label: t('pesticide'), icon: Bug, color: 'bg-red-100 text-red-800' },
    { id: 'pruning', label: t('pruning'), icon: Scissors, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'harvesting', label: t('harvesting'), icon: Calendar, color: 'bg-purple-100 text-purple-800' },
    { id: 'planting', label: t('planting'), icon: Sprout, color: 'bg-green-100 text-green-800' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: t('fertilizing'),
      crop: language === 'ml' ? 'നെല്ല് - പടിഞ്ഞാറൻ വയൽ' : 'Rice - Western field',
      date: '2024-09-12',
      notes: language === 'ml' ? 'NPK വളം നൽകി. അടുത്ത തവണ 15 ദിവസം കൂടി' : 'Applied NPK fertilizer. Next time in 15 days',
      icon: Sprout,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      type: t('pesticide'),
      crop: language === 'ml' ? 'കുരുമുളക് - കിഴക്കൻ തോട്ടം' : 'Pepper - Eastern garden',
      date: '2024-09-10',
      notes: language === 'ml' ? 'ഫംഗിസൈഡ് തളിച്ചു. ഫംഗസ് രോഗത്തിനെതിരെ' : 'Sprayed fungicide. Against fungus disease',
      icon: Bug,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 3,
      type: t('watering'),
      crop: language === 'ml' ? 'വാഴ - തെക്കേ തോട്ടം' : 'Banana - Southern garden',
      date: '2024-09-09',
      notes: language === 'ml' ? 'ഡ്രിപ് ഇറിഗേഷൻ ഉപയോഗിച്ചു' : 'Used drip irrigation',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  const handleSaveActivity = () => {
    // Here would save the activity to database
    console.log('Saving activity:', { selectedActivity, notes });
    setIsLogging(false);
    setSelectedActivity('');
    setNotes('');
  };

  const getPlaceholderText = () => {
    if (language === 'ml') {
      return 'എന്താണ് ചെയ്തത്? എത്ര അളവ്? എവിടെ?... (ഉദാ: നെൽവയലിൽ NPK വളം 2 കിലോ ചേർത്തു)';
    } else {
      return 'What was done? How much? Where?... (e.g., Added 2 kg NPK fertilizer to rice field)';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('activityLog')}
          </CardTitle>
          <Button 
            size="sm" 
            onClick={() => setIsLogging(!isLogging)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            {isLogging ? t('cancel') : t('newActivity')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Add Activity */}
          {isLogging && (
            <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
              <h4 className="text-sm">{t('logNewActivity')}</h4>
              
              <div className="grid grid-cols-3 gap-2">
                {activityTypes.map((activity) => (
                  <Button
                    key={activity.id}
                    variant={selectedActivity === activity.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedActivity(activity.id)}
                    className="h-auto p-3 flex-col gap-1"
                  >
                    <activity.icon className="h-4 w-4" />
                    <span className="text-xs">{activity.label}</span>
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm">{t('details')}</label>
                <Textarea
                  placeholder={getPlaceholderText()}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Mic className="h-4 w-4" />
                    {t('speak')}
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Camera className="h-4 w-4" />
                    {t('addPhoto')}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveActivity} disabled={!selectedActivity || !notes}>
                  {t('save')}
                </Button>
                <Button variant="outline" onClick={() => setIsLogging(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}

          {/* Recent Activities */}
          <div className="space-y-3">
            <h4 className="text-sm text-muted-foreground">{t('recentActivities')}</h4>
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{activity.type}</span>
                    <Badge variant="secondary" className="text-xs">
                      {new Date(activity.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{activity.crop}</p>
                  <p className="text-sm">{activity.notes}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg text-green-600">12</div>
              <div className="text-xs text-muted-foreground">{t('activitiesThisMonth')}</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg text-blue-600">3</div>
              <div className="text-xs text-muted-foreground">{t('cropsManaging')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}