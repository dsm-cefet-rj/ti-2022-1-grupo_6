import { configureStore } from '@reduxjs/toolkit';
// configureStore setups redux devtools, adds thunk middleware, calls createStore
import counterReducer from './features/counterSlice';
import { productsApi } from './features/productsApiSlice';

export const store = configureStore({
  // automatically uses combineReducers
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // things that we have with SWR from Nextjs and React-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
