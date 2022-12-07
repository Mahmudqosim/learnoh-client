import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { authSelector, clearUser } from "../../../services/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import Transition from "../../../utils/Transition"

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navigate = useNavigate()

  const trigger = useRef(null)
  const dropdown = useRef(null)

  const { user } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(clearUser())

    navigate("/login")
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {user && (
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={user.profilePhoto}
            alt="User"
          />
        )}
        <div className="flex items-center truncate">
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-emerald-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-emerald-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-emerald-200">
            {user && (
              <div className="font-medium text-emerald-800">{user.firstName}</div>
            )}
            <div className="text-xs text-emerald-500 italic">Instructor</div>
          </div>
          <ul>
            <li>
              <button
                className="font-medium text-sm text-emerald-700 hover:text-emerald-800 flex items-center py-1 px-3"
                onClick={() => handleLogout()}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu
