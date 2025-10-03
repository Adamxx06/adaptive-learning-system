import "./App.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicLayout from "./components/PublicLayout";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Courses from "./components/pages/Courses";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Contact from "./components/pages/Contact";
import TermsOfService from "./components/pages/Terms";

import QuizPage from "./components/QuizPage";



import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import AdminCourses from "./components/admin/Courses";
import Users from "./components/admin/Users";
import Settings from "./components/admin/Settings";
import AdminRoute from "./components/admin/AdminRoute";

// New imports for topics
import TopicsPage from "./components/pages/TopicsPage";

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
  {/* Public Layout wrapper */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />

    <Route path="/courses/:courseId/topics" element={<TopicsPage />} />


    {/* Topics page for a specific course */}
    <Route path="/courses/:courseId/topics" element={<TopicsPage />} />

    {/* Quiz page for a specific topic */}
    <Route path="/quiz/:topicId" element={<QuizPage />} />

    {/* Temporary test */}
  
    <Route path="/courses/:courseId/topics" element={<TopicsPage />} />

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
