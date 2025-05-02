import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Tag, QrCode } from 'lucide-react';
import { Crop } from '../contexts/CropContext';
import { useEthers } from '../contexts/EthersContext';

interface CropCardProps {
  crop: Crop;
  onBuy?: () => void;
  showBuyButton?: boolean;
}

const CropCard: React.FC<CropCardProps> = ({ 
  crop, 
  onBuy,
  showBuyButton = true
}) => {
  const { account } = useEthers();
  const isOwner = account && crop.farmer.toLowerCase() === account.toLowerCase();
  const isSold = !crop.isAvailable;

  // Function to format dates for better display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    } catch (e) {
      return dateString; // If parsing fails, return the original string
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Crop Image */}
      <img 
        src={crop.imageUrl} 
        alt={crop.name} 
        className="w-full h-48 object-cover"
      />
      
      {/* Status Badge */}
      <div className="relative">
        {isSold ? (
          <div className="absolute top-0 right-0 transform -translate-y-full bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
            Sold
          </div>
        ) : isOwner ? (
          <div className="absolute top-0 right-0 transform -translate-y-full bg-blue-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
            Your Listing
          </div>
        ) : (
          <div className="absolute top-0 right-0 transform -translate-y-full bg-green-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
            Available
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{crop.name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{crop.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span className="text-sm">Harvested: {formatDate(crop.harvestDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{crop.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Tag className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {crop.quantity} {crop.unit} at {crop.price} ETH
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <Link 
            to={`/crop/${crop.id}`}
            className="inline-flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <QrCode className="h-4 w-4" />
            <span>View Details</span>
          </Link>
          
          {showBuyButton && !isOwner && !isSold && (
            <button
              onClick={onBuy}
              className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropCard;