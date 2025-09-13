import './App.css';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Courses from './components/pages/Courses';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Contact from './components/pages/Contact';
import TermsOfService from './components/pages/Terms';
import Footer from './components/Footer';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
