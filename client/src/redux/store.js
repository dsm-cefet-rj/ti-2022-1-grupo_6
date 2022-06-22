import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import favoriteReducer from'./features/favoriteSlice';
import { productsApi } from './features/productsApiSlice';
import { wishlistApi } from './features/wishlistApiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
