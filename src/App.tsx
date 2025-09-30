import { useState } from 'react';
import { AiChat } from './components/ai-chat';
import { KeralaWeather } from './components/kerala-weather';
import { KeralaCrops } from './components/kerala-crops';
import { ActivityLogger } from './components/activity-logger';
import { SchemeAlerts } from './components/scheme-alerts';
import { LanguageProvider, useLanguage } from './components/language-context';
import { LanguageToggle } from './components/language-toggle';
import { HomePage } from './components/home-page';
import { ProfilePage } from './components/profile-page';
import { NotificationOverlay } from './components/notification-overlay';
import { Bot, Sprout, MessageCircle, CloudSun, FileText, Bell, Home, User, Menu, HelpCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Badge } from './components/ui/badge';

function AppContent() {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const menuItems = [
    { id: 'home', label: t('dashboard'), icon: Home },
    { id: 'chat', label: t('chat'), icon: MessageCircle },
    { id: 'crops', label: t('crops'), icon: Sprout },
    { id: 'weather', label: t('weather'), icon: CloudSun },
    { id: 'activities', label: t('activities'), icon: FileText },
    { id: 'schemes', label: t('schemes'), icon: Bell },
    { id: 'help', label: language === 'ml' ? 'സഹായം' : 'Help', icon: HelpCircle },
  ];

  const Sidebar = () => (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Use this menu to navigate between different sections of Krishi Sakhi
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-green-200 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-200 rounded-xl">
                <Sprout className="h-8 w-8 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-800">{t('appTitle')}</h2>
                <p className="text-base text-green-600">{t('welcome')}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-6">
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-4 py-3 text-left ${
                    currentPage === item.id 
                      ? "bg-green-100 text-green-800 border border-green-200" 
                      : "hover:bg-green-50 text-green-700"
                  }`}
                  onClick={() => navigateToPage(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-lg font-medium">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Profile Section at Bottom */}
          <div className="p-6 border-t border-green-200 bg-green-50">
            <Button
              variant="ghost"
              className="w-full justify-start gap-4 py-3 hover:bg-green-100"
              onClick={() => navigateToPage('profile')}
            >
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-700" />
              </div>
              <div className="text-left">
                <p className="text-base font-medium text-green-800">{t('location')}</p>
                <p className="text-sm text-green-600">{t('farmName')}</p>
              </div>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateToPage} />;
      case 'chat':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl">{t('aiAssistant')}</h2>
                <p className="text-muted-foreground">{t('personalAdvisor')}</p>
              </div>
            </div>
            <AiChat />
          </div>
        );
      case 'crops':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl">{t('cropManagement')}</h2>
                <p className="text-muted-foreground">{t('cropManagementDesc')}</p>
              </div>
            </div>
            <KeralaCrops />
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CloudSun className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl">{t('weatherInfo')}</h2>
                <p className="text-muted-foreground">{t('weatherDescription')}</p>
              </div>
            </div>
            <KeralaWeather />
          </div>
        );
      case 'activities':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl">{t('activityLog')}</h2>
                <p className="text-muted-foreground">{t('activityLogDesc')}</p>
              </div>
            </div>
            <ActivityLogger />
          </div>
        );
      case 'schemes':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl">{t('govSchemes')}</h2>
                <p className="text-muted-foreground">{t('govSchemesDesc')}</p>
              </div>
            </div>
            <SchemeAlerts />
          </div>
        );
      case 'help':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <HelpCircle className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl">{t('helpSupport')}</h2>
                <p className="text-muted-foreground">{t('helpDescription')}</p>
              </div>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg mb-4">{t('faq')}</h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="text-base">{t('howAddCrops')}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{t('howAddCropsAnswer')}</p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="text-base">{t('weatherAccuracy')}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{t('weatherAccuracyAnswer')}</p>
                </div>
                <div>
                  <h4 className="text-base">{t('offlineUsage')}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{t('offlineUsageAnswer')}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return <ProfilePage onBack={() => navigateToPage('home')} />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Hamburger Menu + Welcome */}
            <div className="flex items-center gap-4">
              <Sidebar />
              <div className="text-green-800">
                <div className="text-base font-semibold">{t('welcomeFarmer')}</div>
                <div className="text-sm font-medium text-green-700">{t('farmerName')}</div>
              </div>
            </div>

            {/* Center: App Title (optional) */}
            <div className="flex-1 text-center md:text-left md:ml-6">
              <h1 className="text-xl font-semibold text-green-800 hidden md:block">{t('appTitle')}</h1>
            </div>

            {/* Right: Language Toggle & Notifications */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsNotificationOpen(true)}
                  className="hover:bg-green-200 text-green-700"
                >
                  <Bell className="h-6 w-6" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-orange-500 text-white">
                    3
                  </Badge>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderPageContent()}
      </main>

      {/* Notification Overlay */}
      <NotificationOverlay 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Footer */}
      {currentPage === 'home' && (
        <footer className="border-t bg-card mt-8">
          <div className="container mx-auto px-4 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t('aiPoweredAssistant')}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('availableInBothLanguages')}
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}