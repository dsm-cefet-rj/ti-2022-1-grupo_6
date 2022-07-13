import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApiSlice } from './userApiSlice';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const getUser = createAsyncThunk('user/me', async (token) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.profile;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(
        userApiSlice.endpoints.signIn.matchFulfilled,
        (state, action) => {
          state.user = action.payload.profile;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      );
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
