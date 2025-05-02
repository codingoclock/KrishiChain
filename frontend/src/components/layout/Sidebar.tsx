import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Layers, History, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Assets', path: '/assets', icon: Layers },
    { name: 'History', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 transform bg-white dark:bg-gray-800 shadow-lg
          transition-transform duration-300 ease-in-out md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">DeFi Portal</h2>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition-colors
                      ${isActive(item.path)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        closeSidebar();
                      }
                    }}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;