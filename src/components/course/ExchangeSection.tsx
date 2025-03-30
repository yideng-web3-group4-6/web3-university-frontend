import React, { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { CoinType } from '@utils/courseData';

interface ExchangeSectionProps {
  exchangeRates: Record<CoinType, BigNumber>;
}

const ExchangeSection: React.FC<ExchangeSectionProps> = ({ exchangeRates }) => {
  const [ethAmount, setEthAmount] = useState<string>('');
  const [selectedCoin, setSelectedCoin] = useState<CoinType>('ETH');

  let yidengAmount = '0.00';
  try {
    if (ethAmount && !isNaN(parseFloat(ethAmount))) {
      const amountBN = BigNumber.from(Math.floor(parseFloat(ethAmount) * 100));
      const currentRate = exchangeRates[selectedCoin];
      const yidengAmountBN = amountBN.mul(currentRate);
      yidengAmount = (yidengAmountBN.toNumber() / 100).toFixed(2);
    }
  } catch (error) {
    console.error('Error calculating yidengAmount:', error);
  }

  const handleExchange = () => {
    try {
      if (!ethAmount || parseFloat(ethAmount) <= 0) {
        alert('请输入有效的数量');
        return;
      }
      alert(`成功兑换！您用 ${ethAmount} ${selectedCoin} 兑换了 ${yidengAmount} $YD`);
      setEthAmount('');
    } catch (error) {
      alert('兑换失败，请检查输入！');
      console.error('Error during exchange:', error);
    }
  };

  return (
    <div className='hero-gradient pt-24'>
      <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple'>
            加密货币兑换 $YD
          </h1>
          <div className='mt-6 max-w-2xl mx-auto'>
            <p className='text-xl mb-6'>
              输入数量，实时兑换 $YD，当前汇率：1 {selectedCoin} ={' '}
              {exchangeRates[selectedCoin].toString()} $YD
            </p>
            <div className='flex flex-col items-center gap-4'>
              <div className='w-full max-w-md flex gap-2'>
                <input
                  type='number'
                  value={ethAmount}
                  onChange={e => setEthAmount(e.target.value)}
                  placeholder={`输入 ${selectedCoin} 数量`}
                  className='flex-1 bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all duration-300'
                />
                <select
                  value={selectedCoin}
                  onChange={e => setSelectedCoin(e.target.value as CoinType)}
                  className='bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all duration-300'
                >
                  <option value='ETH'>ETH</option>
                  <option value='BTC'>BTC</option>
                  <option value='USDT'>USDT</option>
                  <option value='BNB'>BNB</option>
                </select>
              </div>
              <p className='text-lg'>
                预计获得：<span className='text-cyber-purple font-bold'>{yidengAmount}</span> $YD
              </p>
              <button
                onClick={handleExchange}
                className='bg-transparent border-2 border-cyber-blue text-cyber-blue px-6 py-3 rounded-lg font-medium hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple hover:shadow-neon transition-all duration-300'
              >
                立即兑换
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
