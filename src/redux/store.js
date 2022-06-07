import { configureStore } from '@reduxjs/toolkit';
// configureStore setups redux devtools, adds thunk middleware, calls createStore
import counterReducer from './features/counterSlice';
import cartReducer from './features/cartSlice';
import favoriteReducer from'./features/favoriteSlice';
import { productsApi } from './features/productsApiSlice';

export const store = configureStore({
  // automatically uses combineReducers
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // things that we have with SWR from Nextjs and React-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
