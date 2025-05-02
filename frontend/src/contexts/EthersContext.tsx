import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import KrishiChainABI from '../contracts/KrishiChainABI.json';

interface EthersContextType {
  account: string | null;
  contract: ethers.Contract | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  networkName: string | null;
}

const EthersContext = createContext<EthersContextType>({
  account: null,
  contract: null,
  provider: null,
  signer: null,
  connectWallet: async () => {},
  isConnected: false,
  isConnecting: false,
  error: null,
  networkName: null,
});

export const useEthers = () => useContext(EthersContext);

interface EthersProviderProps {
  children: ReactNode;
}

export const EthersProvider: React.FC<EthersProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string | null>(null);

  // Contract address - would be configured based on deployment
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (!window.ethereum) {
        throw new Error('Metamask not installed! Please install Metamask.');
      }

      // Request accounts
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      
      // Get network information
      const network = await provider.getNetwork();
      setNetworkName(network.name);

      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock Metamask and try again.');
      }
      
      const signer = await provider.getSigner();
      setSigner(signer);
      
      const account = await signer.getAddress();
      setAccount(account);
      
      // Initialize the contract
      const krishiChainContract = new ethers.Contract(
        contractAddress,
        KrishiChainABI,
        signer
      );
      
      setContract(krishiChainContract);
      setIsConnected(true);
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount(null);
          setIsConnected(false);
        } else {
          setAccount(accounts[0]);
          connectWallet(); // Reconnect with the new account
        }
      });
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setError(error instanceof Error ? error.message : 'Unknown error connecting to wallet');
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
      connectWallet();
    }
  }, []);

  return (
    <EthersContext.Provider
      value={{
        account,
        contract,
        provider,
        signer,
        connectWallet,
        isConnected,
        isConnecting,
        error,
        networkName,
      }}
    >
      {children}
    </EthersContext.Provider>
  );
};