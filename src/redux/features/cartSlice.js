import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: {
    name: "teste"
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state) {
      state.value++;
    },
    removeProduct(state, action) {
      state.value += action.payload;
    },
    updateProduct(state, action) {
        state.value += action.payload;
    }
  }
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;
