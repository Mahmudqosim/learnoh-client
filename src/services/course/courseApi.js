import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/courses`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || null

      if (token) {
        headers.set("authorization", token)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    searchPublishedCourses: builder.mutation({
      query: (body) => {
        let url = `/search?keyword=${body.keyword}&page=${body.currentPage}`

        if (body.category) {
          url = `/search?keyword=${body.keyword}&page=${body.currentPage}&category=${body.category}`
        }

        return {
          url,
          method: "get",
        }
      },
    }),
    createCourse: builder.mutation({
      query: (body) => {
        return {
          url: `/by/${body.userId}`,
          method: "post",
          body: {
            name: body.name,
            description: body.description,
            category: body.category,
            image: body.image,
          },
        }
      },
    }),
    editCourse: builder.mutation({
      query: (body) => {
        return {
          url: `/${body.courseId}`,
          method: "put",
          body: {
            name: body.name,
            description: body.description,
            category: body.category,
            image: body.image,
            lessons: body.lessons,
          },
        }
      },
    }),
    getEducatorCourses: builder.mutation({
      query: (userId) => {
        return {
          url: `/by/${userId}`,
          method: "get",
        }
      },
    }),
    getCourse: builder.mutation({
      query: (courseId) => {
        return {
          url: `/${courseId}`,
          method: "get",
        }
      },
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => {
        return {
          url: `/${courseId}`,
          method: "delete",
        }
      },
    }),
    togglePublish: builder.mutation({
      query: (courseId) => {
        return {
          url: `/${courseId}/publish`,
          method: "put",
        }
      },
    }),
    newLesson: builder.mutation({
      query: (body) => {
        return {
          url: `/${body.courseId}/lesson/new`,
          method: "put",
          body: {
            title: body.title,
            content: body.content,
          },
        }
      },
    }),
  }),
})

export const {
  useCreateCourseMutation,
  useGetEducatorCoursesMutation,
  useGetCourseMutation,
  useNewLessonMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
  useTogglePublishMutation,
  useSearchPublishedCoursesMutation,
} = courseApi
