import { Link, useLocation } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { WalletConnectButton } from './WalletConnectButton';

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
        isActive ? 'text-cyber-blue cursor-pointer' : 'hover:text-cyber-blue cursor-pointer'
      }`}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <header className='nav-blur fixed w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <GraduationCap className='h-8 w-8 text-cyber-blue float-animation' />
            <span className='ml-2 text-cyber-blue font-bold text-lg'>前端Web3大学</span>
          </div>

          <div className='hidden md:block'>
            <div className='flex items-center transition-colors duration-200'>
              <NavItem path='/'>首页</NavItem>
              <NavItem path='/course'>课程</NavItem>
              <NavItem path='/dapp'>知识库</NavItem>
              <NavItem path='/ldh/test'>奖励</NavItem>
            </div>
          </div>

          <div className='flex items-center'>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
