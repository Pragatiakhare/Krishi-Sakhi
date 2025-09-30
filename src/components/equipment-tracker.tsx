import { Truck, Wrench, Fuel, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function EquipmentTracker() {
  const equipment = [
    {
      id: 1,
      name: 'John Deere 6150R',
      type: 'Tractor',
      status: 'operational',
      fuelLevel: 85,
      hoursUsed: 1240,
      lastMaintenance: '2024-08-15',
      nextMaintenance: '2024-10-15',
      location: 'Main Barn'
    },
    {
      id: 2,
      name: 'Case IH Combine',
      type: 'Harvester',
      status: 'maintenance',
      fuelLevel: 45,
      hoursUsed: 890,
      lastMaintenance: '2024-07-20',
      nextMaintenance: '2024-09-20',
      location: 'Service Bay'
    },
    {
      id: 3,
      name: 'New Holland Planter',
      type: 'Planter',
      status: 'operational',
      fuelLevel: 70,
      hoursUsed: 320,
      lastMaintenance: '2024-09-01',
      nextMaintenance: '2024-11-01',
      location: 'Equipment Shed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Truck className="h-4 w-4 text-green-600" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-red-600" />;
      case 'idle': return <Calendar className="h-4 w-4 text-gray-600" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getFuelColor = (level: number) => {
    if (level > 50) return 'bg-green-500';
    if (level > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isMaintenanceDue = (nextMaintenance: string) => {
    const daysUntil = Math.ceil((new Date(nextMaintenance).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Equipment Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {equipment.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.type} • {item.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isMaintenanceDue(item.nextMaintenance) && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                  <Badge className={getStatusColor(item.status)}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1 capitalize">{item.status}</span>
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      Fuel Level
                    </span>
                    <span>{item.fuelLevel}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full rounded-full ${getFuelColor(item.fuelLevel)}`}
                      style={{ width: `${item.fuelLevel}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Operating Hours:</span>
                  <div>{item.hoursUsed.toLocaleString()} hrs</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Service:</span>
                  <div>{new Date(item.lastMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Service:</span>
                  <div className={isMaintenanceDue(item.nextMaintenance) ? 'text-orange-600' : ''}>
                    {new Date(item.nextMaintenance).toLocaleDateString()}
                    {isMaintenanceDue(item.nextMaintenance) && ' (Due Soon)'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}