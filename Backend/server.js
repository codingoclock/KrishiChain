require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const walletManager = require('./utils/wallet');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Initialize wallet connection
async function initializeWallet() {
    try {
        await walletManager.connectProvider();
        await walletManager.connectWalletWithPrivateKey(process.env.PRIVATE_KEY);
        console.log('Wallet connected successfully');
    } catch (error) {
        console.error('Failed to initialize wallet:', error);
    }
}

// Initialize wallet on server start
initializeWallet();

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Wallet endpoints
app.get('/wallet/address', async (req, res) => {
    try {
        const address = await walletManager.getAddress();
        res.json({ address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/wallet/balance', async (req, res) => {
    try {
        const balance = await walletManager.getBalance();
        res.json({ balance: balance.toString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 