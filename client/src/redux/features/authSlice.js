import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApiSlice } from './userApiSlice';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isUninitialized: true,
};

export const getUser = createAsyncThunk('user/me', async (token) => {
  const response = await fetch('http://localhost:5000/users/me', {
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
      state.isUninitialized = false;
    },
    setIsUninitializedToFalse: (state) => {
      state.isUninitialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.profile;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isUninitialized = false;
      })
      .addMatcher(
        userApiSlice.endpoints.signIn.matchFulfilled,
        (state, action) => {
          state.user = action.payload.profile;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isUninitialized = false;
        }
      );
  },
});

export const { signOut, setIsUninitializedToFalse } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
