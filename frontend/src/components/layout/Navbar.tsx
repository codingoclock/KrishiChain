import { Moon, Sun, Menu, X, Wallet, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useWeb3 } from '../../context/Web3Context';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWeb3();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 md:hidden">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Logo className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  KRISHI CHAIN
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isConnected ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center p-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100"
                >
                  <div className="px-3 py-1 flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium truncate max-w-[100px]">{address}</span>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        <div className="font-medium">Connected</div>
                        <div className="text-gray-500 dark:text-gray-400 truncate">{address}</div>
                      </div>
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">
                        <div className="font-medium">Balance</div>
                        <div className="text-gray-500 dark:text-gray-400">{balance} ETH</div>
                      </div>
                      <button
                        onClick={() => {
                          disconnectWallet();
                          setIsProfileOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="ml-3 py-2 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center transition-colors"
              >
                <Wallet className="h-4 w-4 mr-2" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;