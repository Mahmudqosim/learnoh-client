import { useEffect } from "react"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useListEnrolledQuery } from "../../services/enrollment/enrollmentApi"

const MyCourses = () => {
  const { data, isLoading, isError, isSuccess, error } =
    useListEnrolledQuery("")

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
    }
  }, [isSuccess, data])

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

  return (
    <div className="relative py-6 px-12 w-full bg-white">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Loader type="large" dark />
        </div>
      )}

      <div>
        <h1 className="text-2xl font-semibold mb-5">My courses</h1>
        <div className="flex flex-col gap-5">
          {data &&
            data.enrollments &&
            data.enrollments
              .reduce((prev, enrollment) => {
                if (!enrollment.course.published) return prev

                return [...prev, enrollment.course]
              }, [])
              .map((course) => (
                <Link key={course._id} to={`/course/${course._id}`}>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex flex-col lg:flex-row  gap-5 w-full">
                      <img
                        src={course.image}
                        className="w-40 h-40 object-cover rounded-lg"
                        alt={course.name}
                      />

                      <div className="flex flex-col w-full gap-2 py-2 px-4">
                        <h2 className="font-semibold text-2xl text-gray-900">
                          {course.name}
                        </h2>

                        <span className="text-sm text-gray-500 italic">
                          {course.category}
                        </span>

                        <span>
                          {course.description.length > 250
                            ? `${course.description
                                .substring(0, 250)
                                .trim()}...`
                            : course.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}
export default MyCourses
