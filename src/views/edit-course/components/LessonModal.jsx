import {
  useEffect,
  useState,
  useCallback,
} from "react"
import Quill from "quill"
import { XIcon } from "@heroicons/react/outline"
import "quill/dist/quill.snow.css"

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


const LessonModal = ({
  lesson,
  opened,
  setOpened,
  handleUpdateLesson,
}) => {
  const [form, setForm] = useState({
    _id: "",
    title: "",
  })
  const [quill, setQuill] = useState(null)

  useEffect(() => {
    if (!lesson) return
    setForm({
      _id: lesson._id,
      title: lesson.title,
    })
  }, [lesson])

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

  useEffect(() => {
    if(!lesson) return
    quill?.setContents(lesson.content)
  }, [lesson, quill])

  const handleTitleChange = (e) => {
    setForm((form) => ({
      ...form,
      title: e.target.value,
    }))
  }

  return (
    <>
      {lesson && opened && (
        <div
          onClick={(e) => {
            if (!e.target.classList.contains("editmodal")) return

            setOpened(false)
          }}
          className="editmodal fixed top-0 right-0 bg-black bg-opacity-80 w-full h-full p-8 overflow-y-auto"
        >
          <button
            className="fixed top-5 right-10 bg-red-500 p-2 rounded-lg shadow-lg z-50"
            onClick={() => setOpened(false)}
          >
            <XIcon className="h-7 text-gray-50" />
          </button>
          
          <div className="bg-white mt-10 md:ml-20 p-6 rounded-lg">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-y-1 items-start">
                <label className="text-gray-500 text-sm" htmlFor="name">
                  Lesson Title
                </label>
                <input
                  className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
                  name="title"
                  id="title"
                  onChange={handleTitleChange}
                  value={form.title}
                  placeholder="Title"
                  required
                />
              </div>
              <div className="flex flex-col gap-y-1 items-start">
                <label className="text-gray-500 text-sm" htmlFor="content">
                  Lesson Content
                </label>
                <div
                  className="p-5 bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full resize-y"
                  ref={editorRef}
                  id="content"
                />
              </div>

              <button className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 p-4 text-md font-medium text-emerald-50 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              onClick={() => {
                handleUpdateLesson({
                  ...form,
                  content: quill.getContents()
                })

                setOpened(false)
              }}
              >
                Update Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LessonModal
