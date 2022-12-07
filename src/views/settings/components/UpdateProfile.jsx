import { useState, useEffect, useRef } from "react"
import { useAppSelector, useAppDispatch } from "../../../store/hooks"
import { authSelector, setUser } from "../../../services/auth/authSlice"
import Loader from "../../../components/Loader/index"
import { Switch } from "@headlessui/react"
import { useUpdateUserMutation } from "../../../services/auth/authApi"
import { toast } from "react-toastify"
import { PhotographIcon } from "@heroicons/react/outline"
import CanvasImage from "../../../utils/CanvasImage"

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  profilePhoto: "",
  educator: false,
}

const UpdateProfile = () => {
  const [form, setForm] = useState(initialState)
  const [source, setSource] = useState(null)

  const filePickerRef = useRef(null)

  const [updateUser, { isLoading, isError, error, data, isSuccess }] =
    useUpdateUserMutation()

  const { user } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!user) return

    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      profilePhoto: user.profilePhoto,
      educator: user.educator,
    })
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.user))
      toast.success("Profile has been updated")
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

  function handleFileChange(event) {
    const FILE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"]

    if (event.target.files.length < 1) {
      return
    }

    if (!FILE_TYPES.includes(event.target.files[0].type)) {
      toast.error("File type should be either a png, jpg, webp")
      return
    }

    if (event.target.files[0].size > 1024 * 1024 * 2) {
      toast.error("Image size should not be larger than 2MB")
      return
    }

    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      return setSource(reader.result)
    })

    reader.readAsDataURL(event.target.files[0])
  }

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await updateUser(form)
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

      <div className="relative">
        <img className="h-24 w-24 object-cover rounded-full" src={form.profilePhoto} alt="" />
        <span
          className="absolute bottom-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-50 cursor-pointer flex items-center justify-center p-2 rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <PhotographIcon className="h-5 text-white" />
        </span>
      </div>

      <input
        type="file"
        ref={filePickerRef}
        onChange={handleFileChange}
        hidden
      />

      <CanvasImage
        source={source}
        setSelectedFile={(file) =>
          setForm((form) => ({
            ...form,
            profilePhoto: file,
          }))
        }
        type="profile"
      />

      <div className="flex flex-row flex-wrap gap-3">
        <div className="flex flex-col gap-y-1 flex-grow items-start">
          <label className="text-gray-500 text-sm" htmlFor="email">
            Email Address
          </label>
          <input
            className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Email Address"
            required
          />
        </div>

        <div className="flex flex-col gap-y-1 flex-grow items-start">
          <label className="text-gray-500 text-sm" htmlFor="username">
            Username
          </label>
          <input
            className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            required
          />
        </div>

        <div className="flex flex-col gap-y-1 flex-grow items-start">
          <label className="text-gray-500 text-sm" htmlFor="firstName">
            First Name
          </label>
          <input
            className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={form.firstName}
            placeholder="First Name"
            required
          />
        </div>

        <div className="flex flex-col gap-y-1 flex-grow items-start">
          <label className="text-gray-500 text-sm" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="p-3 min-w-[300px] bg-gray-50 rounded-lg border-[1px] border-gray-200 w-full"
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={form.lastName}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="flex items-center gap-x-5 my-5">
          <span className="font-semibold text-lg text-gray-600">
            Are you an educator?
          </span>
          <Switch
            checked={form.educator}
            onChange={(e) => {
              setForm((form) => ({
                ...form,
                educator: e,
              }))
            }}
            className={`${form.educator ? "bg-emerald-700" : "bg-gray-300"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Educator</span>
            <span
              aria-hidden="true"
              className={`${form.educator ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>

      <button
        disabled={isLoading ? true : false}
        type="submit"
        className="flex p-3 items-center justify-center w-full font-semibold bg-emerald-600 text-emerald-50 rounded-lg disabled:bg-opacity-70 flex-grow"
      >
        Update Profile
      </button>
    </form>
  )
}

export default UpdateProfile
