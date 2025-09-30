import { Plus, Calendar, MapPin, FileText, Bell, Settings, Calculator, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function QuickActions() {
  const actions = [
    {
      title: 'Add New Task',
      description: 'Schedule farm activities',
      icon: Plus,
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
    },
    {
      title: 'Field Inspection',
      description: 'Log field conditions',
      icon: MapPin,
      color: 'bg-green-100 text-green-600 hover:bg-green-200'
    },
    {
      title: 'Record Expenses',
      description: 'Track farm costs',
      icon: Calculator,
      color: 'bg-purple-100 text-purple-600 hover:bg-purple-200'
    },
    {
      title: 'Take Photo Log',
      description: 'Document conditions',
      icon: Camera,
      color: 'bg-orange-100 text-orange-600 hover:bg-orange-200'
    },
    {
      title: 'View Calendar',
      description: 'Check schedule',
      icon: Calendar,
      color: 'bg-red-100 text-red-600 hover:bg-red-200'
    },
    {
      title: 'Farm Notes',
      description: 'Add observations',
      icon: FileText,
      color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
    },
    {
      title: 'Set Reminder',
      description: 'Schedule alerts',
      icon: Bell,
      color: 'bg-pink-100 text-pink-600 hover:bg-pink-200'
    },
    {
      title: 'Settings',
      description: 'App preferences',
      icon: Settings,
      color: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-auto p-4 flex-col gap-2 ${action.color}`}
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="text-xs">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}