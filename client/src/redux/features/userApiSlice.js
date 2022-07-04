import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    // prepareHeaders: (headers) => {
    //   headers.set('authorization', localStorage.getItem('TechBuy.token'));
    //   return headers;
    // },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => {
        return {
          url: `/users/me`,
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('TechBuy.token'),
          },
        };
      },
      providesTags: [{ type: 'User' }],
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: `/users/signup`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: `/users/signin`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),
  }),
});

export const { useFetchUserQuery, useSignInMutation, useSignUpMutation } =
  userApiSlice;
