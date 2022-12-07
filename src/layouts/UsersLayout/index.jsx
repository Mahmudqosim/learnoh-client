import { Outlet } from "react-router-dom"

import UsersNavbar from '../../components/UsersNavbar'

const DashboardLayout = () => {
  return (
    <div>
      <UsersNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
