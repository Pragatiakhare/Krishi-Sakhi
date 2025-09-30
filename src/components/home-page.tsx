import { Button } from './ui/button';
import { MessageCircle, Sprout, Bot } from 'lucide-react';
import { useLanguage } from './language-context';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 text-white p-8 rounded-xl text-center shadow-lg">
        <h1 className="text-3xl mb-3 font-semibold">{t('appTitle')}</h1>
        <h2 className="text-xl mb-3 font-medium">{t('digitalFarmingAssistant')}</h2>
        <p className="text-base opacity-95 leading-relaxed">{t('speciallyDesigned')}</p>
      </div>

      {/* Primary Action */}
      <div className="text-center">
        <Button 
          onClick={() => onNavigate('chat')}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full max-w-sm mx-auto h-auto min-h-[64px] flex items-center justify-center gap-3"
        >
          <MessageCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-lg font-medium leading-snug">
            {t('chatWithSakhi')}
          </span>
        </Button>
      </div>

      {/* Important Info for Today */}
      <div className="bg-card border border-green-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl mb-6 text-center text-green-800 font-semibold">{t('importantInfoToday')}</h3>
        <div className="space-y-6">
          {/* Today's Farming Advice */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sprout className="h-6 w-6 text-green-700" />
              </div>
              <h4 className="text-xl text-green-800 font-semibold">{t('todaysFarmingAdvice')}</h4>
            </div>
            <p className="text-base text-green-700 leading-relaxed">
              {t('farmingAdviceContent')}
            </p>
          </div>

          {/* Market Prices Update */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot className="h-6 w-6 text-blue-700" />
              </div>
              <h4 className="text-xl text-blue-800 font-semibold">{t('marketPricesUpdate')}</h4>
            </div>
            <p className="text-base text-blue-700 leading-relaxed">
              {t('marketPricesContent')}
            </p>
          </div>

          {/* Pest Alerts */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-orange-700" />
              </div>
              <h4 className="text-xl text-orange-800 font-semibold">{t('pestAlerts')}</h4>
            </div>
            <p className="text-base text-orange-700 leading-relaxed">
              {t('pestAlertsContent')}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}