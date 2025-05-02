import React from 'react';
import { Web3Provider } from './context/Web3Context';
import { ProductList } from './components/ProductList';
import { ListProduct } from './components/ListProduct';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { useWeb3 } from './context/Web3Context';

const AppContent: React.FC = () => {
  const { account, connect, disconnect } = useWeb3();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KrishiChain
          </Typography>
          {account ? (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </Typography>
              <Button color="inherit" onClick={disconnect}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <ListProduct />
        <ProductList />
      </Container>
    </Box>
  );
};

function App() {
  return (
    <Web3Provider>
      <AppContent />
    </Web3Provider>
  );
}

export default App;
