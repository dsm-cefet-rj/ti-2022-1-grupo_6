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
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ slug }) => ({ type: 'Products', slug })),
              { type: 'Products', slug: 'LIST' },
            ]
          : [{ type: 'Products', slug: 'LIST' }];
      },
    }),

    fetchProduct: builder.query({
      query: (slug) => `/product/${slug}`,
      transformResponse: (response, meta, arg) => {
        const [data] = response;
        return data;
      },
      providesTags: (result, err, slug) => {
        return [{ type: 'Products', slug: slug }];
      },
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: 'POST',
        body: data,
      }),
      // Determines which cached data should be either re-fetched or removed from the cache
      invalidatesTags: [{ type: 'Products', slug: 'LIST' }],
    }),

    uploadProductImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();

        formData.append('image', file);

        return {
          url: `/products/upload-image`,
          method: 'POST',
          headers: (headers) => {
            headers.set('Content-Type', 'multipart/form-data');
            return headers;
          },
          body: formData,
        };
      },
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      // Invalidates all queries that subscribe to this Product `id` only.
      invalidatesTags: (result, error, { data }) => {
        return [{ type: 'Products' }];
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, { data }) => {
        return [{ type: 'Products' }];
      },
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  usePrefetch,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
