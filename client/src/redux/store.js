import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import favoriteReducer from './features/favoriteSlice';
import { productsApi } from './features/productsApiSlice';
import { userApiSlice } from './features/userApiSlice';
import { wishlistApi } from './features/wishlistApiSlice';
import authReducer from './features/authSlice';
import signInModalSliceReducer from './features/signInModalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signInModal: signInModalSliceReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      userApiSlice.middleware,
      wishlistApi.middleware
    ),
});
