import React, { useState } from 'react';
import { PlusCircle, ListFilter, Loader, RefreshCw } from 'lucide-react';
import { useCrops } from '../contexts/CropContext';
import { useEthers } from '../contexts/EthersContext';
import CropCard from '../components/CropCard';

const FarmerDashboard: React.FC = () => {
  const { addCrop, getFarmerCrops, loading, error, refreshCrops } = useCrops();
  const { account } = useEthers();
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [formError, setFormError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Get farmer's crops
  const farmerCrops = getFarmerCrops();
  
  // Toggle add crop form
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setFormError(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Validate form
    if (!name || !harvestDate || !price || !quantity || !unit) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    try {
      // Parse price and quantity as numbers
      const priceValue = parseFloat(price);
      const quantityValue = parseInt(quantity, 10);
      
      if (isNaN(priceValue) || priceValue <= 0) {
        setFormError('Please enter a valid price');
        return;
      }
      
      if (isNaN(quantityValue) || quantityValue <= 0) {
        setFormError('Please enter a valid quantity');
        return;
      }
      
      // Add crop
      await addCrop({
        name,
        description: description || `High-quality ${name}`,
        location: location || 'Maharashtra, India',
        imageUrl: `https://source.unsplash.com/500x400/?${name.replace(' ', '+')},agriculture`,
        harvestDate,
        price: priceValue,
        quantity: quantityValue,
        unit,
      });
      
      // Reset form
      setName('');
      setDescription('');
      setLocation('');
      setHarvestDate('');
      setPrice('');
      setQuantity('');
      setUnit('kg');
      setIsFormOpen(false);
    } catch (err) {
      setFormError('Error adding crop. Please try again.');
      console.error(err);
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
          <h1 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your crop listings and track sales</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            <span>Refresh</span>
          </button>
          
          <button
            onClick={toggleForm}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Add New Crop</span>
          </button>
        </div>
      </div>
      
      {/* Add Crop Form */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Crop</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Organic Wheat"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Maharashtra, India"
                />
              </div>
              
              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Harvest Date *
                </label>
                <input
                  type="date"
                  id="harvestDate"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (ETH) *
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.001"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., 0.05"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., 100"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit *
                </label>
                <select
                  id="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="kg">kg</option>
                  <option value="ton">ton</option>
                  <option value="quintal">quintal</option>
                  <option value="dozen">dozen</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Describe your crop quality, cultivation methods, etc."
                />
              </div>
            </div>
            
            {formError && (
              <div className="mt-4 text-red-500 text-sm">{formError}</div>
            )}
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={toggleForm}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Crop'}
              </button>
            </div>
          </form>
        </div>
      )}
      
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
      
      {/* Farmer's Crops */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Crop Listings</h2>
          
          {farmerCrops.length > 0 && (
            <div className="flex items-center text-sm text-gray-500">
              <ListFilter className="h-4 w-4 mr-1" />
              <span>{farmerCrops.length} crops listed</span>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="h-8 w-8 text-green-500 animate-spin" />
          </div>
        ) : farmerCrops.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <PlusCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No crops listed yet</h3>
            <p className="text-gray-500 mb-4">Add your first crop to start selling directly to buyers.</p>
            <button
              onClick={toggleForm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Add New Crop</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerCrops.map((crop) => (
              <CropCard 
                key={crop.id} 
                crop={crop} 
                showBuyButton={false} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;