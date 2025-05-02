import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useEthers } from '../contexts/EthersContext';
import ConnectWallet from './ConnectWallet';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isConnected } = useEthers();

  if (!isConnected) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            You need to connect your wallet to access this page.
          </p>
          <div className="flex justify-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;