import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { getContract } from '../config/contract';
import { ethers } from 'ethers';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';

export const ListProduct: React.FC = () => {
    const { provider } = useWeb3();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!provider) return;

        try {
            const contract = getContract(provider);
            const priceInWei = ethers.utils.parseEther(price);
            const quantityNum = parseInt(quantity);

            const tx = await contract.listProduct(
                name,
                description,
                priceInWei,
                quantityNum
            );
            await tx.wait();

            // Clear form
            setName('');
            setDescription('');
            setPrice('');
            setQuantity('');

            alert('Product listed successfully!');
        } catch (error) {
            console.error('Error listing product:', error);
            alert('Error listing product. Please try again.');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    List Your Product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        required
                        multiline
                        rows={4}
                    />
                    <TextField
                        fullWidth
                        label="Price (ETH)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        margin="normal"
                        required
                        type="number"
                        inputProps={{ step: "0.01" }}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        margin="normal"
                        required
                        type="number"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        List Product
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}; 