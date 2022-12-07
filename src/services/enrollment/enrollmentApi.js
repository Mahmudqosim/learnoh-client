import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const enrollmentApi = createApi({
  tagTypes: ['Enrollment'],
  reducerPath: "enrollmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/enrollment`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || null

      if (token) {
        headers.set("authorization", token)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    newEnrollment: builder.mutation({
      query: (courseId) => {
        return {
          url: `/new/${courseId}`,
          method: "get",
        }
      },
      invalidatesTags: ['Enrollment'],
    }),
    getEnrollment: builder.mutation({
      query: (enrollmentId) => {
        return {
          url: `/${enrollmentId}`,
          method: "get",
        }
      },
    }),
    completeEnrollment: builder.mutation({
      query: (enrollmentId) => {
        return {
          url: `/complete/${enrollmentId}`,
          method: "put",
        }
      },
    }),
    listEnrolled: builder.query({
      query: () => `/enrolled`,
      providesTags: ['Enrollment'],
    }),
    getEnrollmentStats: builder.mutation({
      query: (courseId) => {
        return {
          url: `/stats/${courseId}`,
          method: "get",
        }
      },
    }),
    markAsComplete: builder.mutation({
      query: (body) => {
        return {
          url: `/complete/${body.enrollmentId}`,
          method: 'put',
          body: {
            complete: body.complete,
            lessonStatusId: body.lessonStatusId,
            courseCompleted: body.courseCompleted,
          }
        }
      }
    })
  }),
})

export const {
  useCompleteEnrollmentMutation,
  useGetEnrollmentStatsMutation,
  useGetEnrollmentMutation,
  useNewEnrollmentMutation,
  useListEnrolledQuery,
  useMarkAsCompleteMutation
} = enrollmentApi
