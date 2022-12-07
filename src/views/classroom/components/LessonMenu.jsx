import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { BadgeCheckIcon, InformationCircleIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"


export default function LessonMenu({
  lessons,
  lessonStatus,
  courseId,
  setLessonIndex,
  lessonIndex
}) {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center w-full justify-center rounded-md bg-black px-4 py-2 text-base font-bold text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Lesson Menu
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-emerald-200 hover:text-emerald-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none z-50">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link to={`/course/${courseId}`}>
                  <button
                    className={`${
                      active ? "bg-emerald-600 text-white" : "text-gray-900"
                    } flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm`}
                  >
                    <InformationCircleIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Course overview
                  </button></Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 divide-y divide-gray-50">
              {lessons.map((lesson, index) => (
                <Menu.Item key={lesson._id}>
                  {({ active }) => (
                    <button
                      className={`${
                        (active || lessonIndex === index) ? "bg-emerald-600 text-white" : "text-gray-900"
                      } flex w-full justify-between items-center gap-x-2 rounded-md px-2 py-2 text-sm`}
                      onClick={() => setLessonIndex(index)}
                    >
                      <span className="font-bold text-gray-800 h-8 w-8 text-xs items-center justify-center flex p-2 rounded-full bg-gray-200">
                        {index + 1}
                      </span>

                      <span>{lesson.title}</span>

                      <span>
                        {lessonStatus[lesson._id] ? (
                          <BadgeCheckIcon className="h-7 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-gray-700 rounded-full" />
                        )}
                      </span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
