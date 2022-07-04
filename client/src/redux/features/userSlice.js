import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const signInUser = createAsyncThunk(
  'user/signin',
  async (credentials) => {
    const response = await fetch('http://localhost:5000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
