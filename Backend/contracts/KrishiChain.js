const { ethers } = require('ethers');
require('dotenv').config();

class KrishiChainContract {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
        this.contractAddress = process.env.CONTRACT_ADDRESS;
        
        // TODO: Add your contract ABI here
        this.contractABI = [];
        
        this.contract = new ethers.Contract(
            this.contractAddress,
            this.contractABI,
            this.wallet
        );
    }

    // Add methods to interact with your smart contract here
    // Example:
    async getProductDetails(productId) {
        try {
            const product = await this.contract.getProduct(productId);
            return product;
        } catch (error) {
            console.error('Error getting product details:', error);
            throw error;
        }
    }
}

module.exports = new KrishiChainContract(); 