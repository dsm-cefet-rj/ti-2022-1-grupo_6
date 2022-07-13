import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
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

export const { useSignInMutation, useSignUpMutation } = userApiSlice;
