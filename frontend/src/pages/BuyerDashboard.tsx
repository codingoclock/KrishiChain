import React, { useState } from 'react';
import { Search, Filter, Loader, RefreshCw } from 'lucide-react';
import { useCrops } from '../contexts/CropContext';
import CropCard from '../components/CropCard';

const BuyerDashboard: React.FC = () => {
  const { crops, loading, error, buyCrop, refreshCrops } = useCrops();
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  
  // Filter for available crops only
  const availableCrops = crops.filter(crop => crop.isAvailable);
  
  // Search functionality
  const filteredCrops = availableCrops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle crop purchase
  const handleBuyCrop = async (id: number) => {
    try {
      await buyCrop(id);
    } catch (err) {
      console.error('Error buying crop:', err);
    }
  };
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshCrops();
    setRefreshing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Buyer Dashboard</h1>
          <p className="text-gray-600">Browse and purchase crops directly from farmers</p>
        </div>
        
        <button 
          onClick={handleRefresh}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          <span>Refresh Listings</span>
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search crops by name, description, or location"
            />
          </div>
          
          {/* Filter Button (for future implementation) */}
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Crops Listing */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Available Crops</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="h-8 w-8 text-green-500 animate-spin" />
          </div>
        ) : filteredCrops.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            {searchTerm ? (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No crops found</h3>
                <p className="text-gray-500">
                  No crops match your search "{searchTerm}". Try a different search term or check back later.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No crops available</h3>
                <p className="text-gray-500">
                  There are currently no crops available for purchase. Please check back later.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <CropCard 
                key={crop.id} 
                crop={crop} 
                onBuy={() => handleBuyCrop(crop.id)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;