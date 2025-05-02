import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getContract } from '../config/contract';
import { ethers } from 'ethers';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

interface Product {
    id: number;
    farmer: string;
    name: string;
    description: string;
    price: string;
    quantity: number;
    isAvailable: boolean;
    timestamp: number;
}

export const ProductList: React.FC = () => {
    const { provider, account } = useWeb3();
    const [products, setProducts] = useState<Product[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [purchaseQuantity, setPurchaseQuantity] = useState('');

    const loadProducts = async () => {
        if (!provider) return;
        const contract = getContract(provider);
        const count = await contract.productCount();
        const loadedProducts: Product[] = [];

        for (let i = 1; i <= count; i++) {
            const product = await contract.getProduct(i);
            loadedProducts.push({
                id: product.id.toNumber(),
                farmer: product.farmer,
                name: product.name,
                description: product.description,
                price: ethers.utils.formatEther(product.price),
                quantity: product.quantity.toNumber(),
                isAvailable: product.isAvailable,
                timestamp: product.timestamp.toNumber(),
            });
        }
        setProducts(loadedProducts);
    };

    useEffect(() => {
        if (provider) {
            loadProducts();
        }
    }, [provider]);

    const handlePurchase = async () => {
        if (!provider || !selectedProduct) return;
        try {
            const contract = getContract(provider);
            const price = ethers.utils.parseEther(selectedProduct.price);
            const quantity = parseInt(purchaseQuantity);
            
            const tx = await contract.purchaseProduct(selectedProduct.id, quantity, {
                value: price.mul(quantity),
            });
            await tx.wait();
            
            setOpenDialog(false);
            setPurchaseQuantity('');
            loadProducts();
        } catch (error) {
            console.error('Error purchasing product:', error);
            alert('Error purchasing product. Please try again.');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Available Products
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
                {products.map((product) => (
                    <Card key={product.id}>
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography color="textSecondary">{product.description}</Typography>
                            <Typography>Price: {product.price} ETH</Typography>
                            <Typography>Quantity Available: {product.quantity}</Typography>
                            <Typography>Farmer: {product.farmer}</Typography>
                            {product.isAvailable && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setOpenDialog(true);
                                    }}
                                    sx={{ mt: 2 }}
                                >
                                    Purchase
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Purchase Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={purchaseQuantity}
                        onChange={(e) => setPurchaseQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handlePurchase} color="primary">
                        Confirm Purchase
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}; 