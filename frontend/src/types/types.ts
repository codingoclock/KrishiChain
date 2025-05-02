export interface WalletInfo {
  address: string;
  balance: string;
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  value: number;
  change: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  status: 'pending' | 'completed' | 'failed';
  amount: string;
  asset: string;
  address: string;
  timestamp: number;
  hash: string;
  fee?: string;
}

export interface MarketData {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  high24h: number;
  low24h: number;
}