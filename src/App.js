import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientList from './components/ClientList';
import ProductList from './components/ProductList';
import ProfileList from './components/ProfileList';
import ClientDetails from './components/clientDetails';
import AnimatedBackground from './components/animatedBackground';
import Home from './components/mainpage';
import ProductDetails from './components/productDetails';
import ProfileDetails from './components/profileDetails';
import './styles/clientlist.css'


function App() {
  return (
    <div className='app'>
    <AnimatedBackground>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<ClientList />} />
        <Route path="/client/:id" element={<ClientDetails />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
      </Routes>
    </AnimatedBackground>
    </div>
  );
}

export default App;

