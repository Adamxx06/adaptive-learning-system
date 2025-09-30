import React from "react";
import { FaUsers, FaLaptopCode, FaLightbulb, FaGlobe } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <div className="about-page bg-dark text-light">
      <main className="container py-5" aria-label="About Us">
        {/* Header */}
        <header className="text-center mb-5">
          <h1 className="fw-bold text-white">About Us</h1>
          <p className="text-light opacity-75 w-75 mx-auto">
            At <span className="text-primary fw-semibold">CodeAdapt</span>, we make coding
            simple, personalized, and engaging. Our adaptive platform helps you learn at your
            own pace while staying motivated.
          </p>
        </header>

        {/* Who We Are */}
        <section className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Learning illustration"
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold text-white">Who We Are</h2>
            <p className="text-light opacity-75">
              We’re a team of educators and engineers on a mission to democratize coding
              education. CodeAdapt adapts to your strengths and weaknesses, ensuring every
              learner finds their best path forward.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="p-4 shadow rounded bg-navy h-100">
              <h3 className="text-cyan">
                <FaLightbulb className="me-2" />
                Our Mission
              </h3>
              <p className="text-light opacity-75">
                To provide world-class coding education that adjusts to each learner’s needs.
                Everyone deserves the chance to code with confidence.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 shadow rounded bg-navy h-100">
              <h3 className="text-primary">
                <FaGlobe className="me-2" />
                Our Vision
              </h3>
              <p className="text-light opacity-75">
                To be the global leader in adaptive coding education, bridging the gap between
                learners and real-world opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="row text-center g-4 mb-5">
          <div className="col-md-4">
            <div className="p-4 shadow-sm rounded bg-navy h-100 hover-glow">
              <FaUsers size={40} className="text-cyan mb-3" />
              <h5 className="text-white">Community</h5>
              <p className="text-light opacity-75">
                A collaborative environment where learners and mentors support each other.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 shadow-sm rounded bg-navy h-100 hover-glow">
              <FaLaptopCode size={40} className="text-primary mb-3" />
              <h5 className="text-white">Hands-On Learning</h5>
              <p className="text-light opacity-75">
                Build real projects and solve coding challenges while you learn.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 shadow-sm rounded bg-navy h-100 hover-glow">
              <FaLightbulb size={40} className="text-warning mb-3" />
              <h5 className="text-white">Adaptivity</h5>
              <p className="text-light opacity-75">
                AI-driven personalization ensures your journey matches your learning pace.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-action */}
        <section className="text-center">
          <h4 className="fw-bold text-white">Start your coding journey today</h4>
          <p className="text-light opacity-75">
            Join thousands of learners already unlocking their potential with CodeAdapt.
          </p>
          <a href="/signup" className="btn btn-primary btn-lg shadow">
            Get Started
          </a>
        </section>
      </main>
    </div>
  );
};

export default About;
