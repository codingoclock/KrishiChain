import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
        <AlertCircle className="h-8 w-8" />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        404 - Page Not Found
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Button 
        size="lg"
        leftIcon={<Home className="h-5 w-5" />}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;