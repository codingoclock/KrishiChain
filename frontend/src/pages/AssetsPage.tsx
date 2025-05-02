import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Plus, ArrowDown, ArrowUp, ArrowUpDown, Filter } from 'lucide-react';
import Badge from '../components/ui/Badge';
import { useWeb3 } from '../context/Web3Context';

const AssetsPage = () => {
  const { isConnected } = useWeb3();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // Mock data - this will be replaced with actual data from your backend
  const assets = [
    { 
      id: 'eth', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      balance: '1.456', 
      value: 3892.45, 
      price: 2675.12,
      change: 2.4, 
      actions: ['send', 'receive', 'swap', 'stake'] 
    },
    { 
      id: 'usdc', 
      name: 'USD Coin', 
      symbol: 'USDC', 
      balance: '2,500.00', 
      value: 2500.00, 
      price: 1.00,
      change: 0.01, 
      actions: ['send', 'receive', 'swap'] 
    },
    { 
      id: 'aave', 
      name: 'Aave', 
      symbol: 'AAVE', 
      balance: '12.65', 
      value: 1258.90, 
      price: 99.52,
      change: -3.2, 
      actions: ['send', 'receive', 'swap'] 
    },
    { 
      id: 'link', 
      name: 'Chainlink', 
      symbol: 'LINK', 
      balance: '75.32', 
      value: 842.33, 
      price: 11.18,
      change: 5.7, 
      actions: ['send', 'receive', 'swap'] 
    },
    { 
      id: 'uni', 
      name: 'Uniswap', 
      symbol: 'UNI', 
      balance: '25.87', 
      value: 152.63, 
      price: 5.90,
      change: -1.5, 
      actions: ['send', 'receive', 'swap'] 
    },
    { 
      id: 'matic', 
      name: 'Polygon', 
      symbol: 'MATIC', 
      balance: '350.45', 
      value: 227.79, 
      price: 0.65,
      change: 4.2, 
      actions: ['send', 'receive', 'swap'] 
    },
  ];

  if (!isConnected) {
    return (
      <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center px-4">
        <ArrowUpDown className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Connect Your Wallet
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          To view and manage your assets, connect your Web3 wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assets</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your crypto assets in one place
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
          <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <div className="flex rounded-md overflow-hidden ml-auto">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1 text-sm ${
                view === 'grid'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 text-sm ${
                view === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <Card key={asset.id} isHoverable className="flex flex-col">
              <Card.Content className="flex-grow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {asset.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {asset.symbol}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      asset.change >= 0
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {asset.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(asset.change)}%
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Balance
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {asset.balance} {asset.symbol}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Value
                    </p>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      ${asset.value.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Price
                  </p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    ${asset.price.toLocaleString()}
                  </p>
                </div>
              </Card.Content>
              
              <Card.Footer className="flex flex-wrap gap-2">
                <Button size="sm" leftIcon={<ArrowUp className="h-4 w-4" />}>
                  Send
                </Button>
                <Button size="sm" variant="outline" leftIcon={<ArrowDown className="h-4 w-4" />}>
                  Receive
                </Button>
                <Button size="sm" variant="ghost" leftIcon={<ArrowUpDown className="h-4 w-4" />}>
                  Swap
                </Button>
              </Card.Footer>
            </Card>
          ))}
          
          {/* Add Asset Card */}
          <Card isHoverable className="flex flex-col items-center justify-center border-dashed">
            <Card.Content className="flex flex-col items-center text-center py-6">
              <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                Add Asset
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Import token or add custom token
              </p>
              <Button
                className="mt-4"
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Add Token
              </Button>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    24h
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {assets.map((asset) => (
                  <tr 
                    key={asset.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {asset.symbol.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {asset.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                      ${asset.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          asset.change >= 0
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {asset.change >= 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3" />
                        )}
                        {Math.abs(asset.change)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                      {asset.balance} {asset.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                      ${asset.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="ghost">
                          Send
                        </Button>
                        <Button size="sm" variant="ghost">
                          Receive
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AssetsPage;