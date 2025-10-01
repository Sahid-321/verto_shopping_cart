import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <div className="App">
        <Header onCartClick={openCart} />
        <main className="main-content">
          <ProductGrid />
        </main>
        <CartModal isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </CartProvider>
  );
}

export default App;
