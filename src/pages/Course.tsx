import React, { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import ExchangeSection from '@components/course/ExchangeSection';
import CourseList from '@components/course/CourseList';
import CartSidebar from '@components/common/sidebar/CartSidebar';
import RightSidebar from '@components/common/sidebar/RightSidebar';
import { CoinType } from '@/utils/courseType';
import { CartItem } from '@utils/index';

const Course: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const exchangeRates: Record<CoinType, BigNumber> = {
    ETH: BigNumber.from('1000'),
    BTC: BigNumber.from('20000'),
    USDT: BigNumber.from('2'),
    BNB: BigNumber.from('500'),
  };

  const handleAddToCart = (course: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === course.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = course;
        return updatedItems;
      }

      return [...prev, course];
    });
  };

  return (
    <>
      <ExchangeSection exchangeRates={exchangeRates} />
      <CourseList onAddToCart={handleAddToCart} />
      <RightSidebar cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <CartSidebar
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default Course;
