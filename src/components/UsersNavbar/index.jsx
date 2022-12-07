import React from "react"
import { authSelector } from "../../services/auth/authSlice"
import { useAppSelector } from "../../store/hooks"
import BottomNav from "./components/BottomNav"
import TopNav from "./components/TopNav"

import "./UsersNavbar.scss"

const UsersNavbar = () => {
  const { user } = useAppSelector(authSelector)

  return (
    <div className="users-navbar">
      <TopNav />

      {user && <BottomNav />}
    </div>
  )
}

export default UsersNavbar
