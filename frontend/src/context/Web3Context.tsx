import React, { createContext, useContext, useState } from 'react';

interface Web3ContextType {
  isConnected: boolean;
  address: string | null;
  balance: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  balance: '0',
  connectWallet: () => {},
  disconnectWallet: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0');

  // Mock wallet connection - to be replaced with real web3 integration
  const connectWallet = () => {
    // This is a placeholder for actual Web3 wallet connection
    // You will implement the real connection logic
    const mockAddress = '0x' + Math.random().toString(16).substring(2, 12) + '...';
    const mockBalance = (Math.random() * 10).toFixed(4);
    
    setIsConnected(true);
    setAddress(mockAddress);
    setBalance(mockBalance);
  };

  const disconnectWallet = () => {
    // This is a placeholder for actual Web3 wallet disconnection
    setIsConnected(false);
    setAddress(null);
    setBalance('0');
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address,
        balance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};