import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const authApi = createApi({
  tagTypes: ["AuthUser"],
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://learnoapi.herokuapp.com/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || null

      if (token) {
        headers.set("authorization", token)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          method: "post",
          body,
        }
      },
      invalidatesTags: ["AuthUser"],
    }),
    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: "/register",
          method: "post",
          body,
        }
      },
      invalidatesTags: ["AuthUser"],
    }),
    loadUser: builder.query({
      query: () => "/me",
      providesTags: ["AuthUser"],
    }),
    updateUser: builder.mutation({
      query: (body) => {
        return {
          url: "/me/update",
          method: "put",
          body,
        }
      },
      invalidatesTags: ["AuthUser"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          url: "/password/forgot",
          method: "post",
          body,
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `/password/reset/${body.token}`,
          method: "put",
          body: {
            password: body.password,
            confirmPassword: body.confirmPassword,
          },
        }
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: `/password/update`,
          method: "put",
          body,
        }
      },
      invalidatesTags: ["AuthUser"],
    }),
  }),
})

export const {
  useLoginUserMutation,
  useLoadUserQuery,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
} = authApi
