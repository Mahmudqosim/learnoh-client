import { useRef, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
// import DropListAutocomplete from "../../components/DropListAutoComplete"
import Loader from "../../components/Loader"
import { useSearchPublishedCoursesMutation } from "../../services/course/courseApi"

const Search = () => {
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [courses, setCourses] = useState([])
  const searchInput = useRef(null)
  
  const location = useLocation()
  const navigate = useNavigate()

  const { ref: loadMoreRef, inView } = useInView()

  const [
    searchPublishedCourses,
    { data, isLoading, isSuccess, isError, error },
  ] = useSearchPublishedCoursesMutation()

  useEffect(() => {
    const keyword = location.search.split("?")[1].split("=")[1]

    console.log(keyword)
    setKeyword(keyword)
  }, [location])

  useEffect(() => {
    if (keyword.trim().length <= 2) return

    searchPublishedCourses({
      keyword,
      currentPage,
    })
  }, [currentPage, keyword, searchPublishedCourses])

  useEffect(() => {
    if (isSuccess) {
      setCourses((c) => [...c, ...data.courses])
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

  useEffect(() => {
    if (data && data.filteredCoursesCount === courses.length) return

    if (inView && !isLoading) {
      setCurrentPage(currentPage + 1)

      searchPublishedCourses({
        keyword: "",
        currentPage: currentPage,
      })
    }
  }, [courses, currentPage, data, inView, isLoading, searchPublishedCourses])
  
  const handleSearch = (e) => {
    e.preventDefault()

    navigate(`/search?keyword=${searchInput.current.value}`)

    searchInput.current.value = ""
  }


  return (
    <div className="relative py-6 px-12 w-full bg-white">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Loader type="large" dark />
        </div>
      )}

      <form className="flex flex-col lg:flex-row items-center gap-4">

        <div className="w-full space-y-2">
          <label htmlFor="search" className="text-sm text-gray-500">Search</label>
          <input
            id="search"
            className="w-full py-2 px-4 bg-white border-2 border-gray-700"
            type="search"
            placeholder="Search…"
            ref={searchInput}
          />
        </div>

        {/* <div className="space-y-2">
          <span className="text-sm text-gray-500">Categories</span>
          <DropListAutocomplete />
        </div> */}
      </form>

      <div>
        <h1 className="text-xl font-semibold mb-5">Search results</h1>
        <div className="flex flex-col gap-5">
          {courses &&
            courses.map((course) => (
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
                          ? `${course.description.substring(0, 250).trim()}...`
                          : course.description}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          <div ref={loadMoreRef}></div>
        </div>

        {isLoading && <Loader />}
      </div>
    </div>
  )
}

export default Search
