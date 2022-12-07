import { MenuAlt2Icon } from "@heroicons/react/outline"
import React, { useState } from "react"
import Logo from "../../assets/Logo"
import SearchModal from "./components/SearchModal"
import UserMenu from "./components/UserMenu"

function InstructorHeader({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-white border-b border-emerald-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex gap-x-2">
            {/* Hamburger button */}
            <button
              className="text-emerald-500 hover:text-emerald-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation()
                setSidebarOpen(!sidebarOpen)
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-7" />
            </button>

            <Logo className="h-8 text-white" dark />
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <button
              className={`w-8 h-8 flex items-center justify-center bg-emerald-100 hover:bg-emerald-200 transition duration-150 rounded-full ml-3 ${
                searchModalOpen && "bg-emerald-200"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setSearchModalOpen(true)
              }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-current text-emerald-500"
                  d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                />
                <path
                  className="fill-current text-emerald-400"
                  d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                />
              </svg>
            </button>
            <SearchModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            />

            <hr className="w-px h-6 bg-emerald-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default InstructorHeader
