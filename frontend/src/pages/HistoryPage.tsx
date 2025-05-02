import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Filter, Download, ExternalLink } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

const HistoryPage = () => {
  const { isConnected } = useWeb3();
  const [filter, setFilter] = useState('all');
  
  // Mock data - this will be replaced with actual data from your backend
  const allTransactions = [
    { 
      id: 'tx1', 
      type: 'send', 
      status: 'completed', 
      asset: 'ETH',
      amount: '0.25',
      to: '0x3a2c...8b2e',
      fee: '0.0012 ETH',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      hash: '0xa1b2c3...',
    },
    { 
      id: 'tx2', 
      type: 'receive', 
      status: 'completed', 
      asset: 'USDC',
      amount: '150.00',
      from: '0x7f5d...9c4d',
      timestamp: Date.now() - 5 * 60 * 60 * 1000,
      hash: '0xd4e5f6...',
    },
    { 
      id: 'tx3', 
      type: 'swap', 
      status: 'completed', 
      asset: 'ETH → USDC',
      amount: '0.5 ETH for 800 USDC',
      fee: '0.0015 ETH',
      timestamp: Date.now() - 24 * 60 * 60 * 1000,
      hash: '0xg7h8i9...',
    },
    { 
      id: 'tx4', 
      type: 'send', 
      status: 'pending', 
      asset: 'USDC',
      amount: '50.00',
      to: '0x2d6f...6e7a',
      fee: '0.0010 ETH',
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
      hash: '0xj1k2l3...',
    },
    { 
      id: 'tx5', 
      type: 'receive', 
      status: 'completed', 
      asset: 'AAVE',
      amount: '2.5',
      from: '0x8e9f...4b3c',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
      hash: '0xm4n5o6...',
    },
    { 
      id: 'tx6', 
      type: 'stake', 
      status: 'completed', 
      asset: 'ETH',
      amount: '0.75',
      fee: '0.0008 ETH',
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
      hash: '0xp7q8r9...',
    },
    { 
      id: 'tx7', 
      type: 'send', 
      status: 'failed', 
      asset: 'LINK',
      amount: '15.00',
      to: '0x5g7h...2j4k',
      fee: '0.0005 ETH',
      timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
      hash: '0xs1t2u3...',
    },
  ];

  // Filter transactions based on selected filter
  const transactions = filter === 'all'
    ? allTransactions
    : allTransactions.filter(tx => tx.type === filter);

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!isConnected) {
    return (
      <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center px-4">
        <Download className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Connect Your Wallet
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          To view your transaction history, connect your Web3 wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and filter your transaction history
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'send' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('send')}
        >
          Send
        </Button>
        <Button
          variant={filter === 'receive' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('receive')}
        >
          Receive
        </Button>
        <Button
          variant={filter === 'swap' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('swap')}
        >
          Swap
        </Button>
        <Button
          variant={filter === 'stake' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('stake')}
        >
          Stake
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Filter className="h-4 w-4" />}
          className="ml-auto"
        >
          More Filters
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}
        >
          Export
        </Button>
      </div>
      
      <Card>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asset & Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tx Hash
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((tx) => (
                  <tr 
                    key={tx.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          tx.type === 'receive'
                            ? 'success'
                            : tx.type === 'send'
                            ? 'warning'
                            : tx.type === 'swap'
                            ? 'primary'
                            : 'secondary'
                        }
                      >
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          tx.status === 'completed'
                            ? 'success'
                            : tx.status === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {tx.amount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {tx.asset}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {tx.to ? `To: ${tx.to}` : tx.from ? `From: ${tx.from}` : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(tx.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a
                        href="#"
                        className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                      >
                        {tx.hash.substring(0, 8)}...
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryPage;