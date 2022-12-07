import { useParams, Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  PencilIcon,
  PlusCircleIcon,
  ViewBoardsIcon,
} from "@heroicons/react/outline"
import { toast } from "react-toastify"

import {
  useDeleteCourseMutation,
  useGetCourseMutation,
  useTogglePublishMutation,
} from "../../services/course/courseApi"
import Loader from "../../components/Loader"
import { useAppSelector } from "../../store/hooks"
import { authSelector } from "../../services/auth/authSlice"
import DeleteCourse from "./components/DeleteCourse"
import PublishCourseModal from "./components/PublishCourseModal"
import {
  useListEnrolledQuery,
  useNewEnrollmentMutation,
} from "../../services/enrollment/enrollmentApi"

const InstructorCourse = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPOpen, setIsPOpen] = useState(false)
  const [enrollmentId, setEnrollmentId] = useState(null)
  const { user } = useAppSelector(authSelector)
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  // const resolvedPath = useResolvedPath()

  //Get Course query
  const [getCourse, { isSuccess, isLoading, isError, data: course, error }] =
    useGetCourseMutation()

  // Publish and Unpublish course query
  const [
    togglePublish,
    {
      isSuccess: isTogglePublishSuccess,
      isLoading: isTogglePublishLoading,
      isError: isTogglePublishError,
      data: togglePublishData,
      error: togglePublishError,
    },
  ] = useTogglePublishMutation()

  // Delete course query
  const [
    deleteCourse,
    {
      isSuccess: isDeleteCourseSuccess,
      isLoading: isDeleteCourseLoading,
      isError: isDeleteCourseError,
      data: deleteCourseData,
      error: deleteCourseError,
    },
  ] = useDeleteCourseMutation()

  const [
    enroll,
    {
      isSuccess: isEnrollSuccess,
      isLoading: isEnrollLoading,
      isError: isEnrollError,
      data: enrollData,
      error: enrollError,
    },
  ] = useNewEnrollmentMutation()

  const {
    data: enrollments,
    // isLoading: isListEnrolledLoading,
    isError: isListEnrolledError,
    isSuccess: isListEnrolledSuccess,
    error: listEnrolledError,
  } = useListEnrolledQuery("")

  // Handles modals state **
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closePModal() {
    setIsPOpen(false)
  }

  function openPModal() {
    setIsPOpen(true)
  }
  // ** //

  const handleDeleteCourse = async () => {
    closeModal()

    if (!courseId) return

    await deleteCourse(courseId)
  }

  const handleTogglePublish = async () => {
    closePModal()

    if (!courseId) return

    await togglePublish(courseId)
  }

  const handleEnrollment = async (e) => {
    if (!courseId) return

    await enroll(courseId)
  }

  useEffect(() => {
    if (!courseId) return

    getCourse(courseId)
  }, [courseId, getCourse])

  useEffect(() => {
    if (!course || !user) return
    if (!course.course.published && user._id !== course.course.instructor._id)
      navigate("/")
  }, [course, location, navigate, user])

  useEffect(() => {
    if (isListEnrolledSuccess) {
      const enrollmentMap = enrollments.enrollments.reduce(
        (prev, enrollment) => {
          return {
            ...prev,
            [enrollment.course._id]: enrollment._id,
          }
        },
        {}
      )

      if (!courseId) return

      if (Object.keys(enrollmentMap).includes(courseId)) {
        setEnrollmentId(enrollmentMap[courseId])
      }

      console.log(enrollmentId)
    }
  }, [
    isListEnrolledSuccess,
    enrollments,
    courseId,
    enrollmentId,
    setEnrollmentId,
  ])

  useEffect(() => {
    if (isListEnrolledError) {
      console.log(listEnrolledError)
      if (listEnrolledError.data) {
        toast.error(listEnrolledError.data.message)
      } else {
        toast.error(listEnrolledError.error)
      }
    }
  }, [isListEnrolledError, listEnrolledError])

  useEffect(() => {
    if (isSuccess) {
      console.log(course)
    }
  }, [isSuccess, course])

  useEffect(() => {
    if (isError) {
      console.log(error)
      if (error.data) {
        toast.error(error.data.message)
      } else {
        toast.error(error.error)
      }
    }
  }, [isError, error])

  useEffect(() => {
    if (isEnrollSuccess) {
      console.log(enrollData)
    }
  }, [isEnrollSuccess, enrollData])

  useEffect(() => {
    if (isEnrollError) {
      console.log(enrollError)
      if (enrollError.data) {
        toast.error(enrollError.data.message)
      } else {
        toast.error(enrollError.error)
      }
    }
  }, [isEnrollError, enrollError])

  useEffect(() => {
    if (isDeleteCourseSuccess) {
      console.log(deleteCourseData)

      toast.success("Course has been deleted.")
      navigate("/teach")
    }
  }, [isDeleteCourseSuccess, deleteCourseData, navigate])

  useEffect(() => {
    if (isDeleteCourseError) {
      console.log(deleteCourseError)
      if (deleteCourseError.data) {
        toast.error(deleteCourseError.data.message)
      } else {
        toast.error(deleteCourseError.error)
      }
    }
  }, [isDeleteCourseError, deleteCourseError])

  useEffect(() => {
    if (isTogglePublishSuccess) {
      getCourse(courseId).then(() => {
        if (togglePublishData.data) {
          toast.success(togglePublishData.data.message)
        } else {
          toast.success(togglePublishData.message)
        }
      })
    }
  }, [isTogglePublishSuccess, togglePublishData, navigate, getCourse, courseId])

  useEffect(() => {
    if (isTogglePublishError) {
      console.log(togglePublishError)
      if (togglePublishError.data) {
        toast.error(togglePublishError.data.message)
      } else {
        toast.error(togglePublishError.error)
      }
    }
  }, [isTogglePublishError, togglePublishError])

  return (
    <div className="relative py-6 px-12 w-full bg-white">
      {(isLoading || isDeleteCourseLoading || isTogglePublishLoading) && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Loader type="large" dark />
        </div>
      )}

      {course?.course && (
        <div className="w-full">
          <div className="w-full flex flex-wrap gap-4 justify-between">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-2xl text-gray-800 font-medium">
                {course.course.name}
              </h1>
              <span className="text-amber-600 text-sm">
                By {course.course.instructor.username}
              </span>
              <span className="px-2 py-1 max-w-max text-sm bg-gray-300 text-gray-700 font-semibold">
                {course.course.category}
              </span>
            </div>

            {user && course.course.instructor._id === user._id ? (
              <div className="self-start flex gap-x-3">
                <Link to={`/course/edit/${course.course._id}`}>
                  <button className="p-2 rounded-[50%] flex items-center justify-center text-gray-700 bg-gray-100">
                    <PencilIcon className="h-5" />
                  </button>
                </Link>

                <button
                  disabled={course.course.lessons.length === 0}
                  className={`px-4 py-2 rounded-lg border-opacity-10 font-semibold text-sm disabled:bg-opacity-60 disabled:cursor-not-allowed ${
                    course.course.published
                      ? "border border-gray-500  text-gray-600 bg-gray-200"
                      : "border border-emerald-900  text-emerald-50 bg-emerald-600"
                  }`}
                  onClick={() => openPModal()}
                >
                  {!course.course.published
                    ? course.course.lessons.length === 0
                      ? "Add at least 1 lesson to publish"
                      : "Publish"
                    : "Published"}
                </button>

                <PublishCourseModal
                  isOpen={isPOpen}
                  closeModal={closePModal}
                  handlePublishCourse={handleTogglePublish}
                  published={course.course.published}
                />

                <DeleteCourse
                  title={course.course.name}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  openModal={openModal}
                  handleDeleteCourse={handleDeleteCourse}
                />
              </div>
            ) : enrollmentId ? (
              <Link to={`/classroom/${enrollmentId}`}>
                <button className="mt-5 flex items-center justify-center gap-x-2 bg-gray-900 text-emerald-50 text-sm py-2 px-4 rounded-lg shadow-sm">
                  <ViewBoardsIcon className="h-5 text-white" /> Go to classroom
                </button>
              </Link>
            ) : (
              <div>
                <button
                  className="mt-5 flex items-center justify-center gap-x-2 bg-gray-900 text-emerald-50 text-sm py-2 px-4 rounded-lg shadow-sm disabled:bg-opacity-60 disabled:cursor-not-allowed"
                  onClick={handleEnrollment}
                >
                  {isEnrollLoading ? <Loader /> : "Enroll"}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-y-5 bg-gray-700 text-gray-50 p-5 mt-5 rounded-lg shadow-sm">
            <img
              src={course.course.image}
              alt={course.course.name}
              className="h-40 w-40 object-cover rounded-lg"
            />
            <p>{course.course.description}</p>
          </div>

          {user && course.course.instructor._id === user._id && (
            <div className="mt-5 py-5 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl">Lessons</h2>

                <Link to={`/lesson/${course.course._id}/new`}>
                  <button className="flex items-center justify-center gap-x-2 bg-gray-900 text-emerald-50 text-sm py-2 px-4 rounded-lg shadow-sm">
                    <PlusCircleIcon className="h-5 text-white" /> NEW LESSON
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                {course.course.lessons && course.course.lessons.length > 0 ? (
                  <div>
                    <h2 className="mb-4">
                      {course.course.lessons.length} Lessons
                    </h2>

                    {course.course.lessons.map((lesson, index) => (
                      <div
                        className="flex p-2 rounded-lg gap-x-4 items-center mb-4 hover:bg-gray-50 ease-linear cursor-pointer"
                        key={lesson._id}
                      >
                        <span className="flex h-8 w-8 items-center justify-center p-4 rounded-full bg-gray-500 text-xl text-white">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900 pb-2 border-b border-gray-200 w-full">
                          {lesson.title}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-700">
                    This course has no lessons yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InstructorCourse
