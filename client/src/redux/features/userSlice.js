import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action) {
      state.value = action.payload;
    },
    signOut(state) {
      state.value = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
