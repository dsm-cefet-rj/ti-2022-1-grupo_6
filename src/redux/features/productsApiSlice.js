import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
// console.log('Hereeeeeeeeeee');
// console.log(localStorage.getItem('token.example'));

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3333',
    /*
      later, add the prepareHeaders property passing the JWT:

      prepareHeaders: (headers) => {
        headers.set('authorization', token)
        return headers
      }
      */
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (limit = 4) => `/products?_limit=${limit}`,
    }),
    fetchProduct: builder.query({
      query: (slug) => `/product/${slug}`,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  usePrefetch,
  useCreateProductMutation,
} = productsApi;
