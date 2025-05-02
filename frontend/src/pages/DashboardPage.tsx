import React from 'react';
import Card from '../components/ui/Card';
import Stat from '../components/ui/Stat';
import { Wallet, ArrowUpDown, ArrowDown, ArrowUp, Activity, PieChart, Sparkles } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import Badge from '../components/ui/Badge';

const DashboardPage = () => {
  const { isConnected, balance } = useWeb3();

  // Mock data - this will be replaced with actual data from your backend
  const transactions = [
    { id: 1, type: 'send', amount: '0.25 ETH', to: '0x3a...8b2e', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'receive', amount: '150 USDC', from: '0x7f...9c4d', time: '5 hours ago', status: 'completed' },
    { id: 3, type: 'swap', amount: '0.5 ETH → 800 USDC', time: '1 day ago', status: 'completed' },
    { id: 4, type: 'send', amount: '50 USDC', to: '0x2d...6e7a', time: '2 days ago', status: 'pending' },
  ];

  const assets = [
    { name: 'Ethereum', symbol: 'ETH', balance: '1.456', value: 3892.45, change: 2.4 },
    { name: 'USD Coin', symbol: 'USDC', balance: '2,500.00', value: 2500.00, change: 0.01 },
    { name: 'Aave', symbol: 'AAVE', balance: '12.65', value: 1258.90, change: -3.2 },
    { name: 'Chainlink', symbol: 'LINK', balance: '75.32', value: 842.33, change: 5.7 },
  ];

  if (!isConnected) {
    return (
      <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center px-4">
        <Wallet className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Connect Your Wallet
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          To view your dashboard, assets, and transactions, connect your Web3 wallet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          label="Portfolio Value"
          value={`$${(8493.68).toLocaleString()}`}
          icon={<PieChart className="h-6 w-6" />}
          change={{ value: '3.2%', isPositive: true }}
        />
        <Stat
          label="ETH Balance"
          value={balance}
          icon={<Sparkles className="h-6 w-6" />}
          change={{ value: '0.5%', isPositive: true }}
        />
        <Stat
          label="Total Transactions"
          value="156"
          icon={<ArrowUpDown className="h-6 w-6" />}
        />
        <Stat
          label="Active DApps"
          value="5"
          icon={<Activity className="h-6 w-6" />}
        />
      </div>
      
      {/* Assets Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Assets</h2>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Change (24h)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {assets.map((asset, index) => (
                  <tr 
                    key={index}
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
                      {asset.balance} {asset.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                      ${asset.value.toLocaleString()}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      
      {/* Recent Transactions Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-750">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
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
                            : 'primary'
                        }
                      >
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {tx.to ? `To: ${tx.to}` : tx.from ? `From: ${tx.from}` : '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {tx.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={tx.status === 'completed' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;