import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3333",
  }),

  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    
    fetchWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,

    }),


    fetchAllWishlists: builder.query({
      query: () => `/wishlist`,
  
    }),

    createWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      })
    }),

    createFavorite: builder.mutation({
      query: ({id, data}) => ({
        url: `/wishlist/${id}`,
        method: "PUT",
        body: data,
      })
    }),

    deleteWishlist: builder.mutation({
      query: (id) => {
        return {
          url: `/wishlist/${id}`,
          method: "DELETE",
        };
      }
    }),

    RemoveFavorite: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `/wishlist/${id}`,
          method: "PUT",
          body: data
        };

      }
    })

  }),

});

export const { useFetchWishlistQuery,
  useFetchAllWishlistsQuery,
  useCreateWishlistMutation,
  useCreateFavoriteMutation,
  useDeleteWishlistMutation,
  useRemoveFavoriteMutation } = wishlistApi;

