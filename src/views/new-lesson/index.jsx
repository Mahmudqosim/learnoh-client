import { useNewLessonMutation } from "../../services/course/courseApi"
import { useParams, useNavigate } from 'react-router-dom';
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useEffect, useCallback, useState } from "react"
import { toast } from "react-toastify"
import Loader from '../../components/Loader';

const initialState = {
  title: "",
}

const EDITOR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block", "link", "video"],
  ["clean"],
]

const NewLesson = () => {
  const [form, setForm] = useState(initialState)
  const [quill, setQuill] = useState(null)
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [newLesson, { isLoading, isSuccess, isError, data, error }] = useNewLessonMutation()

  const editorRef = useCallback((wrapper) => {
    if (wrapper == null) return

    const q = new Quill(wrapper, {
      theme: "snow",
      modules: {
        toolbar: EDITOR_OPTIONS,
      },
    })

    q.enable()
    setQuill(q)
  }, [])

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!quill || !courseId) return

    await newLesson({
      ...form,
      content: quill?.getContents(),
      courseId
    })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lesson has been successfully created")

      navigate(`/instructor/course/${courseId}`)
    }
  }, [isSuccess, data, navigate, courseId])

  useEffect(() => {
    if (isError) {
      if (!error.data) {
        toast.error(error.error)
      } else {
        toast.error(error.data.message)
      }
    }
  }, [isError, error])

  return (
    <div className="relative py-6 px-12 w-full bg-white">
      <div>
        <h1 className="font-bold text-2xl text-gray-700">New Lesson</h1>
        <span className="text-sm text-gray-500">COURSE ID: #{courseId}</span>
      </div>

      <form
        className="w-full relative bg-white py-10 flex flex-col gap-y-5 text-center rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
            <Loader type="large" dark />
          </div>
        )} */}

        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col gap-y-1 flex-grow items-start">
            <label className="text-gray-500 text-sm" htmlFor="name">
              Lesson Title
            </label>
            <input
              className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
              name="title"
              id="title"
              onChange={handleChange}
              value={form.title}
              placeholder="Title"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1 flex-grow items-start">
            <label className="text-gray-500 text-sm" htmlFor="content">
              Lesson Content
            </label>
            <div
              className="p-5 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full resize-y"
              ref={editorRef}
              id="content"
            />
          </div>
        </div>

        <button
            disabled={isLoading ? true : false}
          type="submit"
          className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
        >
          {isLoading ? <Loader /> : 'Add Lesson'}
        </button>
      </form>
    </div>
  )
}

export default NewLesson
