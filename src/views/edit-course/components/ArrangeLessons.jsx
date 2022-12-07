import { useState } from "react"
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"

import LessonModal from "./LessonModal"

const ArrangeLessons = ({ lessons, setForm }) => {
  const [aLessons, setALessons] = useState(lessons)
  const [opened, setOpened] = useState(false)
  const [currentEditing, setCurrentEditing] = useState(null)

  const handleDragEnd = (e) => {
    const board = document.querySelector(".board")
    const draggedItem = document.querySelector(".dragging")
    const afterElement = getDragAfterElement(board, e.clientY)

    swapPosition(draggedItem?.id, afterElement?.id)

    e.target.classList.remove("dragging")
  }

  const handleDragStart = (e) => {
    e.target.classList.add("dragging")
  }

  function getDragAfterElement(board, y) {
    const items = Array.from(board.querySelectorAll(".item:not(.dragging)"))

    return items.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
          return {
            offset: offset,
            element: child,
          }
        } else {
          return closest
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element
  }

  const swapPosition = (draggedItemId, afterElementId) => {
    if (!aLessons) return

    if (!draggedItemId || !afterElementId) return

    const draggedItemIndex = aLessons?.findIndex(
      (lesson) => lesson._id === draggedItemId
    )
    const afterElementIndex = aLessons?.findIndex(
      (lesson) => lesson._id === afterElementId
    )

    let aLessonsClone = [...aLessons]

    if (draggedItemIndex === -1 || afterElementIndex === -1) return

    aLessonsClone[draggedItemIndex] = aLessons[afterElementIndex]
    aLessonsClone[afterElementIndex] = aLessons[draggedItemIndex]

    console.log(aLessonsClone)
    setALessons(aLessonsClone)

    setForm((form) => ({
      ...form,
      lessons: aLessonsClone,
    }))
  }

  const handleUpdateLesson = (lesson) => {
    if (!aLessons) return

    let updatedLessons = aLessons?.map((l) => {
      if (l._id !== lesson._id) return l

      return lesson
    })

    setALessons(updatedLessons)

    setForm((form) => ({
      ...form,
      lessons: updatedLessons,
    }))
  }

  const deleteLesson = (id) => {
    if (!aLessons) return

    let filteredLessons = aLessons.filter((lesson) => lesson._id !== id)

    setALessons(filteredLessons)

    setForm((form) => ({
      ...form,
      lessons: filteredLessons,
    }))
  }

  return (
    <>
      {aLessons && aLessons.length > 0 ? (
        <div>
          <h1 className="font-semibold text-xl">
            Lessons - Edit and Rearrange
          </h1>
          <h2 className="mb-4">{aLessons.length} Lessons</h2>

          <div className="board">
            {aLessons.map((lesson, index) => (
              <div
                className="item flex p-2 rounded-lg gap-x-4 items-center mb-4 hover:bg-gray-50 ease-linear cursor-pointer"
                key={lesson._id}
                id={lesson._id}
                draggable
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              >
                <span className="flex h-12 w-12 items-center justify-center p-4 rounded-full bg-gray-500 text-xl text-white">
                  {index + 1}
                </span>
                <span className="flex items-center justify-between font-medium text-gray-900 pb-2 border-b border-gray-200 w-full">
                  <span>{lesson.title}</span>
                  <span className="flex items-center gap-5">
                    <PencilIcon
                      onClick={() => {
                        setCurrentEditing(lesson)
                        setOpened(true)
                      }}
                      className="h-5 text-gray-600"
                    />
                    <TrashIcon
                      onClick={() => deleteLesson(lesson._id)}
                      className="h-5 text-red-500"
                    />
                  </span>
                </span>
              </div>
            ))}
          </div>

          <LessonModal
            opened={opened}
            setOpened={setOpened}
            lesson={currentEditing}
            handleUpdateLesson={handleUpdateLesson}
          />
        </div>
      ) : (
        <div className="text-center text-gray-700">
          This course has no lessons yet.
        </div>
      )}
    </>
  )
}

export default ArrangeLessons
