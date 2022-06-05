import { createContext, useState, useEffect } from 'react';

// add
export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// subtract
export const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if(existingCartItem.quantity === 1){
    return cartItems.filter(item => item.id !== cartItemToRemove.id)
  }

  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

}

// remove
export const clearCartItem = (cartItems, cartItemToClear) =>{
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {
  },
  cartItems: [],
  cartCount: 0,
  addItemToCart: () => {
  },
  removeItemFromCart: () => {
  },
  clearItemFromCart: () => {
  },
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // quantity
  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  // total price
  useEffect(() => {
    const newCartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = product =>
    setCartItems(addCartItem(cartItems, product));

  const removeItemFromCart = cartItemToRemove =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const clearItemFromCart = cartItemToClear =>
    setCartItems(clearCartItem(cartItems, cartItemToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>;
};
