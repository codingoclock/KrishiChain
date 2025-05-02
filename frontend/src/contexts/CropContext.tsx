import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useEthers } from './EthersContext';

export interface Crop {
  id: number;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  harvestDate: string;
  price: number;
  quantity: number;
  unit: string;
  farmer: string;
  buyer: string;
  qrCode: string;
  isAvailable: boolean;
}

interface CropContextType {
  crops: Crop[];
  loading: boolean;
  error: string | null;
  addCrop: (crop: Omit<Crop, 'id' | 'qrCode' | 'farmer' | 'buyer' | 'isAvailable'>) => Promise<void>;
  buyCrop: (id: number) => Promise<void>;
  getFarmerCrops: () => Crop[];
  refreshCrops: () => Promise<void>;
}

const CropContext = createContext<CropContextType>({
  crops: [],
  loading: false,
  error: null,
  addCrop: async () => {},
  buyCrop: async () => {},
  getFarmerCrops: () => [],
  refreshCrops: async () => {},
});

export const useCrops = () => useContext(CropContext);

interface CropProviderProps {
  children: ReactNode;
}

export const CropProvider: React.FC<CropProviderProps> = ({ children }) => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { contract, account, isConnected } = useEthers();

  // Fetch all crops from the blockchain
  const fetchCrops = async () => {
    if (!contract || !isConnected) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const cropCount = await contract.cropCount();
      const fetchedCrops: Crop[] = [];
      
      for (let i = 1; i <= cropCount; i++) {
        const crop = await contract.getCrop(i);
        
        // In a real implementation, you'd fetch additional metadata from IPFS or a database
        // For this demo, we're creating mock data that would normally come from those sources
        fetchedCrops.push({
          id: Number(crop.id),
          name: crop.name,
          description: `High-quality ${crop.name} harvested on ${crop.harvestDate}`,
          location: 'Maharashtra, India', // This would come from metadata
          imageUrl: `https://source.unsplash.com/500x400/?${crop.name.replace(' ', '+')},agriculture`,
          harvestDate: crop.harvestDate,
          price: Number(ethers.formatEther(crop.price)),
          quantity: 100, // This would come from metadata
          unit: 'kg', // This would come from metadata
          farmer: crop.farmer,
          buyer: crop.buyer,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            `https://krishichain.example/crop/${Number(crop.id)}`
          )}`,
          isAvailable: crop.buyer === '0x0000000000000000000000000000000000000000',
        });
      }
      
      setCrops(fetchedCrops);
    } catch (err) {
      console.error('Error fetching crops:', err);
      setError('Failed to load crops. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add a new crop
  const addCrop = async (cropData: Omit<Crop, 'id' | 'qrCode' | 'farmer' | 'buyer' | 'isAvailable'>) => {
    if (!contract || !isConnected) {
      setError('Please connect your wallet first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In production, you'd upload metadata to IPFS first and get a hash
      
      // Convert price from ETH to Wei
      const priceInWei = ethers.parseEther(cropData.price.toString());
      
      // Call the smart contract
      const tx = await contract.registerCrop(
        cropData.name,
        cropData.harvestDate,
        priceInWei
      );
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Refresh the crops list
      await fetchCrops();
    } catch (err) {
      console.error('Error adding crop:', err);
      setError('Failed to add crop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Buy a crop
  const buyCrop = async (id: number) => {
    if (!contract || !isConnected) {
      setError('Please connect your wallet first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const crop = crops.find(c => c.id === id);
      if (!crop) {
        throw new Error('Crop not found');
      }
      
      // Convert price from ETH to Wei
      const priceInWei = ethers.parseEther(crop.price.toString());
      
      // Call the smart contract with the value
      const tx = await contract.buyCrop(id, { value: priceInWei });
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Refresh the crops list
      await fetchCrops();
    } catch (err) {
      console.error('Error buying crop:', err);
      setError('Failed to buy crop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get crops listed by the current farmer
  const getFarmerCrops = () => {
    if (!account) return [];
    return crops.filter(crop => crop.farmer.toLowerCase() === account.toLowerCase());
  };

  // Refresh crops list
  const refreshCrops = async () => {
    await fetchCrops();
  };

  // Initial fetch when contract is available
  useEffect(() => {
    if (contract && isConnected) {
      fetchCrops();
    }
  }, [contract, isConnected]);

  return (
    <CropContext.Provider
      value={{
        crops,
        loading,
        error,
        addCrop,
        buyCrop,
        getFarmerCrops,
        refreshCrops,
      }}
    >
      {children}
    </CropContext.Provider>
  );
};