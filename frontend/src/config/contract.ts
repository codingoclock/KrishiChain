import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Replace with your deployed contract address

export const CONTRACT_ABI = [
    "function listProduct(string memory _name, string memory _description, uint256 _price, uint256 _quantity) public returns (uint256)",
    "function purchaseProduct(uint256 _productId, uint256 _quantity) public payable",
    "function updateProduct(uint256 _productId, uint256 _newPrice, uint256 _newQuantity) public",
    "function getProductHistory(uint256 _productId) public view returns (tuple(uint256 productId, address buyer, uint256 quantity, uint256 timestamp)[])",
    "function getProduct(uint256 _productId) public view returns (uint256 id, address farmer, string memory name, string memory description, uint256 price, uint256 quantity, bool isAvailable, uint256 timestamp)",
    "function productCount() public view returns (uint256)",
    "function products(uint256) public view returns (uint256 id, address farmer, string memory name, string memory description, uint256 price, uint256 quantity, bool isAvailable, uint256 timestamp)"
];

export const getContract = (provider: ethers.providers.Web3Provider) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner());
}; 