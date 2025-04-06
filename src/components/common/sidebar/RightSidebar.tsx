import React from 'react';
import { ShoppingCart, ArrowUp } from 'lucide-react';
import { CartItem } from '@utils/index';
import { translationValue } from '@locales/i18n';

interface RightSidebarProps {
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ cartItems, setIsCartOpen }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='rounded-l-[14px] bg-dark-card bg-transparent border-2 border-cyber-blue text-cyber-blue fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center p-1 z-40'>
      <div className='relative group'>
        <button
          onClick={() => setIsCartOpen(true)}
          className='rounded-[14px] p-3 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyber-blue group-hover:to-cyber-purple group-hover:shadow-neon'
        >
          <ShoppingCart className='right-sidebar-icon' />
          {cartItems.length > 0 && (
            <span className='absolute top-0 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm'>
              {cartItems.length}
            </span>
          )}
        </button>
        <span className='absolute right-full top-1/2 transform -translate-y-1/2 mr-1 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {translationValue('cartTitle')}
        </span>
      </div>

      <div className='relative group'>
        <button
          onClick={scrollToTop}
          className='rounded-[14px] p-3 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyber-blue group-hover:to-cyber-purple group-hover:shadow-neon'
        >
          <ArrowUp className='right-sidebar-icon' />
        </button>
        <span className='absolute right-full top-1/2 transform -translate-y-1/2 mr-1 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {translationValue('scrollToTop')}
        </span>
      </div>
    </div>
  );
};

export default RightSidebar;
