import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignInModalOpen: false,
};

const signInModalSlice = createSlice({
  name: 'signInModal',
  initialState,
  reducers: {
    setIsSignInModalOpen: (state, action) => {
      state.isSignInModalOpen = action.payload;
    },
  },
});

export const { setIsSignInModalOpen } = signInModalSlice.actions;
export default signInModalSlice.reducer;

export const selectSignInModal = (state) => state.signInModal;
