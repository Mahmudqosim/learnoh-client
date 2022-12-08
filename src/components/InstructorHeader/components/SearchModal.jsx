import { SearchIcon } from "@heroicons/react/solid"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Transition from "../../../utils/Transition"

function SearchModal({ id, searchId, modalOpen, setModalOpen }) {
  const modalContent = useRef(null)
  const searchInput = useRef(null)

  const navigate = useNavigate()

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return
      setModalOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    modalOpen && searchInput.current.focus()
  }, [modalOpen])

  const handleSearch = (e) => {
    e.preventDefault()

    setModalOpen(false)

    navigate(`/search?keyword=${searchInput.current.value}`)

    searchInput.current.value = ""
  }

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          {/* Search form */}
          <form className="border-b border-gray-200" onSubmit={handleSearch}>
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full text-gray-800 border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search…"
                ref={searchInput}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <SearchIcon className="h-5 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-4 mr-4" />
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </>
  )
}

export default SearchModal
