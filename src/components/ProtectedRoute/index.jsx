import { useLoadUserQuery } from "../../services/auth/authApi"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { clearUser, setUser } from "../../services/auth/authSlice"
import Loader from "../Loader"

const ProtectedRoute = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(null)

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useLoadUserQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(user.user))

      console.log(user)
      setRedirectToLogin(false)
    }
  }, [dispatch, isSuccess, user])

  useEffect(() => {
    if (isError) {
      dispatch(clearUser())

      setRedirectToLogin(true)
    }
  }, [isError, error, dispatch])

  if (isLoading || redirectToLogin === null) {
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-emerald-600 flex justify-center items-center z-50">
        <Loader type="large" />
      </div>
    )
  }

  return <>{redirectToLogin === true ? <Navigate to="/login" /> : <Outlet />}</>
}

export default ProtectedRoute
