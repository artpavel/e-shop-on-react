import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

// // // add
// // export const addCartItem = (cartItems, productToAdd) => {
// //   const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
// //
// //   if (existingCartItem) {
// //     return cartItems.map((cartItem) =>
// //       cartItem.id === productToAdd.id
// //         ? { ...cartItem, quantity: cartItem.quantity + 1 }
// //         : cartItem
// //     );
// //   }
// //
// //   return [...cartItems, { ...productToAdd, quantity: 1 }];
// // };
// //
// // // subtract
// // export const removeCartItem = (cartItems, cartItemToRemove) => {
// //   const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
// //
// //   if (existingCartItem.quantity === 1) {
// //     return cartItems.filter(item => item.id !== cartItemToRemove.id);
// //   }
// //
// //   if (existingCartItem) {
// //     return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id
// //       ? { ...cartItem, quantity: cartItem.quantity - 1 }
// //       : cartItem
// //     );
// //   }
// //
// // };
// //
// // // remove
// // export const clearCartItem = (cartItems, cartItemToClear) => {
// //   return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
// // };
//
// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {
//   },
//   cartItems: [],
//   cartCount: 0,
//   addItemToCart: () => {
//   },
//   removeItemFromCart: () => {
//   },
//   clearItemFromCart: () => {
//   },
//   cartTotal: 0,
// });
//
// /*    R E D U C E R     */
// const INITIAL_STATE = {
//   cartItems: [],
//   cartCount: 0,
//   cartTotal: 0,
//   isCartOpen: false,
// };
//
// // reducer
// const cartReducer = (state, action) => {
//   const { type, payload } = action;
//
//   switch (type) {
//     case 'SET_CART_ITEMS':
//       return {
//         ...state,
//         ...payload
//       };
//     case 'SET_IS_CART_OPEN':
//       return {
//         ...state,
//         isCartOpen: payload
//       };
//     default:
//       throw new Error(`Unhandled type of ${ type } in cartReducer`);
//   }
//
// };
//
//
// export const CartProvider = ({ children }) => {
//
//   // for cartReducer
//   const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
//
//   const { cartItems, isCartOpen, cartCount, cartTotal } = state;
//
//   const updateCartItemsReducer = newCartItems => {
//     const newCartCount = newCartItems.reduce((acc, item) => acc + item.quantity, 0);
//     const newCartTotal = newCartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
//
//     dispatch(createAction('SET_CART_ITEMS', {
//         cartItems: newCartItems,
//         cartTotal: newCartTotal,
//         cartCount: newCartCount
//       })
//     );
//   };
//
//   const addItemToCart = product => {
//     const newCartItems = addCartItem(cartItems, product);
//     updateCartItemsReducer(newCartItems);
//   };
//
//   const removeItemFromCart = cartItemToRemove => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//     updateCartItemsReducer(newCartItems);
//   };
//
//   const clearItemFromCart = cartItemToClear => {
//     const newCartItems = clearCartItem(cartItems, cartItemToClear);
//     updateCartItemsReducer(newCartItems);
//   };
//
//   const setIsCartOpen = bool => {
//     dispatch(createAction('SET_IS_CART_OPEN', bool));
//   };
//
//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     cartItems,
//     addItemToCart,
//     cartCount,
//     removeItemFromCart,
//     clearItemFromCart,
//     cartTotal
//   };
//
//   return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>;
// };
