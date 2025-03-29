import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // ethers v6.13.5
import InfoContractABI from '@/abis/InfoContract.json'; // 导入 ABI
import { hooks } from '@/connections/metaMask';

// 合约地址（从 ABI 的 networks 中提取）
const CONTRACT_ADDRESS = InfoContractABI.networks['5777'].address;

const InfoContractPage: React.FC = () => {
  const { useAccount, useProvider } = hooks;
  const account = useAccount(); // string | null
  const provider = useProvider(); // 假设返回 ethers.JsonRpcProvider 或兼容类型
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [nameInput, setNameInput] = useState<string>('');
  const [ageInput, setAgeInput] = useState<string>('');
  const [info, setInfo] = useState<{ name: string; age: string }>({
    name: '',
    age: '0',
  });
  const [greeting, setGreeting] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 初始化合约实例
  useEffect(() => {
    if (provider && account) {
      try {
        // 获取签名者
        const signer = provider.getSigner();
        // 初始化合约实例
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, InfoContractABI.abi, signer);
        setContract(contractInstance);
        fetchInfo(contractInstance);
      } catch (error) {
        console.error('初始化合约失败:', error);
      }
    }
  }, [provider, account]);

  // 获取合约信息
  const fetchInfo = async (contractInstance: ethers.Contract) => {
    setLoading(true);
    try {
      const [name, age] = await contractInstance.getInfo();
      console.log('fetchInfo: ', { name, age });
      setInfo({ name, age: age.toString() });
    } catch (error) {
      console.error('获取信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 调用 setInfo 函数
  const handleSetInfo = async () => {
    if (!contract || !nameInput || !ageInput) return;
    setLoading(true);
    try {
      const tx = await contract.setInfo(nameInput, ageInput);
      await tx.wait();
      console.log('信息设置成功', contract);
      fetchInfo(contract);
      setNameInput('');
      setAgeInput('');
    } catch (error) {
      console.error('设置信息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 调用 sayHi 函数
  const handleSayHi = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      console.log('sayHi: ', contract);
      const result = await contract.sayHi();
      setGreeting(result);
    } catch (error) {
      console.error('调用 sayHi 失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 如果未连接钱包，显示提示
  if (!account || !provider) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <p className='text-lg text-gray-700'>请先连接钱包</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>信息合约交互</h1>

      <div className='space-y-6'>
        <p className='text-sm text-gray-700'>
          已连接账户: <span className='font-mono'>{account}</span>
        </p>
        <p className='text-sm text-gray-700'>
          合约地址: <span className='font-mono'>{CONTRACT_ADDRESS}</span>
        </p>

        {/* 设置信息 */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>设置信息</h2>
          <input
            type='text'
            placeholder='输入姓名'
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='number'
            placeholder='输入年龄'
            value={ageInput}
            onChange={e => setAgeInput(e.target.value)}
            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleSetInfo}
            disabled={loading}
            className={`w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '处理中...' : '设置信息'}
          </button>
        </div>

        {/* 获取信息 */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>当前信息</h2>
          <p className='text-gray-700'>姓名: {info.name || '未设置'}</p>
          <p className='text-gray-700'>年龄: {info.age}</p>
          <button
            onClick={() => fetchInfo(contract!)}
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '刷新中...' : '刷新信息'}
          </button>
        </div>

        {/* 打招呼 */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>打招呼</h2>
          <button
            onClick={handleSayHi}
            disabled={loading}
            className={`w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? '处理中...' : '说“Hi”'}
          </button>
          {greeting && <p className='text-gray-700'>问候语: {greeting}</p>}
        </div>
      </div>
    </div>
  );
};

export default InfoContractPage;
