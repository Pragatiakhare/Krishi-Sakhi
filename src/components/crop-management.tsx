import { Wheat, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function CropManagement() {
  const crops = [
    {
      id: 1,
      name: 'Corn Field A',
      type: 'Corn',
      planted: '2024-04-15',
      expectedHarvest: '2024-09-20',
      progress: 75,
      status: 'healthy',
      area: '25 acres',
      notes: 'Good growth, monitor for pests'
    },
    {
      id: 2,
      name: 'Soybean South',
      type: 'Soybeans',
      planted: '2024-05-01',
      expectedHarvest: '2024-10-10',
      progress: 60,
      status: 'attention',
      area: '18 acres',
      notes: 'Irrigation needed'
    },
    {
      id: 3,
      name: 'Wheat North',
      type: 'Wheat',
      planted: '2024-03-20',
      expectedHarvest: '2024-08-15',
      progress: 90,
      status: 'ready',
      area: '22 acres',
      notes: 'Ready for harvest soon'
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wheat className="h-5 w-5" />
          Crop Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg">{crop.name}</h4>
                  <p className="text-sm text-muted-foreground">{crop.type} • {crop.area}</p>
                </div>
                <Badge className={getStatusColor(crop.status)}>
                  {getStatusIcon(crop.status)}
                  <span className="ml-1 capitalize">{crop.status}</span>
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Growth Progress</span>
                  <span>{crop.progress}%</span>
                </div>
                <Progress value={crop.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Planted:</span>
                  <div>{new Date(crop.planted).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Expected Harvest:</span>
                  <div>{new Date(crop.expectedHarvest).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="text-sm">
                <span className="text-muted-foreground">Notes:</span>
                <p className="mt-1">{crop.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}