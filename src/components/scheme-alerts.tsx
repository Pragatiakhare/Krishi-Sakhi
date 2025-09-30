import { Bell, ExternalLink, Calendar, DollarSign, FileText, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { useLanguage } from './language-context';

export function SchemeAlerts() {
  const { t, language } = useLanguage();
  
  const schemes = [
    {
      id: 1,
      name: t('pmKisan'),
      description: t('annualAssistance'),
      deadline: '2024-10-31',
      status: 'active',
      amount: '₹2,000',
      nextInstallment: language === 'ml' ? 'അക്ടോബർ 2024' : 'October 2024',
      category: 'financial',
      eligibility: language === 'ml' ? 'എല്ലാ ചെറുകിട-നിലധാരിക കർഷകർക്കും' : 'For all small and marginal farmers',
      documents: language === 'ml' 
        ? ['ആധാർ കാർഡ്', 'ബാങ്ക് അക്കൌണ്ട്', 'പട്ട ഡോക്യുമെന്റ്']
        : ['Aadhaar Card', 'Bank Account', 'Land Documents'],
      applicationUrl: 'https://pmkisan.gov.in'
    },
    {
      id: 2,
      name: t('keralaFarmerWelfare'),
      description: t('farmerPension'),
      deadline: '2024-09-30',
      status: 'urgent',
      amount: language === 'ml' ? '₹1,200/മാസം' : '₹1,200/month',
      nextInstallment: language === 'ml' ? 'സെപ്റ്റംബർ 2024' : 'September 2024',
      category: 'welfare',
      eligibility: language === 'ml' ? 'കേരളത്തിലെ രജിസ്റ്റർ ചെയ്ത കർഷകർക്ക്' : 'For registered farmers in Kerala',
      documents: language === 'ml'
        ? ['കർഷക രജിസ്ട്രേഷൻ', 'വയസ്സ് തെളിവ്', 'വരുമാന സർട്ടിഫിക്കറ്റ്']
        : ['Farmer Registration', 'Age Proof', 'Income Certificate'],
      applicationUrl: 'https://kerala.gov.in/farmer-welfare'
    },
    {
      id: 3,
      name: t('soilHealthCard'),
      description: t('freeSoilTesting'),
      deadline: '2024-11-15',
      status: 'new',
      amount: t('free'),
      nextInstallment: '-',
      category: 'technical',
      eligibility: language === 'ml' ? 'എല്ലാ കർഷകർക്കും' : 'For all farmers',
      documents: language === 'ml'
        ? ['പട്ട രേഖകൾ', 'കർഷക ഐഡി കാർഡ്']
        : ['Land Documents', 'Farmer ID Card'],
      applicationUrl: 'https://soilhealth.dac.gov.in'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('active');
      case 'urgent': return t('urgent');
      case 'new': return t('new');
      default: return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'welfare': return <Bell className="h-4 w-4" />;
      case 'technical': return <FileText className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getUrgentAlertText = () => {
    if (language === 'ml') {
      return 'ശ്രദ്ധിക്കുക: കർഷക ക്ഷേമ ബോർഡ് പദ്ധതിയുടെ അവസാന തീയതി സെപ്റ്റംബർ 30. ഉടൻ അപ്ലൈ ചെയ്യുക!';
    } else {
      return 'Attention: Last date for Farmer Welfare Board scheme is September 30. Apply immediately!';
    }
  };

  const getDaysRemainingText = (days: number) => {
    if (language === 'ml') {
      return `(${days} ദിവസം ബാക്കി)`;
    } else {
      return `(${days} days remaining)`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {t('govSchemesAlerts')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Urgent Alert */}
          <Alert className="border-orange-200 bg-orange-50">
            <Bell className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-sm">
              <strong>{getUrgentAlertText()}</strong>
            </AlertDescription>
          </Alert>

          {schemes.map((scheme) => {
            const daysLeft = getDaysUntilDeadline(scheme.deadline);
            return (
              <div key={scheme.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(scheme.category)}
                      <h4 className="text-base">{scheme.name}</h4>
                      <Badge className={getStatusColor(scheme.status)}>
                        {getStatusText(scheme.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                    <p className="text-sm">{scheme.eligibility}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t('beneficiaryAmount')}</span>
                    <div className="text-green-600">{scheme.amount}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('lastDate')}</span>
                    <div className={`${daysLeft <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                      {new Date(scheme.deadline).toLocaleDateString()}
                      {daysLeft > 0 && (
                        <span className="text-xs ml-1">
                          {getDaysRemainingText(daysLeft)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {scheme.nextInstallment !== '-' && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">{t('nextInstallment')}</span>
                    <span className="ml-1 text-blue-600">{scheme.nextInstallment}</span>
                  </div>
                )}

                <div className="text-sm">
                  <span className="text-muted-foreground">{t('requiredDocuments')}</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scheme.documents.map((doc, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    {t('apply')}
                  </Button>
                  <Button size="sm" variant="outline">
                    {t('moreDetails')}
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg text-green-600">2</div>
              <div className="text-xs text-muted-foreground">{t('activeSchemes')}</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg text-blue-600">₹8,000</div>
              <div className="text-xs text-muted-foreground">{t('expectedIncome')}</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg text-orange-600">1</div>
              <div className="text-xs text-muted-foreground">{t('urgentApplication')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}