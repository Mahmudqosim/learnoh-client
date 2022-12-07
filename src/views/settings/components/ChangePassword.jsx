import { useState, useEffect } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { setToken } from "../../../services/auth/authSlice"
import Loader from "../../../components/Loader/index"
import { useChangePasswordMutation } from "../../../services/auth/authApi"
import { toast } from "react-toastify"

const initialState = {
  password: "",
  oldPassword: "",
}

const ChangePassword = () => {
  const [form, setForm] = useState(initialState)

  const [updatePassword, { isLoading, isError, error, data, isSuccess }] =
    useChangePasswordMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken({ token: data.token, user: data.user }))
      toast.success("Password has been updated")

      setForm(initialState)
    }
  }, [isSuccess, data, dispatch])

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

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await updatePassword(form)
  }

  return (
    <form
      className="relative bg-white px-5 py-10 flex flex-wrap gap-y-5 text-center rounded-lg"
      onSubmit={handleSubmit}
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50">
          <Loader type="large" dark />
        </div>
      )}

      <div className="flex flex-row flex-wrap gap-3">
        <div className="flex flex-col gap-y-1 flex-grow items-start">
          <label className="text-gray-500 text-sm" htmlFor="email">
            Previous Password
          </label>
          <input
            className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
            type="password"
            id="oldPassword"
            name="oldPassword"
            onChange={handleChange}
            value={form.oldPassword}
            placeholder="Previous Password"
            required
          />
        </div>

        <div className="flex flex-col gap-y-1 flex-grow items-start">
          <label className="text-gray-500 text-sm" htmlFor="username">
            New Password
          </label>
          <input
            className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={form.password}
            placeholder="New Password"
            required
          />
        </div>
      </div>

      <button
        disabled={isLoading ? true : false}
        type="submit"
        className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70 flex-grow"
      >
        Change Password
      </button>
    </form>
  )
}

export default ChangePassword
