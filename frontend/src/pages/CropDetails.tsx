import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Tag, User, ShoppingBag, Loader, ExternalLink } from 'lucide-react';
import { useCrops, Crop } from '../contexts/CropContext';
import { useEthers } from '../contexts/EthersContext';

const CropDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { crops, loading, error, buyCrop } = useCrops();
  const { account, isConnected } = useEthers();
  const [crop, setCrop] = useState<Crop | null>(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);
  
  // Find the crop by ID
  useEffect(() => {
    if (id && crops.length > 0) {
      const foundCrop = crops.find(c => c.id === parseInt(id, 10));
      setCrop(foundCrop || null);
    }
  }, [id, crops]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    } catch (e) {
      return dateString;
    }
  };
  
  // Format blockchain address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 6)}`;
  };
  
  // Handle buy crop
  const handleBuyCrop = async () => {
    if (!crop) return;
    
    setBuyLoading(true);
    setBuyError(null);
    
    try {
      await buyCrop(crop.id);
    } catch (err) {
      console.error('Error buying crop:', err);
      setBuyError('Failed to complete purchase. Please try again.');
    } finally {
      setBuyLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader className="h-8 w-8 text-green-500 animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!crop) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Crop Not Found</h2>
        <p className="text-gray-600 mb-8">The crop you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/buyer" 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Buyer Dashboard
        </Link>
      </div>
    );
  }
  
  const isOwner = account && crop.farmer.toLowerCase() === account.toLowerCase();
  const isSold = !crop.isAvailable;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <Link 
        to="/buyer" 
        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Listings
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Crop Image */}
          <div className="md:w-1/2 relative">
            <img 
              src={crop.imageUrl} 
              alt={crop.name} 
              className="w-full h-64 md:h-full object-cover"
            />
            
            {/* Status Badge */}
            {isSold ? (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-md">
                Sold
              </div>
            ) : isOwner ? (
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-md">
                Your Listing
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-md">
                Available
              </div>
            )}
          </div>
          
          {/* Crop Details */}
          <div className="md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{crop.name}</h1>
            
            <p className="text-gray-600 mb-6">{crop.description}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3" />
                <span>Harvested: {formatDate(crop.harvestDate)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3" />
                <span>{crop.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Tag className="h-5 w-5 mr-3" />
                <span>
                  {crop.quantity} {crop.unit} at <strong>{crop.price} ETH</strong>
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-3" />
                <span>Farmer: {formatAddress(crop.farmer)}</span>
              </div>
              
              {isSold && (
                <div className="flex items-center text-gray-600">
                  <ShoppingBag className="h-5 w-5 mr-3" />
                  <span>Buyer: {formatAddress(crop.buyer)}</span>
                </div>
              )}
            </div>
            
            {/* Buy Button */}
            {!isOwner && !isSold && (
              <div>
                {!isConnected ? (
                  <Link 
                    to="/" 
                    className="inline-block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center font-medium rounded-md"
                  >
                    Connect Wallet to Purchase
                  </Link>
                ) : (
                  <button
                    onClick={handleBuyCrop}
                    disabled={buyLoading}
                    className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {buyLoading ? 'Processing Purchase...' : `Buy Now for ${crop.price} ETH`}
                  </button>
                )}
                
                {buyError && (
                  <p className="mt-2 text-sm text-red-600">{buyError}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* QR Code and Blockchain Verification */}
        <div className="border-t border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product Traceability</h2>
          
          <div className="md:flex">
            <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow border border-gray-200 inline-block">
                <img 
                  src={crop.qrCode} 
                  alt="QR Code" 
                  className="w-40 h-40"
                />
                <p className="text-center text-sm text-gray-500 mt-2">Scan to verify</p>
              </div>
            </div>
            
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Blockchain Verification</h3>
              <p className="text-gray-600 mb-4">
                This crop has been permanently recorded on the blockchain. The record includes details about the crop, farmer information, harvest date, and transaction history.
              </p>
              
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Crop ID:</span>
                    <span className="font-medium text-gray-800">{crop.id}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Registered By:</span>
                    <span className="font-medium text-gray-800">{formatAddress(crop.farmer)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-gray-800">
                      {isSold ? 'Sold' : 'Available'}
                    </span>
                  </div>
                  
                  {isSold && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Purchased By:</span>
                      <span className="font-medium text-gray-800">{formatAddress(crop.buyer)}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span>View on Blockchain Explorer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;