import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { HomeIcon } from "@heroicons/react/solid"
import {
  LogoutIcon,
  CogIcon,
  BookOpenIcon,
  LibraryIcon,
  MenuIcon,
  XIcon,
  BookmarkAltIcon,
  ChatAlt2Icon,
} from "@heroicons/react/outline"
import SidebarLink from "./components/SidebarLink"
import { authSelector, clearUser } from "../../services/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

const InstructorSidebar = () => {
  const { user } = useAppSelector(authSelector)
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser())

    navigate("/login")
  }

  return (
    <>
      <button
        className={`fixed flex md:hidden items-center justify-center rounded-full bottom-4 right-4 cursor-pointer bg-black p-4 z-40`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <XIcon className="text-white h-8" />
        ) : (
          <MenuIcon className="text-white h-8" />
        )}
      </button>

      <div
        className={`fixed md:sticky top-0 left-0 h-screen  ${
          open ? "w-10/12 md:w-72" : "w-0 md:w-20 overflow-x-hidden"
        } duration-300 ease-in-out z-30`}
      >
        <button
          className={`hidden md:flex items-center justify-center  absolute duration-200 ${
            open ? "-right-10" : "right-0 w-full"
          } top-0 cursor-pointer bg-emerald-900 p-2 z-30`}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <XIcon className="text-white h-6" />
          ) : (
            <MenuIcon className="text-white h-6" />
          )}
        </button>

        <div className="bg-emerald-700 w-full h-full p-5 pt-12">
          <div className="inline-flex items-center py-2 mb-4 text-emerald-50 cursor-pointer">
            <BookmarkAltIcon
              className={`h-8 fill-current block float-left mr-3 duration-300 ${
                open && "rotate-[360deg]"
              }`}
            />

            <h1
              className={`text-white origin-left font-normal text-xl uppercase duration-300 ${
                !open && "scale-0"
              }`}
            >
              Learno
            </h1>
          </div>

          <ul className="pt-5 flex flex-col gap-y-6">
            <Link onClick={() => setOpen(false)} to="/">
              <SidebarLink open={open} text="Home" Icon={HomeIcon} active="/" />
            </Link>

            {user?.educator && (
              <Link onClick={() => setOpen(false)} to="/teach">
                <SidebarLink
                  open={open}
                  text="Teach"
                  Icon={BookOpenIcon}
                  active={["/teach", "/new-course"]}
                />
              </Link>
            )}

            {user && (
              <>
                <Link onClick={() => setOpen(false)} to="/mycourses">
                  <SidebarLink
                    open={open}
                    text="Courses"
                    Icon={LibraryIcon}
                    active={"/mycourses"}
                  />
                </Link>

                <Link onClick={() => setOpen(false)} to="/messages">
                  <SidebarLink
                    open={open}
                    text="Messages"
                    Icon={ChatAlt2Icon}
                    active={"/messages"}
                  />
                </Link>

                <Link onClick={() => setOpen(false)} to="/settings">
                  <SidebarLink
                    open={open}
                    text="Settings"
                    Icon={CogIcon}
                    active="/settings"
                  />
                </Link>

                <span onClick={() => setOpen(false)}>
                  <SidebarLink
                    open={open}
                    text="Logout"
                    click={handleLogout}
                    Icon={LogoutIcon}
                  />
                </span>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default InstructorSidebar
