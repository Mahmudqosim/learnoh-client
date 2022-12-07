import { Navigate, Outlet, useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../Loader"
import { useListEnrolledQuery } from "../../services/enrollment/enrollmentApi"
import { useAppDispatch } from '../../store/hooks';
import { setEnrollment } from "../../services/enrollment/enrollmentSlice"

const EnrolledRoute = () => {
  const [redirectToCourseDetails, setRedirectToCourseDetails] =
    useState(null)
  const { courseId } = useParams()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, isSuccess, error } =
    useListEnrolledQuery("")

  useEffect(() => {
    console.log(location)
  }, [location])

  useEffect(() => {
    if (isSuccess) {
      const enrollments = data.enrollments

      if (!enrollments.length) {
        setRedirectToCourseDetails(true)
        return
      }

      const enrollmentMap = enrollments.reduce((prev, enrollment) => {
        return {
          ...prev,
          [enrollment.course._id]: enrollment._id
        }
      }, {})

      dispatch(setEnrollment({ enrollmentMap }))

      if(!courseId) return

      if(Object.keys(enrollmentMap).includes(courseId)) {
        console.log(Object.keys(enrollmentMap), courseId)
        setRedirectToCourseDetails(false)

        return
      } else {
        setRedirectToCourseDetails(true)

      return 
      }
    }
  }, [isSuccess, data, courseId, dispatch])

  useEffect(() => {
    if (isError) {
      console.log(error)
      setRedirectToCourseDetails(true)
    }
  }, [isError, error])

  if (isLoading || !redirectToCourseDetails) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-white flex justify-center items-center">
        <Loader type="large" dark />
      </div>
    )
  }

  return (
    <>
      {redirectToCourseDetails === true ? (
        <Outlet />
      ) : (
        <Navigate to={`/classroom/${courseId}`} />
      )}
    </>
  )
}

export default EnrolledRoute
