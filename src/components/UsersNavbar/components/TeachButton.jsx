import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { BookOpenIcon } from "@heroicons/react/solid"
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation } from "../../../services/auth/authApi"
import { useAppDispatch } from "../../../store/hooks"
import { setUser } from "../../../services/auth/authSlice"
import { toast } from "react-toastify"
import Loader from "../../Loader"

const TeachButton = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [updateUser, { isLoading, isError, error, data, isSuccess }] =
    useUpdateUserMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user))
      toast.success("You've become an educator")

      navigate('/teach')
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

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleTeach = () => {
    if (!user.user.educator) {
      openModal()
      return
    }

    navigate("/teach")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await updateUser({
      ...user,
      educator: true,
    })
  }

  return (
    <>
      <button
        className="bg-emerald-500 bg-opacity-30 px-4 py-2 flex gap-2 rounded-lg"
        onClick={() => handleTeach()}
      >
        <BookOpenIcon className="h-5 text-emerald-500" />
        <span className="text-sm text-white font-semibold">Teach</span>
      </button>

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
                    You're not an educator
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Become an educator and start sharing your knowledge.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black text-white px-4 py-2 text-sm font-medium hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      {isLoading ? <Loader /> : "Become an educator"}
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 text-red-50 px-4 py-2 text-sm font-medium hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={() => closeModal()}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default TeachButton
