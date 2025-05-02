import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EthersProvider } from './contexts/EthersContext';
import { CropProvider } from './contexts/CropContext';

// Pages
import Home from './pages/Home';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import CropDetails from './pages/CropDetails';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Router>
      <EthersProvider>
        <CropProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/farmer" 
                element={
                  <RequireAuth>
                    <FarmerDashboard />
                  </RequireAuth>
                } 
              />
              <Route 
                path="/buyer" 
                element={
                  <RequireAuth>
                    <BuyerDashboard />
                  </RequireAuth>
                } 
              />
              <Route path="/crop/:id" element={<CropDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </CropProvider>
      </EthersProvider>
    </Router>
  );
}

export default App;