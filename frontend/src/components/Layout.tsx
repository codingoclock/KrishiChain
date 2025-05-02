import React, { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sprout, Home, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useEthers } from '../contexts/EthersContext';
import ConnectWallet from './ConnectWallet';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isConnected, account } = useEthers();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Format account address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">KrishiChain</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`
              }
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </NavLink>
            
            <NavLink 
              to="/farmer" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`
              }
            >
              <User className="h-4 w-4" />
              <span>Farmer Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/buyer" 
              className={({ isActive }) => 
                `flex items-center space-x-1 text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-500'}`
              }
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Buyer Dashboard</span>
            </NavLink>
            
            <ConnectWallet />
            
            {isConnected && account && (
              <div className="text-sm font-medium text-gray-500">
                {formatAddress(account)}
              </div>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-3 space-y-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-green-50 text-green-600' : 'text-gray-600'}`
                }
                onClick={closeMenu}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </NavLink>
              
              <NavLink 
                to="/farmer" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-green-50 text-green-600' : 'text-gray-600'}`
                }
                onClick={closeMenu}
              >
                <User className="h-5 w-5" />
                <span>Farmer Dashboard</span>
              </NavLink>
              
              <NavLink 
                to="/buyer" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 p-2 rounded-md ${isActive ? 'bg-green-50 text-green-600' : 'text-gray-600'}`
                }
                onClick={closeMenu}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Buyer Dashboard</span>
              </NavLink>
              
              <div className="p-2">
                <ConnectWallet />
              </div>
              
              {isConnected && account && (
                <div className="p-2 text-sm font-medium text-gray-500">
                  {formatAddress(account)}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sprout className="h-6 w-6 text-green-400" />
              <span className="text-lg font-bold">KrishiChain</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} KrishiChain - Empowering farmers with blockchain technology
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;