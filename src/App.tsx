import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Layouts
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";

// Pages (Public)
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Courses from "./components/pages/Courses";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Contact from "./components/pages/Contact";
import TermsOfService from "./components/pages/Terms";
import TopicsPage from "./components/pages/TopicsPage";
import QuizPage from "./components/QuizPage";
import VerifyEmail from "./components/pages/VerifyEmail"; // ✅ New import

// Pages (Admin)
import Dashboard from "./components/admin/Dashboard";
import AdminCourses from "./components/admin/Courses";
import Users from "./components/admin/Users";
import Settings from "./components/admin/Settings";

// Route Guards
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

  <Route path="/verify-email" element={<VerifyEmail />} />


        {/* Protected User Routes */}
        <Route element={<UserRoute />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId/topics" element={<TopicsPage />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
