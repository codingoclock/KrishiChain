import React from 'react';
import { Wallet } from 'lucide-react';
import { useEthers } from '../contexts/EthersContext';

const ConnectWallet: React.FC = () => {
  const { connectWallet, isConnected, isConnecting, error } = useEthers();

  return (
    <div>
      {!isConnected ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Wallet className="h-4 w-4" />
          <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
        </button>
      ) : (
        <button
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          disabled
        >
          <Wallet className="h-4 w-4" />
          <span>Connected</span>
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ConnectWallet;