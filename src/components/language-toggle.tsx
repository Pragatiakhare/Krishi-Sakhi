import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './language-context';
import { useRef } from 'react';
import { useScrollLock } from './use-scroll-lock';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { preserveScrollPosition } = useScrollLock();

  const toggleLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store the button reference to blur focus
    const button = buttonRef.current;
    
    // Use the scroll preservation utility
    preserveScrollPosition(() => {
      setLanguage(language === 'ml' ? 'en' : 'ml');
    });
    
    // Blur the button to prevent focus-induced scrolling
    if (button) {
      button.blur();
    }
  };

  return (
    <Button
      ref={buttonRef}
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
      onFocus={(e) => {
        e.preventDefault();
        e.currentTarget.blur();
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm">
        {language === 'ml' ? 'English' : 'മലയാളം'}
      </span>
    </Button>
  );
}