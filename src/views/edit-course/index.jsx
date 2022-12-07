import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { PhotographIcon } from "@heroicons/react/outline"

import { useGetCourseMutation, useEditCourseMutation } from "../../services/course/courseApi"
import Loader from "../../components/Loader"
import ArrangeLessons from "./components/ArrangeLessons"
import CanvasImage from '../../utils/CanvasImage';

const initialState = {
  name: "",
  description: "",
  category: "",
  image: "",
  lessons: null,
}

const EditCourse = () => {
  const [form, setForm] = useState(initialState)
  const [source, setSource] = useState(null)
  const { courseId } = useParams()
  const navigate = useNavigate()

  const filePickerRef = useRef(null)

  const [
    getCourse,
    {
      isLoading: isGetCourseLoading,
      isSuccess: isGetCourseSuccess,
      isError: isGetCourseError,
      data: course,
      error: getCourseError,
    },
  ] = useGetCourseMutation()

  const [updateCourse, { isLoading: isUpdateCourseLoading, isSuccess: isUpdateCourseSuccess, isError: isUpdateCourseError, data: updateCourseData, error: updateCourseError }] = useEditCourseMutation()

  useEffect(() => {
    if (!courseId) return

    getCourse(courseId)
  }, [courseId, getCourse])

  useEffect(() => {
    if (isGetCourseSuccess) {
      setForm(course.course)
    }
  }, [isGetCourseSuccess, course])

  useEffect(() => {
    if (isGetCourseError) {
      console.log(getCourseError)
      if (getCourseError.data) {
        toast.error(getCourseError.data.message)
      } else {
        toast.error(getCourseError.error)
      }
    }
  }, [isGetCourseError, getCourseError])

  useEffect(() => {
    if (isUpdateCourseSuccess) {
      console.log(updateCourseData)

      navigate(`/instructor/course/${courseId}`)
    }
  }, [courseId, isUpdateCourseSuccess, navigate, updateCourseData])

  useEffect(() => {
    if (isUpdateCourseError) {
      console.log(updateCourseError)
      if (updateCourseError.data) {
        toast.error(updateCourseError.data.message)
      } else {
        toast.error(updateCourseError.error)
      }
    }
  }, [isUpdateCourseError, updateCourseError])

  function handleFileChange(event) {
    const FILE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"]

    if (event.target.files.length < 1) {
      return
    }

    if (!FILE_TYPES.includes(event.target.files[0].type)) {
      toast.error("File type should be either a png, jpg, webp")
      return
    }

    if (event.target.files[0].size > 1024 * 1024 * 2) {
      toast.error("Image size should not be larger than 2MB")
      return
    }

    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      return setSource(reader.result)
    })

    reader.readAsDataURL(event.target.files[0])
  }

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    console.log(form)

    if(!course) return

    await updateCourse({
      courseId: course.course._id,
      name: form.name,
      description: form.description,
      image: form.image,
      category: form.category,
      lessons: form.lessons
    })
  }

  return (
    <div className="relative w-full py-6 px-12">
      {isGetCourseLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Loader type="large" dark />
        </div>
      )}

      {isGetCourseError && (
        <div className="w-full mt-4 text-2xl text-center text-red-500">
          Failed to load Course
        </div>
      )}

      {course && (
        <div className="w-full flex flex-col gap-y-5">
          <h1 className="font-bold text-2xl">Edit "{course.course.name}"</h1>
          <div className="flex flex-col gap-y-1 flex-grow items-start">
            <label className="text-gray-500 text-sm" htmlFor="name">
              Name
            </label>
            <input
              className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
              name="name"
              id="name"
              onChange={handleChange}
              value={form.name}
              placeholder="Name"
              required
            />
          </div>

          <div className="flex flex-col gap-y-1 flex-grow items-start">
            <label className="text-gray-500 text-sm" htmlFor="category">
              Category
            </label>
            <input
              className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
              name="category"
              id="category"
              onChange={handleChange}
              value={form.category}
              placeholder="Category"
              required
            />
          </div>

          <div className="flex gap-x-3 flex-wrap">
            <div className="relative flex gap-5 flex-wrap items-center">
              <img
                className="h-40 w-40 object-cover overflow-hidden border border-gray-200 shadow-inner"
                src={form.image}
                alt=""
              />

              <span
                className="bg-black bg-opacity-70 hover:bg-opacity-50 cursor-pointer flex gap-x-2 items-center justify-center py-2 px-5 rounded-full text-white"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-5" /> Change Photo
              </span>

              <input
                type="file"
                ref={filePickerRef}
                onChange={handleFileChange}
                hidden
              />

              <CanvasImage
                source={source}
                setSelectedFile={(file) =>
                  setForm((form) => ({
                    ...form,
                    image: file,
                  }))
                }
              />
            </div>

            <div className="w-full">
              <label className="text-gray-500 text-sm" htmlFor="description">
                Description
              </label>
              <textarea
                className="p-3 min-w-[300px] h-[250px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full resize-y"
                name="description"
                id="description"
                onChange={handleChange}
                value={form.description}
                placeholder="Description"
              />
            </div>
          </div>

          <ArrangeLessons lessons={course.course.lessons} setForm={setForm} />

          <button
              disabled={isUpdateCourseLoading ? true : false}
            onClick={handleSubmit}
            className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
          >
            {isUpdateCourseLoading ? <Loader /> : 'Update Course'}
          </button>
        </div>
      )}
    </div>
  )
}

export default EditCourse
