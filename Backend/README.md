# KrishiChain Backend

This is the backend server for KrishiChain, built with Node.js, Express, and Ethers.js.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
RPC_URL=<your-network-rpc-url>
CONTRACT_ADDRESS=<your-deployed-contract-address>
PRIVATE_KEY=<your-private-key>
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

- `PORT`: The port number for the server (default: 3000)
- `RPC_URL`: The RPC URL of your Ethereum network
- `CONTRACT_ADDRESS`: The address of your deployed KrishiChain smart contract
- `PRIVATE_KEY`: Your Ethereum wallet private key (for signing transactions)

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reloading

## API Endpoints

- `GET /health`: Health check endpoint 