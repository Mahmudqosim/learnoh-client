import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import InstructorHeader from "../../components/InstructorHeader"
import InstructorSidebar from "../../components/InstructorSidebar"

const InstructorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <InstructorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <InstructorHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default InstructorLayout
