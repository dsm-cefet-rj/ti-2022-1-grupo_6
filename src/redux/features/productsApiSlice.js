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
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => `/products`,
      // Caching tags
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ slug }) => ({ type: 'Products', slug })),
              { type: 'Products', slug: 'LIST' },
            ]
          : [{ type: 'Products', slug: 'LIST' }],
    }),

    fetchProduct: builder.query({
      query: (slug) => `/product/${slug}`,
      transformResponse: (response, meta, arg) => {
        const [data] = response;
        return data;
      },
      providesTags: (result, err, slug) => [{ type: 'Posts', slug }],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: 'POST',
        body: data,
      }),
      // Determines which cached data should be either re-fetched or removed from the cache
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/products/${slug}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Posts', slug }],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  usePrefetch,
  useCreateProductMutation,
} = productsApi;
