import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');
    setCheckoutMessage('');

    try {
      const cartData = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));

      const response = await productService.checkout(cartData);
      
      if (response.success) {
        setCheckoutMessage(`Order placed successfully! Order ID: ${response.orderId}`);
        setTimeout(() => {
          clearCart();
          onClose();
          setCheckoutMessage('');
        }, 2000);
      } else {
        setCheckoutError(response.message || 'Checkout failed');
      }
    } catch (error) {
      setCheckoutError('Error during checkout. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.productId} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={isCheckingOut}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={isCheckingOut}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(item.productId)}
                        disabled={isCheckingOut}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: ${getCartTotal().toFixed(2)}</strong>
                </div>
                
                {checkoutMessage && (
                  <div className="checkout-success">
                    {checkoutMessage}
                  </div>
                )}
                
                {checkoutError && (
                  <div className="checkout-error">
                    {checkoutError}
                  </div>
                )}
                
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
