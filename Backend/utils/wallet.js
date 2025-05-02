const { ethers } = require('ethers');
require('dotenv').config();

class WalletManager {
    constructor() {
        this.provider = null;
        this.wallet = null;
        this.contract = null;
    }

    // Connect to a provider (default to Sepolia testnet)
    async connectProvider() {
        try {
            this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.infura.io/v3/your-api-key');
            return this.provider;
        } catch (error) {
            console.error('Error connecting to provider:', error);
            throw error;
        }
    }

    // Connect wallet using private key
    async connectWalletWithPrivateKey(privateKey) {
        try {
            if (!this.provider) {
                await this.connectProvider();
            }
            this.wallet = new ethers.Wallet(privateKey, this.provider);
            return this.wallet;
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    }

    // Connect wallet using MetaMask or other Web3 providers
    async connectWalletWithWeb3() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.provider = new ethers.BrowserProvider(window.ethereum);
                this.wallet = await this.provider.getSigner();
                return this.wallet;
            } else {
                throw new Error('Please install MetaMask or another Web3 wallet');
            }
        } catch (error) {
            console.error('Error connecting to Web3 wallet:', error);
            throw error;
        }
    }

    // Get wallet address
    async getAddress() {
        if (!this.wallet) {
            throw new Error('Wallet not connected');
        }
        return await this.wallet.getAddress();
    }

    // Get wallet balance
    async getBalance() {
        if (!this.wallet) {
            throw new Error('Wallet not connected');
        }
        const address = await this.wallet.getAddress();
        return await this.provider.getBalance(address);
    }

    // Initialize contract instance
    async initContract(contractAddress, contractABI) {
        if (!this.wallet) {
            throw new Error('Wallet not connected');
        }
        this.contract = new ethers.Contract(
            contractAddress,
            contractABI,
            this.wallet
        );
        return this.contract;
    }
}

module.exports = new WalletManager(); 