import { useState, useEffect } from 'react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';

interface UseWalletAuthReturn {
  isConnected: boolean;
  isAuthenticated: boolean;
  isSigningMessage: boolean;
  handleSignature: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletAuth = (): UseWalletAuthReturn => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const { signMessageAsync } = useSignMessage();

  // 在hook内部定义签名消息
  const signatureMessage = '验证我的Web3身份';

  // 监听钱包连接状态
  useEffect(() => {
    const requestSignature = async () => {
      if (isConnected && !isAuthenticated && !isSigningMessage) {
        await handleSignature();
      }
    };

    requestSignature();
  }, [isConnected]);

  // 处理签名请求
  const handleSignature = async () => {
    if (isConnected) {
      setIsSigningMessage(true);
      try {
        const sig = await signMessageAsync({ message: signatureMessage });
        console.log('签名成功:', sig);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('签名错误:', error);
        // 签名被拒绝或失败，断开钱包连接
        disconnect();
        setIsAuthenticated(false);
      } finally {
        setIsSigningMessage(false);
      }
    }
  };

  // 当连接断开时，重置认证状态
  useEffect(() => {
    if (!isConnected) {
      setIsAuthenticated(false);
    }
  }, [isConnected]);

  return {
    isConnected,
    isAuthenticated,
    isSigningMessage,
    handleSignature,
    disconnect,
  };
};
