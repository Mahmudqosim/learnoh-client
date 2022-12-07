import { useState, useCallback } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useEffect } from "react"
import {
  CheckIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline"
// import { useMarkAsCompleteMutation } from "@/services/enrollment/enrollmentApi"


const CurrentLesson = ({
  lesson,
  lessonIndex,
  numOfLessons,
  moveToNext,
  moveToPrev,
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
      readOnly: true,
      modules: {
        toolbar: [],
      },
    })

    q.disable()
    setQuill(q)

    console.log('text', q.getText())
  }, [])

  useEffect(() => {
    if (!lesson) return
    quill?.setContents(lesson.content)
  }, [lesson, quill])

  return (
    <>
      {lesson && (
        <div className="mt-10 z-0">
          <div className="mb-5 bg-gray-900 py-2 px-4 flex items-center justify-between flex-wrap gap-4 rounded-lg">
            <h1 className="text-gray-50 text-xl font-bold">{form.title}</h1>

            <button className="bg-gray-600 text-white py-2 px-5 -mb-5 rounded-lg shadow-sm flex gap-x-2 items-center">
              <CheckIcon className="h-5 text-amber-400" /> Mark as complete
            </button>
          </div>

          <div className="flex">
            <div
              className="w-full h-full border-0 bg-white"
              ref={editorRef}
              id="content"
            />
          </div>

          <div className="flex w-full justify-between items-center gap-4 my-6">
            {lessonIndex > 0 && (
              <button
                className="flex items-center gap-2 text-emerald-700 hover:border-b-2 hover:border-emerald-600 ease-in text-md"
                onClick={() => moveToNext(lessonIndex)}
              >
                <ChevronDoubleLeftIcon className="h-5" /> Previous Lesson
              </button>
            )}

            {lessonIndex < numOfLessons && lessonIndex + 1 !== numOfLessons && (
              <button
                className="flex items-center gap-2 text-emerald-700 hover:border-b-2 hover:border-emerald-600 ease-in text-md"
                onClick={() => moveToPrev(lessonIndex)}
              >
                Next Lesson <ChevronDoubleRightIcon className="h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CurrentLesson
