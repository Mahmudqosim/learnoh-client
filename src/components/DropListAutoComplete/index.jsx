import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid"
import { useEffect } from "react"

const categories = [
  "None",
  "UI Design",
  "Programming",
  "Javascript",
  "Data Science",
  "Science",
  "Chemistry",
  "Physics",
  "Electrical Engineering",
  "Drawing",
]

export default function DropListAutocomplete() {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    setSelected(categories[0])
  }, [])

  const filteredData =
    query === ""
      ? categories
      : categories.filter((d) =>
          d
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative w-max">
        <div className="relative w-full cursor-default overflow-hidden bg-white text-left sm:text-sm ring-2 ring-gray-700">
          <Combobox.Input
            className="bg-gray-50 w-full py-[0.6rem] pl-3 pr-10 text-base leading-5 text-gray-900"
            displayValue={(d) => d}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
            {filteredData.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredData.map((d, index) => (
                <Combobox.Option
                  key={`${index}${d[0]}`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-emerald-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={d}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {d}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-emerald-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
