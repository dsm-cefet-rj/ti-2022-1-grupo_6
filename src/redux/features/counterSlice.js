import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 14,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
      /*
      immer library makes it immutable under the hood
      redux state must be immutable
      old way - return {...state, value: 2}
      */
    },
    amountAdded(state, action) {
      state.value += action.payload;
    },
  },
});

export const { incremented, amountAdded } = counterSlice.actions;
export default counterSlice.reducer;
