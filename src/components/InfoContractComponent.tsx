import React from 'react';
import { useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import useContract from '../hooks/useContract';
import InfoForm from './InfoForm';

const InfoContractComponent: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { info, greeting, setInfoData, sayHi } = useContract();

  const handleSetInfo = async (name: string, age: string) => {
    if (isConnected && address) {
      try {
        await setInfoData(name, age, address);
      } catch (error) {
        console.error('设置信息失败:', error);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='max-w-2xl w-full bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>信息合约仪表板</h1>

        <div className='mb-6 flex justify-center'>
          <ConnectKitButton />
        </div>

        {!isConnected && (
          <p className='text-red-500 text-center mb-6'>请连接您的钱包以与合约交互！</p>
        )}

        <InfoForm onSubmit={handleSetInfo} />

        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>已存储的信息</h2>
          <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
            <p className='text-gray-700'>
              <span className='font-medium'>姓名：</span> {info.name || '未设置'}
            </p>
            <p className='text-gray-700'>
              <span className='font-medium'>年龄：</span> {info.age || '未设置'}
            </p>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>问候语</h2>
          <button
            onClick={sayHi}
            className='w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
          >
            打招呼
          </button>
          {greeting && (
            <p className='mt-4 text-gray-700'>
              <span className='font-medium'>回复：</span> {greeting}
            </p>
          )}
        </div>

        {isConnected && address && (
          <div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>已连接的账户</h3>
            <p className='text-gray-600 break-all'>{address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoContractComponent;
