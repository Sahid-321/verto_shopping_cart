import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const LOAD_CART = 'LOAD_CART';

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload.productId)
      };

    case UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.productId !== action.payload.productId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case LOAD_CART:
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('verto_shopping_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('verto_shopping_cart', JSON.stringify(state.items));
  }, [state.items]);

  // Calculate total price
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total number of items
  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: { productId }
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
