import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';

declare global {
    interface Window {
        ethereum: any;
    }
}

interface Web3ContextType {
    account: string | null;
    provider: EthersWeb3Provider | null;
    connect: () => Promise<void>;
    disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType>({
    account: null,
    provider: null,
    connect: async () => {},
    disconnect: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<EthersWeb3Provider | null>(null);

    const connect = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const account = await signer.getAddress();
                setAccount(account);
                setProvider(provider);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask to use this application');
        }
    };

    const disconnect = () => {
        setAccount(null);
        setProvider(null);
    };

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnect();
                } else {
                    setAccount(accounts[0]);
                }
            });
        }
    }, []);

    return (
        <Web3Context.Provider value={{ account, provider, connect, disconnect }}>
            {children}
        </Web3Context.Provider>
    );
}; 