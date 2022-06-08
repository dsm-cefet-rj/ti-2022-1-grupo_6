import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

if (localStorage.getItem('TechBuy.cart')) {
  initialState.products = JSON.parse(localStorage.getItem('TechBuy.cart'));
}

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

        localStorage.setItem('TechBuy.cart', JSON.stringify(newCart));
        state.products = newCart;
      } else {
        state.products.push(action.payload.product);
      }
    },
    removeProduct(state, action) {
      const newCart = action.payload.cart.filter((item) => item.id !== action.payload.product.id);
      state.products = newCart;
      localStorage.setItem('TechBuy.cart', JSON.stringify(state.products));
    },
    updateProduct(state, action) {
      state.products = action.payload.cart.filter((item) => item.id !== action.payload.product.id);
      state.products.push(action.payload.product);
      localStorage.setItem('TechBuy.cart', JSON.stringify(state.products));
    }
  }
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;
