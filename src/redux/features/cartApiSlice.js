import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3030',
    /*
      later, add the prepareHeaders property passing the JWT:

      prepareHeaders: (headers) => {
        headers.set('authorization', token)
        return headers
      }
      */
  }),
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: (limit = 30) => `/products?_limit=${limit}`,
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: 'POST',
        body: data,
      })
    }),
    updateProductCart: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteProductCart: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE"
      })
    })
  }),
});

export const {
  useFetchCartQuery,
  usePrefetch,
  useAddToCartMutation,
  useUpdateProductCartMutation,
  useDeleteProductCartMutation
} = cartApi;
