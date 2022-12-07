import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "../../store/hooks"
import { authSelector } from "../../services/auth/authSlice"
import Loader from "../../components/Loader/index"
import { useCreateCourseMutation } from "../../services/course/courseApi"
import { toast } from "react-toastify"
import { PhotographIcon } from "@heroicons/react/outline"
import CanvasImage from "../../utils/CanvasImage"
import { useNavigate } from "react-router-dom"

const initialState = {
  name: "",
  description: "",
  category: "",
  image: "",
}

const NewCourse = () => {
  const [form, setForm] = useState(initialState)
  const [source, setSource] = useState(null)

  const filePickerRef = useRef(null)

  const [createCourse, { isLoading, isError, error, data, isSuccess }] =
    useCreateCourseMutation()

  const { user } = useAppSelector(authSelector)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    if (!user.educator) {
      navigate("/")
    }
  }, [user, navigate])

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      navigate("/teach")
    }
  }, [isSuccess, data, navigate])

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
    e.preventDefault()

    if (!user) return

    await createCourse({ ...form, userId: user._id })
  }

  return (
    <div className="py-6 px-12 w-full">
      <h1 className="font-bold text-2xl text-gray-700 pb-5 border-b border-gray-200">
        Create Course
      </h1>

      <form
        className="w-full relative bg-white px-5 py-10 flex flex-col gap-y-5 text-center rounded-lg"
        onSubmit={handleSubmit}
      >
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
            <Loader type="large" dark />
          </div>
        )}

        <div className="flex flex-wrap gap-5">
          <div>
            <div className="relative">
              <img
                className="h-40 w-40 object-cover overflow-hidden border border-gray-200 shadow-inner"
                src={form.image}
                alt=""
              />
              <span
                className="absolute bottom-6 right-6 bg-black bg-opacity-70 hover:bg-opacity-50 cursor-pointer flex items-center justify-center p-2 rounded-full"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-5 text-white" />
              </span>
            </div>

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

          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full flex-col gap-y-1 flex-grow items-start">
              <label className="text-gray-500 text-sm" htmlFor="name">
                Name
              </label>
              <input
                className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={form.name}
                placeholder="Course name"
                required
              />
            </div>

            <div className="flex flex-col gap-y-1 flex-grow items-start">
              <label className="text-gray-500 text-sm" htmlFor="description">
                Description
              </label>
              <textarea
                className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full resize-y"
                name="description"
                id="description"
                onChange={handleChange}
                value={form.description}
                placeholder="Description"
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
          </div>
        </div>

        <button
          disabled={isLoading ? true : false}
          type="submit"
          className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
        >
          {isLoading ? <Loader /> : "Create Course"}
        </button>
      </form>
    </div>
  )
}

export default NewCourse
