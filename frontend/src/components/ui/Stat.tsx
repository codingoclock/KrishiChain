import React from 'react';

interface StatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

const Stat = ({ label, value, icon, change, className = '' }: StatProps) => {
  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {label}
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
          
          {change && (
            <p className="mt-2 flex items-center text-sm">
              <span
                className={
                  change.isPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }
              >
                {change.isPositive ? '↑' : '↓'} {change.value}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">from previous period</span>
            </p>
          )}
        </div>
        
        {icon && (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stat;