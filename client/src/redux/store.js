import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import favoriteReducer from'./features/favoriteSlice';
import { productsApi } from './features/productsApiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
