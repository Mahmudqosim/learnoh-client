import React, { useState } from "react"

function SidebarLinkGroup({ children, activecondition }) {
  const [open, setOpen] = useState(activecondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        activecondition && "bg-emerald-900 bg-opacity-50"
      }`}
    >
      {children(handleClick, open)}
    </li>
  )
}

export default SidebarLinkGroup
