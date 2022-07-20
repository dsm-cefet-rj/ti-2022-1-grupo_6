import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
      query: (data) => {
        const token = localStorage.getItem('TechBuy.token');

        return {
          url: `/products`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Products', slug: 'LIST' }],
    }),

    uploadProductImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();

        formData.append('image', file);

        const token = localStorage.getItem('TechBuy.token');

        return {
          url: `/products/upload-image`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        };
      },
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('TechBuy.token')}`,
        },
        body: data,
      }),
      invalidatesTags: (result, error, data) => {
        // console.log('UPDATEE invalidatesTags');
        // console.log(result);
        // console.log(data);
        return [{ type: 'Products' }];
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('TechBuy.token')}`,
          },
        };
      },
      invalidatesTags: (result, error, data) => {
        return [{ type: 'Products' }];
      },
    }),

    postQuestion: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/products/${id}/questions`,
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('TechBuy.token')}`,
          },
        };
      },
      invalidatesTags: (result, error, data) => {
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
  usePostQuestionMutation,
} = productsApi;
