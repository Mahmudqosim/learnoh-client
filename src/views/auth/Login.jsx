import { useLoginUserMutation } from "../../services/auth/authApi"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { useAppDispatch } from "../../store/hooks"
import { setToken } from "../../services/auth/authSlice"
import Logo from "../../assets/Logo"

const initialState = {
  username: "",
  password: "",
}

const Login = () => {
  const [form, setForm] = useState(initialState)

  const [loginUser, { isLoading, data, isSuccess, isError, error }] =
    useLoginUserMutation()

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (form.username && form.password) {
      await loginUser(form)
    } else {
      toast.error("Fill in all fields")
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("You have successfully logged in!")
      console.log(data)

      setForm(initialState)

      dispatch(setToken({ token: data.token, user: data.user }))

      navigate("/")
    }
  }, [isSuccess, data, dispatch, navigate])

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

  return (
    <div className="flex flex-col gap-y-5 items-center bg-gray-50 px-10 py-10 w-full">

      <Link to="/" className="mt-12 mb-5">
        <Logo className="h-10" dark />
      </Link>

      <form
        className="bg-white px-5 py-10 w-[400px] max-w-[450px] space-y-5 text-center rounded-lg shadow-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold text-gray-700">
          Login to your account
        </h2>

        <input
          className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
          type="email"
          name="username"
          onChange={handleChange}
          value={form.username}
          placeholder="Email Address"
          required
        />

        <div className="relative">
          <input
            className="w-full p-3 pr-16 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            required
          />

          <Link
            to="/forgot-password"
            className="text-emerald-700 h-5 absolute right-4 top-4 cursor-pointer text-sm font-semibold"
          >
            Forgot?
          </Link>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
        >
          {isLoading ? <Loader /> : "Sign In"}
        </button>
      </form>

      <div className="bg-gray-200 px-5 py-4 w-[400px] max-w-[450px] rounded-lg text-center">
        Don't have an account?
        <Link className="font-bold" to="/register">
          &nbsp;Get Started
        </Link>
      </div>
    </div>
  )
}
export default Login
