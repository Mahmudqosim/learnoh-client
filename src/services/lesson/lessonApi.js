import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/courses`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || null

      if (token) {
        headers.set("authorization", token)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
  }),
})

/* export const { } =
  lessonApi
 */