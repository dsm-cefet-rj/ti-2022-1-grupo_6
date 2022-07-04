import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import favoriteReducer from './features/favoriteSlice';
import { productsApi } from './features/productsApiSlice';
import { userApiSlice } from './features/userApiSlice';
import { wishlistApi } from './features/wishlistApiSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      userApiSlice.middleware
    ),
});
