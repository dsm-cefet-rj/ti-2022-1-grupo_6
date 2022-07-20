import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productName: undefined,
};

const productNameSlice = createSlice({
  name: 'productName',
  initialState,
  reducers: {
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
  },
});

export const { setProductName } = productNameSlice.actions;
export default productNameSlice.reducer;

export const selectProductName = (state) => state.productName;
