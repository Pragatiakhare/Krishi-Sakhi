import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { FarmerProfile } from './farmer-profile';
import { useLanguage } from './language-context';

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl">{t('farmerProfileTitle')}</h1>
          <p className="text-muted-foreground">{t('farmerProfileDesc')}</p>
        </div>
      </div>

      {/* Profile Content */}
      <FarmerProfile />
    </div>
  );
}