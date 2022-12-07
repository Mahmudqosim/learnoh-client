import React, { useEffect, useState } from "react"
import { SearchIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

import Logo from "../../../assets/Logo"
import UserMenu from "./UserMenu"
import SearchModal from "./SearchModal"
import TeachButton from "./TeachButton"
import { useAppDispatch } from "../../../store/hooks"
import {
  clearUser,
  setUser,
} from "../../../services/auth/authSlice"
import { useLoadUserQuery } from "../../../services/auth/authApi"

const TopNav = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

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
    }
  }, [dispatch, isSuccess, user])

  useEffect(() => {
    if (isError) {
      dispatch(clearUser())
    }
  }, [isError, error, dispatch])

  return (
    <div className="topnav">
      <Link className="self-center" to="/">
        <Logo className="h-10 text-white" />
      </Link>

      <div className="topnav-icon-group">
        <button
          className={`flex items-center justify-center transition duration-150 rounded-full ml-3 ${
            searchModalOpen && "opacity-50"
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setSearchModalOpen(true)
          }}
          aria-controls="search-modal"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="h-5 text-white" />
        </button>

        <SearchModal
          id="search-modal"
          searchId="search"
          modalOpen={searchModalOpen}
          setModalOpen={setSearchModalOpen}
        />

        {user && !isLoading ? (
          <>
            {user && <TeachButton user={user} />}
            <UserMenu user={user} />
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-white text-sm font-bold hover:bg-white hover:text-black duration-300"
            >
              LOG IN
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border-2 border-white bg-white text-black text-sm font-bold hover:bg-black hover:text-white duration-300"
            >
              SIGN UP
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default TopNav
