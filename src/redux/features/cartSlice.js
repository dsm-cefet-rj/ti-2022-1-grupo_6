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
      const hasItem = action.payload.cart.find((item) => item.id === action.payload.product.id);
      
      if (hasItem) {
        const newCart = action.payload.cart.map((item) => {
          if (item.id === action.payload.product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        axios.put(`${process.env.REACT_APP_BASE_URL}/products/${action.payload.product.id}`, 
          {...action.payload.product,
            quantity: action.payload.product.quantity + 1
          }
        )
        state.products = newCart;
      } else {
        axios.post(`${process.env.REACT_APP_BASE_URL}/products`, action.payload.product);
        state.products.push(action.payload.product);
      }
    },
    removeProduct(state, action) {
      const newCart = action.payload.cart.filter((item) => item.id !== action.payload.product.id);
      state.products = newCart;
      localStorage.setItem('TechBuy.cart', JSON.stringify(state.products));

      axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${action.payload.product.id}`);
    },
    updateProduct(state, action) {
      state.products = action.payload.cart.filter((item) => item.id !== action.payload.product.id);
      state.products.push(action.payload.product);
      axios.put(`${process.env.REACT_APP_BASE_URL}/products/${action.payload.product.id}`, 
        {...action.payload.product }
      )
    },
    updateCart(state, action) {
      state.products = action.payload.cart;
    }
  }
});

export const { addProduct, removeProduct, updateProduct, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
