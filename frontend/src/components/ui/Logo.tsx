import { CircleDollarSign } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className = 'h-6 w-6' }: LogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse-slow opacity-50"></div>
      <div className="relative flex items-center justify-center h-full w-full bg-white dark:bg-gray-800 rounded-full border-2 border-primary-500 dark:border-primary-400">
        <CircleDollarSign className="h-3/5 w-3/5 text-primary-600 dark:text-primary-400" />
      </div>
    </div>
  );
};

export default Logo;