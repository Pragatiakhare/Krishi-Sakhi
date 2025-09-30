import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from './language-context';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationOverlay({ isOpen, onClose }: NotificationOverlayProps) {
  const { t } = useLanguage();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'warning',
      title: t('weatherAlert'),
      message: t('weatherAlertMsg'),
      time: `2 ${t('hoursAgo')}`,
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: t('fertilizerReminder'),
      message: t('fertilizerReminderMsg'),
      time: `1 ${t('dayAgo')}`,
      read: false
    },
    {
      id: '3',
      type: 'success',
      title: t('newGovScheme'),
      message: t('newGovSchemeMsg'),
      time: `3 ${t('daysAgo')}`,
      read: true
    },
    {
      id: '4',
      type: 'info',
      title: t('cropCalendarUpdate'),
      message: t('cropCalendarUpdateMsg'),
      time: `1 ${t('weekAgo')}`,
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-background w-full max-w-md h-full overflow-y-auto border-l">
        <div className="p-4 border-b bg-green-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-green-800">{t('notifications')}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-green-100">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.read ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(notification.type)}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    {!notification.read && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">{t('new')}</Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">{notification.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="p-4 border-t bg-green-50">
          <Button variant="outline" className="w-full text-green-800 border-green-300 hover:bg-green-100">
            {t('markAllRead')}
          </Button>
        </div>
      </div>
    </div>
  );
}