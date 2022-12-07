import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline"

const Pagination = ({ currentPage, itemsCount, numPerPage }) => {
  return (
    <div className="mb-12">
      <button>
        <ArrowLeftIcon className="h-4" />
        Prev
      </button>

      <div></div>

      <button>
        <ArrowRightIcon className="h-4" /> Next
      </button>
    </div>
  )
}

export default Pagination
