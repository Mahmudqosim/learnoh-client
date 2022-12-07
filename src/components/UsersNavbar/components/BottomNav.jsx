import { useEffect } from "react"
import { ClipboardListIcon, CogIcon, HomeIcon } from "@heroicons/react/solid"

import BottomNavLink from "./BottomNavLink"

const BottomNav = () => {
  useEffect(() => {

    window.addEventListener("scroll", function () {
      if (this.scrollY >= 80) {
        document.querySelector(".bottomnav").classList.add("fixed-nav")
      } else {
        document.querySelector(".bottomnav").classList.remove("fixed-nav")
      }
    })

  }, [])

  return (
    <div className="bottomnav">
      <ul>
        <BottomNavLink to="/">
          <HomeIcon className="h-6" />
          <span>Home</span>
        </BottomNavLink>

        <BottomNavLink to="/mycourses">
          <ClipboardListIcon className="h-6" />
          <span>My Courses</span>
        </BottomNavLink>

        <BottomNavLink to="/settings">
          <CogIcon className="h-6" />
          <span>Settings</span>
        </BottomNavLink>
      </ul>
    </div>
  )
}

export default BottomNav
