import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShoppingBag, User, TrendingUp, Shield, QrCode } from 'lucide-react';
import { useEthers } from '../contexts/EthersContext';

const Home: React.FC = () => {
  const { isConnected } = useEthers();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Empowering Farmers with Blockchain Technology
            </h1>
            <p className="text-xl mb-8 text-green-50">
              KrishiChain connects farmers directly with buyers, eliminating middlemen and ensuring fair prices through transparent blockchain transactions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link 
                to="/farmer" 
                className="px-6 py-3 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <User className="h-5 w-5" />
                <span>Farmer Dashboard</span>
              </Link>
              <Link 
                to="/buyer" 
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Buyer Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How KrishiChain Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Sprout className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Register Your Crops</h3>
              <p className="text-gray-600">
                Farmers can easily register their crops with verifiable details like harvest date, location, and quality metrics.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <QrCode className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Transparent Traceability</h3>
              <p className="text-gray-600">
                Each crop gets a unique QR code that buyers can scan to verify its origin, quality, and complete transaction history.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Direct Transactions</h3>
              <p className="text-gray-600">
                Buyers can purchase directly from farmers with secure blockchain-based payments, eliminating middlemen completely.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Benefits of KrishiChain</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Higher Profits for Farmers</h3>
                <p className="text-gray-600">
                  By eliminating middlemen, farmers receive better prices for their produce, increasing their income by up to 40%.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Quality Assurance</h3>
                <p className="text-gray-600">
                  Buyers can verify the authenticity and quality of crops before purchase with immutable blockchain records.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Sustainable Agriculture</h3>
                <p className="text-gray-600">
                  Transparent supply chains encourage sustainable farming practices and help build consumer trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Agriculture?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join KrishiChain today and be part of the agricultural revolution powered by blockchain technology.
          </p>
          {!isConnected ? (
            <Link 
              to="/farmer" 
              className="inline-block px-6 py-3 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/farmer" 
                className="inline-block px-6 py-3 bg-white text-green-700 font-medium rounded-md shadow hover:bg-gray-100 transition-colors"
              >
                Farmer Dashboard
              </Link>
              <Link 
                to="/buyer" 
                className="inline-block px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Buyer Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;