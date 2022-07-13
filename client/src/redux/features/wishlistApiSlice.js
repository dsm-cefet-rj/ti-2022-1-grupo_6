import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    
    fetchWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,
      providesTags: ["Wishlist"]
    }),


    fetchAllWishlists: builder.query({
      query: () => {
        const token = localStorage.getItem('TechBuy.token');

        return {
          url: `/wishlist`,
          method: "GET",
          headers: {Authorization: `Bearer ${token}`}
        }

      },
      providesTags: ["Wishlist"]
  
    }),

    createWishlist: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem('TechBuy.token');

        return {
        url: "/wishlist",
        method: "POST",
        body: data,
        headers: {Authorization: `Bearer ${token}`}
        }
      },
      invalidatesTags: ['Wishlist']
    }),

    createFavorite: builder.mutation({
      query: ({id, data}) => {
        const token = localStorage.getItem('TechBuy.token');

        return {
        url: `/wishlist/${id}`,
        method: "PUT",
        body: data,
        headers: {Authorization: `Bearer ${token}`}
        }
      },
      invalidatesTags: ['Wishlist']
    }),

    deleteWishlist: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem('TechBuy.token');

        return {
          url: `/wishlist/${id}`,
          method: "DELETE",
          headers: {Authorization: `Bearer ${token}`}
        };
      },
      invalidatesTags: ['Wishlist']
    }),

    RemoveFavorite: builder.mutation({
      query: ({id, data}) => {
        const token = localStorage.getItem('TechBuy.token');

        return {
          url: `/wishlist/del/${id}`,
          method: "PUT",
          body: data,
          headers: {Authorization: `Bearer ${token}`}
        };

      },
      invalidatesTags: ['Wishlist']
    })

  }),

});

export const { useFetchWishlistQuery,
  useFetchAllWishlistsQuery,
  useCreateWishlistMutation,
  useCreateFavoriteMutation,
  useDeleteWishlistMutation,
  useRemoveFavoriteMutation } = wishlistApi;

