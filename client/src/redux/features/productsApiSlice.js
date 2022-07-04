import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    // prepareHeaders: (headers) => {
    //   headers.set('authorization', localStorage.getItem('TechBuy.token'));
    //   return headers;
    // },
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
      query: (slug) => `/products/${slug}`,
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
      invalidatesTags: [{ type: 'Products', slug: 'LIST' }],
    }),

    uploadProductImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();

        formData.append('image', file);

        return {
          url: `/products/upload-image`,
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('TechBuy.token'),
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
      invalidatesTags: (result, error, data) => {
        console.log('UPDATEEE');
        console.log(result);
        console.log(data);
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
