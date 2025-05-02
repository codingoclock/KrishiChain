import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ChevronRight, Shield, Zap, BarChart, Globe } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { isConnected, connectWallet } = useWeb3();

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        <div className="absolute inset-0 opacity-30 dark:opacity-20 -z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-400 to-transparent"></div>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-400 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary-400 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="block">Revolutionizing Agriculture</span>
              <span className="block mt-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                With Blockchain
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Empowering farmers with decentralized agricultural solutions. Manage crops, track supply chains, and access agricultural finance—all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isConnected ? (
                <Link to="/dashboard">
                  <Button size="lg" rightIcon={<ChevronRight />}>
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button size="lg" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )}
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Agricultural Innovation Meets Blockchain
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Everything farmers need in the digital age
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Shield className="h-6 w-6" />,
              title: 'Secure Tracking',
              description: 'End-to-end supply chain tracking with blockchain verification',
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: 'Smart Contracts',
              description: 'Automated agreements and instant settlements for farmers',
            },
            {
              icon: <BarChart className="h-6 w-6" />,
              title: 'Market Analytics',
              description: 'Real-time agricultural market data and insights',
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: 'Global Access',
              description: 'Connect with buyers and sellers worldwide',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to transform agriculture?
              </h2>
              <p className="mt-2 text-lg text-primary-100">
                Join thousands of farmers already using blockchain technology.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {isConnected ? (
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-primary-700"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-primary-700"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;