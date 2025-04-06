import React, { useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { CoinType } from '@/utils/courseType';
import { translationValue } from '@locales/i18n';

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
        alert(translationValue('enterValidAmount'));
        return;
      }
      // 手动构建消息，不再使用参数化的翻译
      const successMessage = `${translationValue(
        'exchangeSuccessPrefix',
      )} ${ethAmount} ${selectedCoin} ${translationValue(
        'exchangeSuccessSuffix',
      )} ${yidengAmount} $YD`;
      alert(successMessage);
      setEthAmount('');
    } catch (error) {
      alert(translationValue('exchangeFailed'));
      console.error('Error during exchange:', error);
    }
  };

  return (
    <div className='hero-gradient pt-24'>
      <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple'>
            {translationValue('cryptoExchange')}
          </h1>
          <div className='mt-6 mx-auto'>
            <p className='text-xl mb-6'>
              {translationValue('exchangeRateInfoPrefix')} {selectedCoin} ={' '}
              {exchangeRates[selectedCoin].toString()} $YD
            </p>
            <div className='flex flex-col items-center gap-4'>
              <div className='w-full max-w-md flex gap-2'>
                <input
                  type='number'
                  value={ethAmount}
                  onChange={e => setEthAmount(e.target.value)}
                  placeholder={`${translationValue(
                    'enterAmountPrefix',
                  )} ${selectedCoin} ${translationValue('enterAmountSuffix')}`}
                  className='flex-1 bg-dark-card text-white px-4 py-3 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all duration-300'
                />
                <select
                  value={selectedCoin}
                  onChange={e => setSelectedCoin(e.target.value as CoinType)}
                  className='bg-dark-card cursor-pointer text-white px-4 py-3 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 transition-all duration-300'
                >
                  <option value='ETH'>ETH</option>
                  <option value='BTC'>BTC</option>
                  <option value='USDT'>USDT</option>
                  <option value='BNB'>BNB</option>
                </select>
              </div>
              <p className='text-lg'>
                {translationValue('estimatedAmount')}
                <span className='text-cyber-purple font-bold'>{yidengAmount}</span> $YD
              </p>
              <button
                onClick={handleExchange}
                className='bg-transparent cursor-pointer border-2 border-cyber-blue text-cyber-blue px-6 py-3 rounded-lg font-medium hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple hover:shadow-neon transition-all duration-300'
              >
                {translationValue('exchangeNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSection;
