import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  counter: 0,    
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); 
      state.counter += 1; 
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(id => id !== action.payload);
      state.counter -= 1; 

    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
