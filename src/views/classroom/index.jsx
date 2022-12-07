import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { useGetEnrollmentMutation } from "../../services/enrollment/enrollmentApi"
import CurrentLesson from "./components/CurrentLesson"
import LessonMenu from "./components/LessonMenu"

const Classroom = () => {
  const { enrollmentId } = useParams()
  const [course, setCourse] = useState(null)
  const [lessonStatus, setLessonStatus] = useState(null)
  const [lessonIndex, setLessonIndex] = useState(-1)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [completion, setCompletion] = useState({
    numOfLessons: 0,
    numOfCompletedLessons: 0,
  })

  //Get enrollment query
  const [
    getEnrollment,
    { isSuccess, isLoading, isError, data: enrollment, error },
  ] = useGetEnrollmentMutation()

  useEffect(() => {
    if (!enrollmentId) return

    console.log(enrollmentId)

    getEnrollment(enrollmentId)
  }, [enrollmentId, getEnrollment])

  useEffect(() => {
    if (isSuccess) {
      console.log(enrollment)
    }
  }, [isSuccess, enrollment])

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
    if (enrollment) {
      setCourse(enrollment.enrollment.course)
      // setCurrentLesson(enrollment.enrollment.course.lessons[0])
      setLessonIndex(0)

      const lessonStatusMap = enrollment.enrollment.lessonStatus.reduce(
        (prev, l) => {
          return {
            ...prev,
            [l.lesson]: l.complete,
          }
        },
        {}
      )

      const lessonDetailsMap = enrollment.enrollment.lessonStatus.reduce(
        (prev, l) => {
          return {
            ...prev,
            numOfCompletedLessons:
              prev.numOfCompletedLessons + (l.complete ? 1 : 0),
          }
        },
        {
          numOfLessons: enrollment.enrollment.lessonStatus.length,
          numOfCompletedLessons: 0,
        }
      )

      setLessonStatus(lessonStatusMap)
      setCompletion(lessonDetailsMap)
    }
  }, [enrollment, course])

  useEffect(() => {
    if (lessonIndex === -1) return

    setCurrentLesson(course.lessons[lessonIndex])
  }, [lessonIndex, course])

  const moveToNext = (index) => {
    if (!course || index <= 0) return

    const i = course.lessons.findIndex(
      (l) => l._id === course.lessons[index - 1]._id
    )

    setLessonIndex(i)
  }
  const moveToPrev = (index) => {
    if (!course || index - 1 >= course.lessons.length) return

    const i = course.lessons.findIndex(
      (l) => l._id === course.lessons[index + 1]._id
    )

    setLessonIndex(i)
  }

  return (
    <div className="classroom relative pb-6 pr-6 w-full bg-white">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white">
          <Loader type="large" dark />
        </div>
      )}

      {/* Lesson Content */}
      {course && (
        <div className="p-6">
          <div className="space-y-4 border-b border-gray-100 py-3">
            <h1 className="text-3xl font-light">{course.name}</h1>

            {course.lessons.length > 0 && (
              <LessonMenu
                lessons={course.lessons}
                lessonStatus={lessonStatus}
                courseId={course._id}
                lessonIndex={lessonIndex}
                setLessonIndex={setLessonIndex}
              />
            )}
          </div>

          {currentLesson && (
            <CurrentLesson
              lesson={currentLesson}
              lessonIndex={lessonIndex}
              numOfLessons={course.lessons.length}
              moveToPrev={moveToPrev}
              moveToNext={moveToNext}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Classroom
