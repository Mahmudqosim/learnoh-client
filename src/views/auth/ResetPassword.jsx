import { Fragment, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Dialog, Transition } from "@headlessui/react"

import { useResetPasswordMutation } from "../../services/auth/authApi"
import Loader from "../../components/Loader"
import Logo from "../../assets/Logo"

const initialState = {
  password: "",
  confirmPassword: "",
}

const ResetPassword = () => {
  const [form, setForm] = useState(initialState)
  const [isOpen, setIsOpen] = useState(false)
  const [resetPassword, { isLoading, isError, isSuccess, error, data }] =
    useResetPasswordMutation()

  const { token } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    console.log(token)
  })

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!token) {
      return
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Password does not match!")
    }

    await resetPassword({ ...form, token })
  }

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      toast.success(data.message)

      openModal()
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
    }
  }, [isError, error])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="flex flex-col items-center w-full bg-gray-50 h-screen">
      <Link to="/" className="mt-12">
        <Logo className="h-10" dark />
      </Link>

      <div className="flex flex-col gap-y-5 w-[500px] px-9 py-7 bg-white drop-shadow-lg mt-12 rounded-lg">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-2xl text-gray-700">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-400">Enter your new password</p>
        </div>

        <form className="flex flex-col gap-y-3" onSubmit={handleResetPassword}>
          <input
            className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <input
            className="w-full p-3 bg-gray-50 rounded-lg border-[1px] border-gray-200"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          <button
            disabled={isLoading ? true : false}
            type="submit"
            className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70"
          >
            {isLoading ? <Loader /> : "Reset Password"}
          </button>
        </form>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Password reset successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your password has been updated. You can log in to your
                      account now.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal()
                        navigate("/login", {
                          replace: true,
                        })
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ResetPassword
