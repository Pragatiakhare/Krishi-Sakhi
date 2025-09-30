import {
  Calendar,
  TrendingUp,
  Bell,
  Sprout,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from './language-context';

export function KeralaDashboard() {
  const { t, language } = useLanguage();
  
  const todaysInsights = [
    {
      title: language === 'ml' ? "ഇന്നത്തെ കാർഷിക ഉപദേശം" : "Today's Farming Advice",
      content: language === 'ml'
        ? "മഴ കൂടുതൽ ആയതിനാൽ നെൽവയലിൽ വെള്ളം നിൽക്കരുത്. കുരുമുളകിൽ ഫംഗസ് രോഗത്തിന് സാധ്യത."
        : "Due to heavy rain, don't let water stand in paddy fields. Fungus disease possibility in pepper.",
      type: "advice",
      priority: "high",
    },
    {
      title: language === 'ml' ? "മാർക്കറ്റ് വില അപ്ഡേറ്റ്" : "Market Price Update",
      content: language === 'ml'
        ? "കുരുമുളക് - ₹580/കിലോ, നെല്ല് - ₹2,200/ക്വിന്റൽ, തേങ്ങ - ₹25/എണ്ണം"
        : "Pepper - ₹580/kg, Rice - ₹2,200/quintal, Coconut - ₹25/piece",
      type: "market",
      priority: "medium",
    },
    {
      title: language === 'ml' ? "പെസ്റ്റ് അലേർട്ട്" : "Pest Alert",
      content: language === 'ml'
        ? "കോട്ടയം ജില്ലയിൽ ബ്രൗൺ പ്ലാന്റ് ഹോപ്പർ കാണപ്പെടുന്നു. നെൽവയൽ പരിശോധിക്കുക."
        : "Brown plant hopper spotted in Kottayam district. Check paddy fields.",
      type: "alert",
      priority: "high",
    },
  ];

  const quickStats = [
    {
      title: t('todaysTasks'),
      value: "3",
      description: t('pendingActivities'),
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t('cropStatus'),
      value: "2/3",
      description: t('healthy'),
      icon: Sprout,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: t('thisMonthIncome'),
      value: "₹12,500",
      description: language === 'ml' ? "↑ 15% കൂടുതൽ" : "↑ 15% more",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: t('schemeAlerts'),
      value: "2",
      description: t('notifications'),
      icon: Bell,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-400 bg-red-50";
      case "medium":
        return "border-l-4 border-yellow-400 bg-yellow-50";
      case "low":
        return "border-l-4 border-green-400 bg-green-50";
      default:
        return "border-l-4 border-gray-400 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Kerala Farm Image */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-48 overflow-hidden rounded-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1587878897514-41d36af009f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBwYWRkeSUyMHJpY2UlMjBmaWVsZCUyMGNvY29udXR8ZW58MXx8fHwxNzU3OTUxNjYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kerala rice fields and coconut trees"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl mb-2">{t('appTitle')}</h2>
                <p className="text-lg">
                  {t('digitalFarmingAssistant')}
                </p>
                <p className="text-sm mt-2">
                  {t('speciallyDesigned')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${stat.bgColor}`}
                >
                  <stat.icon
                    className={`h-5 w-5 ${stat.color}`}
                  />
                </div>
                <div>
                  <p className="text-lg">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Insights */}
      <Card>
        <CardHeader>
          <CardTitle>{t('todaysKeyInfo')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${getPriorityColor(insight.priority)}`}
              >
                <h4 className="text-sm mb-2">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-700">
                  {insight.content}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Kerala Context */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-xs">{t('todaysWork')}</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <Sprout className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-xs">{t('logCropActivity')}</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-xs">{t('marketPrice')}</p>
            </div>
            <div className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
              <Bell className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-xs">{t('schemeUpdate')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}