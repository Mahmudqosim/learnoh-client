import { useForgotPasswordMutation } from "../../services/auth/authApi"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Logo from "../../assets/Logo"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [forgotPassword, { isLoading, isError, isSuccess, error, data }] =
    useForgotPasswordMutation()

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    await forgotPassword({ email })
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      toast.success(data.message)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      console.log(error)
      if (error.data) {
        toast.error(error.data.message)
      } else {
        toast.error(error.error)
      }

      setEmail("")
    }
  }, [isError, error])

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 h-screen">
      <Link to="/" className="mt-12">
        <Logo className="h-10" dark />
      </Link>

      <div className="flex flex-col gap-y-5 w-[500px] px-9 py-7 bg-white drop-shadow-lg mt-12 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-2xl text-gray-700">Forgot Password?</h1>
          <p className="text-sm text-gray-400">
            Please enter the email you used for registration
          </p>
        </div>

        <form className="flex flex-col gap-y-3" onSubmit={handleForgotPassword}>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            // onChange={handleChange}
            // value={form.username}
            placeholder="Email Address"
            required
          />

          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
          >
            {isLoading ? <Loader /> : "Send Reset Email"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
