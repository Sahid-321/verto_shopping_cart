import React from 'react';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = ({ onCartClick }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Verto Shopping</h1>
        <button className="cart-button" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Cart</span>
          {itemCount > 0 && (
            <span className="cart-badge">{itemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
