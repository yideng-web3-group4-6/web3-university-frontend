import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Globe, ChevronDown } from 'lucide-react';
import { WalletConnectButton } from './WalletConnectButton';
import i18n, { translationValue } from '@locales/i18n';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface NavItemProps {
  children: React.ReactNode;
  path?: string;
}

const NavItem: React.FC<NavItemProps> = ({ children, path }) => {
  const location = useLocation();
  const effectivePath = path || '';
  const isActive = location.pathname === effectivePath;

  return (
    <Link
      to={effectivePath}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
        isActive ? 'active cursor-pointer' : 'cursor-pointer inactive'
      }`}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    Cookies.set('i18nLang', lang, { expires: 365 });
    setIsLangMenuOpen(false);
    window.location.reload();
  };

  return (
    <header className='nav-blur fixed w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <GraduationCap className='h-8 w-8 text-cyber-blue float-animation' />
            <span className='ml-2 text-cyber-blue font-bold text-lg'>
              {translationValue('siteTitle')}
            </span>
          </div>

          <div className='hidden md:block'>
            <div className='flex items-center transition-colors duration-200'>
              <NavItem path='/'>{translationValue('home')}</NavItem>
              <NavItem path='/course'>{translationValue('courses')}</NavItem>
              <NavItem path='/dapp'>{translationValue('knowledgeBase')}</NavItem>
              <NavItem path='/ldh/test'>{translationValue('rewards')}</NavItem>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className='flex cursor-pointer items-center text-cyber-blue hover:text-cyber-purple transition-colors duration-200'
              >
                <Globe className='h-6 w-6' />
                <ChevronDown className='h-4 w-4 ml-1' />
              </button>
              {isLangMenuOpen && (
                <div className='absolute right-0 mt-2 w-32 bg-dark-card rounded-lg shadow-neon z-50'>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block cursor-pointer w-full text-left px-4 py-2 text-sm ${
                        i18n.language === lang.code
                          ? 'text-cyber-blue bg-cyber-blue/20'
                          : 'text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10'
                      } transition-colors duration-200`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <WalletConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
