import { ConnectKitButton } from 'connectkit';
import { Wallet, CheckCircle } from 'lucide-react';
import { useWalletAuth } from '@hooks/useWalletAuth';

export const WalletConnectButton = () => {
  const { isAuthenticated, isSigningMessage } = useWalletAuth();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        const buttonText = isAuthenticated
          ? ensName || truncatedAddress
          : isSigningMessage
          ? '签名中...'
          : isConnected
          ? '请签名验证'
          : '连接钱包';

        return (
          <button
            onClick={show}
            disabled={isSigningMessage}
            className='bg-dark-card text-cyber-blue px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:shadow-neon transition-all duration-300 border border-cyber-blue/30'
          >
            <Wallet className='h-4 w-4 mr-2' />
            {isAuthenticated ? (
              <span className='flex items-center'>
                <CheckCircle className='h-3 w-3 mr-1 text-green-500' />
                {buttonText}
              </span>
            ) : (
              buttonText
            )}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
