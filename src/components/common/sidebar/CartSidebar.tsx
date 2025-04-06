import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { CartItem, transitionBigNumber } from '@utils/index';
import { BigNumber } from '@ethersproject/bignumber';
import { translationValue } from '@locales/i18n';

interface CartSidebarProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setCartItems: (items: CartItem[]) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cartItems,
  isCartOpen,
  setIsCartOpen,
  setCartItems,
}) => {
  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum.add(transitionBigNumber(item.price)), BigNumber.from('0'))
      .toString();
  };

  const handleRemoveItem = (id: string) => {
    const confirmDelete = window.confirm(translationValue('cartConfirmDelete'));
    if (!confirmDelete) return;

    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
  };

  const handleSettleAccounts = () => {
    if (cartItems.length === 0) {
      alert(translationValue('cartEmptyAlert'));
      return;
    }
    alert(`${translationValue('cartSuccessAlert')} ${calculateTotal()} $YD`);
  };

  return (
    <>
      {isCartOpen && (
        <div className='fixed right-0 top-0 h-full w-80 bg-dark-card shadow-neon-xl p-6 border-l border-t border-b border-cyber-blue/30 z-50 flex flex-col'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent'>
              {translationValue('cartTitle')}
            </h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className='p-1 rounded-full hover:bg-cyber-blue/20 transition-colors duration-200'
            >
              <X className='w-6 h-6 text-cyber-blue hover:text-cyber-purple' />
            </button>
          </div>

          <div className='flex-1 overflow-y-auto'>
            {cartItems.length === 0 ? (
              <p className='text-center text-gray-400 py-8'>{translationValue('cartEmpty')}</p>
            ) : (
              <div className='space-y-4 pr-2'>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className='p-4 rounded-lg bg-dark-card-hover border border-cyber-blue/30 hover:border-cyber-purple/50 transition-all duration-200 flex justify-between items-center'
                  >
                    <div>
                      <p className='text-cyber-blue font-semibold'>{item.title}</p>
                      <p className='text-cyber-purple mt-1'>
                        {transitionBigNumber(item.price)} $YD
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className='p-1 rounded-full hover:bg-red-500/20 transition-colors duration-200'
                    >
                      <Trash2 className='w-5 h-5 text-red-400 hover:text-red-600' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='sticky bottom-0 bg-dark-card pt-4 pb-6 border-t border-cyber-blue/20'>
            <p className='text-lg font-bold text-cyber-blue'>
              {translationValue('cartTotal')}:{' '}
              <span className='text-cyber-purple'>{calculateTotal()} $YD</span>
            </p>
            <button
              onClick={handleSettleAccounts}
              className='bg-transparent border-2 border-cyber-blue text-cyber-blue px-6 py-3 w-full mt-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white rounded-lg hover:shadow-neon transition-all duration-300'
            >
              {translationValue('cartCheckout')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
