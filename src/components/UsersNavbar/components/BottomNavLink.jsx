import React from "react"
import { Link, useLocation } from "react-router-dom"

const BottomNavLink = ({ to, children }) => {
  const { pathname } = useLocation()

  return (
    <li className={`${pathname === to && 'active'}`}>
      <Link to={to} className="flex items-center justify-center gap-2">{children}</Link>
    </li>
  )
}

export default BottomNavLink
