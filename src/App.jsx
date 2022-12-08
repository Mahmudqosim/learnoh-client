import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import AuthLayout from "./layouts/AuthLayout"
import DashboardLayout from "./layouts/UsersLayout"
import Dashboard from "./views/dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import ForgotPassword from "./views/auth/ForgotPassword"
import ResetPassword from "./views/auth/ResetPassword"
import Settings from "./views/settings"
import Teach from "./views/teach"
import NewCourse from "./views/new-course"
import Course from "./views/course"
import NewLesson from "./views/new-lesson"
import EditCourse from "./views/edit-course"
import MyCourses from "./views/mycourses"
import Classroom from "./views/classroom"
import InstructorLayout from "./layouts/InstructorLayout"
import InstructorCourse from "./views/instructorcourse/InstructorCourse"
import Search from "./views/search"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          
          <Route path="/course/:courseId" element={<Course />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/mycourses" element={<MyCourses />} />

            <Route path="/classroom/:enrollmentId" element={<Classroom />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<InstructorLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/teach" element={<Teach />} />
            <Route path="/new-course" element={<NewCourse />} />
            <Route path="/course/edit/:courseId" element={<EditCourse />} />
            <Route path="/lesson/:courseId/new" element={<NewLesson />} />
            <Route path="/instructor/settings" element={<Settings />} />
            <Route path="/instructor/course/:courseId" element={<InstructorCourse />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
