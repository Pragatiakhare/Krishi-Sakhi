import { Calendar, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function TaskScheduler() {
  const tasks = [
    {
      id: 1,
      title: 'Irrigate Soybean Field',
      description: 'Check and run irrigation system for 4 hours',
      dueDate: '2024-09-15',
      priority: 'high',
      status: 'pending',
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      title: 'Fertilize Corn Field A',
      description: 'Apply nitrogen fertilizer before rain',
      dueDate: '2024-09-16',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '3 hours'
    },
    {
      id: 3,
      title: 'Equipment Maintenance',
      description: 'Service tractor and check hydraulics',
      dueDate: '2024-09-17',
      priority: 'medium',
      status: 'pending',
      estimatedTime: '4 hours'
    },
    {
      id: 4,
      title: 'Soil Testing - West Field',
      description: 'Collect soil samples for pH and nutrient analysis',
      dueDate: '2024-09-14',
      priority: 'low',
      status: 'completed',
      estimatedTime: '1 hour'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && tasks.find(t => t.dueDate === dueDate)?.status !== 'completed';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Task Scheduler
          </CardTitle>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`border rounded-lg p-3 space-y-2 ${
                isOverdue(task.dueDate) ? 'border-red-200 bg-red-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(task.status)}
                    <h4 className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                      {task.title}
                    </h4>
                    {isOverdue(task.dueDate) && (
                      <Badge variant="destructive" className="text-xs">Overdue</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </div>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span>Est. {task.estimatedTime}</span>
                </div>
                {task.status === 'pending' && (
                  <Button size="sm" variant="outline">
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}