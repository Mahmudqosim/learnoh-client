import { useEffect } from "react"
import { useAppSelector } from "../../store/hooks"
import { authSelector } from "../../services/auth/authSlice"
import Loader from "../../components/Loader"
import { useNavigate, Link } from "react-router-dom"
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/outline"
import { useGetEducatorCoursesMutation } from "../../services/course/courseApi"

const Teach = () => {
  const { user } = useAppSelector(authSelector)
  const [
    getEducatorCourses,
    { isSuccess, isLoading, isError, data: courses, error },
  ] = useGetEducatorCoursesMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    getEducatorCourses(user._id)
  }, [getEducatorCourses, user])

  useEffect(() => {
    if (!user) return

    if (!user.educator) {
      navigate("/")
    }
  }, [user, navigate])

  useEffect(() => {
    if (isSuccess) {
      console.log(courses)
    }
  }, [isSuccess, courses])

  useEffect(() => {
    if (isError) {
      console.log(error)
    }
  }, [isError, error])

  return (
    <div className="py-6 px-12 w-full bg-white shadow-lg">
      <div className="flex w-full justify-between items-center pb-6 border-b border-gray-200">
        <h1 className="text-black font-bold text-2xl tracking-tight">Your Courses</h1>

        <Link to="/new-course">
          <button className="flex gap-x-2 items-center bg-white text-black border-2 border-black drop-shadow-md">
            <span className="text-white bg-black p-3"><PlusIcon className="h-6" /></span>
            <span className="font-bold p-3 pr-6">New Course</span>
          </button>
        </Link>
      </div>

      <div className="relative mt-5">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
            <Loader type="large" dark />
          </div>
        )}

        {courses &&
          courses.courses.map((course) => (
            <div
              key={course._id}
              className="relative w-full flex flex-wrap gap-6 p-5 overflow-hidden border-b border-gray-200"
            >
              {/* <div className="absolute w-60 h-24 bg-emerald-500 z-[-1] rotate-12 -right-10 -bottom-24"></div> */}
              <img
                src={course.image}
                alt={course.name}
                className="w-32 h-32 rounded-lg shadow object-cover"
              />
              <div className="flex flex-col gap-y-2 w-full">
                <h1 className="text-gray-800 font-semibold text-2xl">
                  {course.name}
                </h1>
                <p className="text-gray-500">
                  <span>
                    {course.description.length > 250
                      ? `${course.description.substring(0, 250).trim()}...`
                      : course.description}
                  </span>
                </p>
              </div>

              <Link to={`/instructor/course/${course._id}`} className="self-end">
                <button className="bg-emerald-600 text-white font-medium flex items-center justify-center gap-x-2 hover:bg-emerald-700 ease-in duration-75 py-2 px-4 rounded-lg">
                  View <ArrowRightIcon className="h-5" />
                </button>
              </Link>
            </div>
          ))}

        {courses && courses.courses.length === 0 && (
          <div className="w-full text-center mt-5">
            <h2 className="font-semibold text-xl text-gray-800">
              You have not created any course.
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Teach
