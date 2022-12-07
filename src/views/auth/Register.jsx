import Loader from "../../components/Loader"
import { useRegisterUserMutation } from "../../services/auth/authApi"
import { setToken } from "../../services/auth/authSlice"
import { useAppDispatch } from "../../store/hooks"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"
import Logo from "../../assets/Logo"

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
}

const Register = () => {
  const [form, setForm] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)

  const [registerUser, { isLoading, isError, isSuccess, data, error }] =
    useRegisterUserMutation()

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (form.email && form.firstName && form.lastName && form.password) {
      await registerUser(form)
    } else {
      toast.error("Fill in all fields")
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration is successful. Let's rock!!")

      console.log(data)

      setForm(initialState)

      dispatch(setToken({ token: data.token, user: data.user }))

      navigate("/")
    }
  }, [isSuccess, data, dispatch, navigate])

  useEffect(() => {
    if (isError) {
      console.log("Error", error)

      if (!error.data) {
        toast.error(error.error)
      } else {
        toast.error(error.data.message)
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
        onSubmit={handleRegister}
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Join the roundtable.
          </h2>
        </div>

        <div>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>

        <div>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={form.firstName}
            required
          />
        </div>

        <div>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={form.lastName}
            required
          />
        </div>

        <div className="relative">
          <input
            className="w-full p-3 pr-16 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={form.password}
            required
          />

          <div
            className="text-emerald-700 h-5 absolute right-4 top-4 cursor-pointer text-sm font-semibold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5" />
            ) : (
              <EyeIcon className="h-5" />
            )}
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
        >
          {isLoading ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <div className="bg-gray-200 px-5 py-4 w-[400px] max-w-[450px] rounded-lg text-center">
        Already registered?
        <Link className="font-bold" to="/login">
          &nbsp;Sign In
        </Link>
      </div>
    </div>
  )
}
export default Register
