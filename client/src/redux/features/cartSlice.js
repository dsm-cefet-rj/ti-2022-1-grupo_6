import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  products: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const token = localStorage.getItem('TechBuy.token');

      axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart`,
        action.payload.product, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    
    removeProduct(state, action) {
      const token = localStorage.getItem('TechBuy.token');

      axios.delete(
        `${process.env.REACT_APP_BASE_URL}/cart/${action.payload.product._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCart = action.payload.cart.filter((item) => item._id !== action.payload.product._id);
      state.products = newCart;
      localStorage.setItem('TechBuy.cart', JSON.stringify(state.products));
    },
      
    updateProduct(state, action) {
      const token = localStorage.getItem('TechBuy.token');

      axios.put(
        `${process.env.REACT_APP_BASE_URL}/cart/${action.payload.product._id}`,
        {quantity: action.payload.product.quantity},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      state.products = action.payload.cart.filter((item) => item._id !== action.payload.product._id);
      state.products.push(action.payload.product);
    },

    updateCart(state, action) {
      state.products = action.payload.cart;
    }
  }
});

export const { addProduct, removeProduct, updateProduct, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
