// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KrishiChain {
    // Structs
    struct Product {
        uint256 id;
        address farmer;
        string name;
        string description;
        uint256 price;
        uint256 quantity;
        bool isAvailable;
        uint256 timestamp;
    }

    struct Purchase {
        uint256 productId;
        address buyer;
        uint256 quantity;
        uint256 timestamp;
    }

    // State variables
    mapping(uint256 => Product) public products;
    mapping(uint256 => Purchase[]) public productHistory;
    uint256 public productCount;
    
    // Events
    event ProductListed(uint256 indexed productId, address indexed farmer, string name, uint256 price);
    event ProductPurchased(uint256 indexed productId, address indexed buyer, uint256 quantity);
    event ProductUpdated(uint256 indexed productId, uint256 newPrice, uint256 newQuantity);

    // Modifiers
    modifier onlyFarmer(uint256 _productId) {
        require(products[_productId].farmer == msg.sender, "Only the farmer can perform this action");
        _;
    }

    // Functions
    function listProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _quantity
    ) public returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        require(_quantity > 0, "Quantity must be greater than 0");

        productCount++;
        products[productCount] = Product({
            id: productCount,
            farmer: msg.sender,
            name: _name,
            description: _description,
            price: _price,
            quantity: _quantity,
            isAvailable: true,
            timestamp: block.timestamp
        });

        emit ProductListed(productCount, msg.sender, _name, _price);
        return productCount;
    }

    function purchaseProduct(uint256 _productId, uint256 _quantity) public payable {
        Product storage product = products[_productId];
        require(product.isAvailable, "Product is not available");
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_quantity <= product.quantity, "Insufficient quantity available");
        require(msg.value >= product.price * _quantity, "Insufficient payment");

        // Update product quantity
        product.quantity -= _quantity;
        if (product.quantity == 0) {
            product.isAvailable = false;
        }

        // Record purchase history
        productHistory[_productId].push(Purchase({
            productId: _productId,
            buyer: msg.sender,
            quantity: _quantity,
            timestamp: block.timestamp
        }));

        // Transfer payment to farmer
        payable(product.farmer).transfer(msg.value);

        emit ProductPurchased(_productId, msg.sender, _quantity);
    }

    function updateProduct(
        uint256 _productId,
        uint256 _newPrice,
        uint256 _newQuantity
    ) public onlyFarmer(_productId) {
        require(_newPrice > 0, "Price must be greater than 0");
        require(_newQuantity > 0, "Quantity must be greater than 0");

        Product storage product = products[_productId];
        product.price = _newPrice;
        product.quantity = _newQuantity;
        product.isAvailable = true;

        emit ProductUpdated(_productId, _newPrice, _newQuantity);
    }

    function getProductHistory(uint256 _productId) public view returns (Purchase[] memory) {
        return productHistory[_productId];
    }

    function getProduct(uint256 _productId) public view returns (
        uint256 id,
        address farmer,
        string memory name,
        string memory description,
        uint256 price,
        uint256 quantity,
        bool isAvailable,
        uint256 timestamp
    ) {
        Product memory product = products[_productId];
        return (
            product.id,
            product.farmer,
            product.name,
            product.description,
            product.price,
            product.quantity,
            product.isAvailable,
            product.timestamp
        );
    }
}
