import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS } from '../utils/contractConfig';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { InfoContract, InfoContract__factory } from '@/types/ethers-contracts';

const useContract = () => {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [contract, setContract] = useState<InfoContract | null>(null);
  const [info, setInfo] = useState({ name: '', age: '' });
  const [greeting, setGreeting] = useState<string>('');

  const getEthersProvider = (client: any): ethers.providers.Web3Provider => {
    return new ethers.providers.Web3Provider(client);
  };

  useEffect(() => {
    const initContract = async () => {
      try {
        let contractInstance: InfoContract;

        if (isConnected && address && walletClient) {
          const provider = getEthersProvider(walletClient);
          const signer = await provider.getSigner();
          // contractInstance = new Contract(
          //   CONTRACT_ADDRESS,
          //   CONTRACT_ABI,
          //   signer
          // );
          // 不使用 new Contract 创建实例，而是使用工厂方法
          // 工厂方法的好处是可以避免 ABI 的问题
          contractInstance = InfoContract__factory.connect(CONTRACT_ADDRESS, signer);
        } else if (publicClient) {
          const provider = getEthersProvider(publicClient);
          // contractInstance = new Contract(
          //   CONTRACT_ADDRESS,
          //   CONTRACT_ABI,
          //   provider
          // );
          // 不使用 new Contract 创建实例，而是使用工厂方法
          // 工厂方法的好处是可以避免 ABI 的问题
          contractInstance = InfoContract__factory.connect(CONTRACT_ADDRESS, provider);
        } else {
          return;
        }

        setContract(contractInstance);
        await fetchInfo(contractInstance);
      } catch (error) {
        console.error('初始化合约失败:', error);
      }
    };

    initContract();
  }, [isConnected, address, publicClient, walletClient]);

  const fetchInfo = async (contractInstance: InfoContract) => {
    try {
      const result = await contractInstance.getInfo();
      setInfo({ name: result[0], age: result[1].toString() });
    } catch (error) {
      console.error('获取信息失败:', error);
    }
  };

  const setInfoData = async (name: string, age: string, account: string) => {
    if (!contract) throw new Error('合约未初始化');
    if (!isConnected || !walletClient) throw new Error('钱包未连接');

    try {
      const tx = await contract.setInfo(name, age);
      await tx.wait();
      await fetchInfo(contract);
    } catch (error) {
      throw new Error(`设置信息失败: ${(error as Error).message}`);
    }
  };

  const sayHi = async () => {
    console.log('sayHi', contract);
    if (!contract) throw new Error('合约未初始化');

    try {
      const result = await contract.sayHi();
      setGreeting(result);
    } catch (error) {
      console.error('获取问候语失败:', error);
    }
  };

  return {
    contract,
    info,
    greeting,
    setInfoData,
    sayHi,
    refreshInfo: fetchInfo,
  };
};

export default useContract;
