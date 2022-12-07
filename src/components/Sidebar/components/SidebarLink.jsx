import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const SidebarLink = ({ text, Icon, open, active, click }) => {
  const [activeLink, setActiveLink] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let links

    if (!active) return

    if (typeof active === "object") {
      links = active
    } else {
      links = [active]
    }

    if (links.includes(pathname)) {
      setActiveLink(true)
    } else {
      setActiveLink(false)
    }
  }, [active, pathname])

  return (
    <div
      className={`inline-flex rounded-full cursor-pointer p-4 ${open && 'w-full'} hover:bg-opacity-80 duration-200 ${
        !activeLink ? "text-white bg-emerald-900" : 'text-gray-500 bg-white'
      }`}
      onClick={click}
    >
      <Icon className={`h-6 ${text === 'Logout' ? 'stroke-[#e0280f]' : 'stroke-current'} block float-left mr-3 duration-300 ${!open && '-translate-x-1'}`} />

      <h1
        className={`origin-left font-medium text-lg duration-300 ${
          !open && "scale-0"
        } ${!activeLink ? 'text-emerald-50' : 'text-gray-700'}`}
      >
        {text}
      </h1>
    </div>
  )
}

export default SidebarLink
