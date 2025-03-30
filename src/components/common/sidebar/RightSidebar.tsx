import React from 'react';
import { ShoppingCart, ArrowUp } from 'lucide-react';
import { CartItem } from '@utils/index';

interface RightSidebarProps {
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ cartItems, setIsCartOpen }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='rounded-l-[14px] bg-dark-card bg-transparent border-2 border-cyber-blue text-cyber-blue fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4 p-3 z-40'>
      <div className='relative group'>
        <button
          onClick={() => setIsCartOpen(true)}
          className='bg-gradient-to-br from-cyber-blue/80 to-cyber-purple/80 p-3 rounded-full border border-cyber-blue/30 hover:shadow-neon hover:from-cyber-blue hover:to-cyber-purple transition-all duration-300 shadow-lg'
        >
          <ShoppingCart className='w-6 h-6 text-white' />
          {cartItems.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm'>
              {cartItems.length}
            </span>
          )}
        </button>
        <span className='absolute right-full top-1/2 transform -translate-y-1/2 mr-2 w-max px-2 py-1 text-xs text-white bg-gradient-to-r from-cyber-blue to-cyber-purple rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg'>
          购物车
        </span>
      </div>

      <div className='relative group'>
        <button
          onClick={scrollToTop}
          className='bg-gradient-to-br from-cyber-blue/80 to-cyber-purple/80 p-3 rounded-full border border-cyber-blue/30 hover:shadow-neon hover:from-cyber-blue hover:to-cyber-purple transition-all duration-300 shadow-lg'
        >
          <ArrowUp className='w-6 h-6 text-white' />
        </button>
        <span className='absolute right-full top-1/2 transform -translate-y-1/2 mr-2 w-max px-2 py-1 text-xs text-white bg-gradient-to-r from-cyber-blue to-cyber-purple rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg'>
          返回顶部
        </span>
      </div>
    </div>
  );
};

export default RightSidebar;
