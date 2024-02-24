import { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout/Layout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/404";
import AllCourses from "./pages/AllCourses";
import MyCourses from "./pages/MyCourses";
import CourseLandingPage from "./pages/CourseLandingPage";
import CoursePlayer from "./pages/CoursePlayer";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AddCourseFormPage from "./admin/pages/AddCourseFormPage";
import "react-toastify/dist/ReactToastify.css";

import { authContext } from "./store/authContext";

import EditForm from "./admin/components/courses/form/EditForm";
import Loader from "./components/utils/Loader";

const PrivateRoutes = ({ userType }) => {
  let { isAuthenticated, isLoading, type } = useContext(authContext);

  if (isLoading) {
    return <Loader height={"600px"} />;
  }

  return isAuthenticated && userType === type ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route element={<PrivateRoutes userType={"admin"} />}>
          <Route path="/" element={<Layout />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/course" element={<AddCourseFormPage />} />
            <Route path="admin/course/edit/:id" element={<EditForm />} />
            <Route
              path="admin/course/edit/:id/module/:moduleId"
              element={<EditForm />}
            />
          </Route>
        </Route>

        <Route element={<PrivateRoutes userType={"student"} />}>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-courses" element={<AllCourses />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="course/:id" element={<CourseLandingPage />} />
            <Route path="course/:id/play" element={<CoursePlayer />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
