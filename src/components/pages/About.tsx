import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const About: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="bg-white text-dark">
      {/* Hero Section */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6" data-aos="fade-right">
            <h1 className="fw-bold text-primary mb-3">About CodeAdapt</h1>
            <p className="lead text-muted">
              <strong>CodeAdapt</strong> is an innovative coding education platform designed
              to make learning programming easy, interactive, and adaptive. We believe every
              learner deserves a personalized journey that matches their pace, style, and goals.
            </p>
            <p className="text-muted">
              Whether you’re a beginner taking your first step into tech or a developer
              looking to sharpen your skills, CodeAdapt provides the tools, structure, and
              motivation you need to grow with confidence.
            </p>
          </div>
          <div className="col-md-6 text-center" data-aos="fade-left">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900"
              alt="Team working on code"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-5 border-top bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6" data-aos="fade-up-right">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                alt="Coding learners"
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-md-6" data-aos="fade-up-left">
              <h2 className="fw-bold text-primary mb-3">Our Story</h2>
              <p className="text-muted">
                CodeAdapt was founded with a simple mission — to close the gap between
                learning and real-world coding experience. Our team of passionate educators,
                software engineers, and designers came together to build an adaptive platform
                that responds to each learner’s unique journey.
              </p>
              <p className="text-muted">
                We started as a small initiative to help students in under-resourced
                communities gain digital skills, and today we’ve grown into a global learning
                space used by thousands of learners worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6" data-aos="fade-right">
            <h2 className="fw-bold text-primary mb-3">
              <i className="bi bi-bullseye text-primary me-2"></i> Our Mission
            </h2>
            <p className="text-muted">
              Our mission is to provide world-class coding education that adapts to every
              learner’s needs — empowering people everywhere to build, create, and innovate.
            </p>
            <p className="text-muted">
              We’re focused on making coding accessible, affordable, and achievable through
              adaptive learning technology that personalizes each user’s path to mastery.
            </p>
          </div>
          <div className="col-md-6 text-center" data-aos="zoom-in">
            <img
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=900"
              alt="Mission visual"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        <div className="row align-items-center g-5 mt-5">
          <div className="col-md-6 order-md-2" data-aos="fade-left">
            <h2 className="fw-bold text-primary mb-3">
              <i className="bi bi-eye text-primary me-2"></i> Our Vision
            </h2>
            <p className="text-muted">
              To become a global leader in adaptive coding education — where anyone, anywhere,
              can learn to code with confidence and creativity.
            </p>
            <p className="text-muted">
              We envision a world where learning to code is not a challenge, but an adventure,
              and where every learner can turn ideas into impactful software.
            </p>
          </div>
          <div className="col-md-6 text-center" data-aos="zoom-in">
            <img
              src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900"
              alt="Vision illustration"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-5 bg-light border-top" data-aos="fade-up">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-5">Our Core Values</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100 bg-white hover-shadow">
                <i className="bi bi-people-fill text-primary fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Community</h5>
                <p className="text-muted">
                  We believe in the power of collaboration — where learners and mentors grow
                  together through shared experiences and knowledge.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100 bg-white hover-shadow">
                <i className="bi bi-laptop text-primary fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Innovation</h5>
                <p className="text-muted">
                  We constantly evolve our platform to meet learners’ needs and keep up with
                  the ever-changing tech industry.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100 bg-white hover-shadow">
                <i className="bi bi-lightbulb-fill text-warning fs-1 mb-3"></i>
                <h5 className="fw-bold mb-2">Adaptivity</h5>
                <p className="text-muted">
                  Our AI-driven personalization ensures each learner gets a path that fits
                  their style and pace perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container py-5" data-aos="fade-up">
        <h2 className="fw-bold text-primary text-center mb-4">Why Choose CodeAdapt?</h2>
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <i className="bi bi-person-check-fill text-primary fs-1 mb-3"></i>
              <h6 className="fw-semibold">Personalized Learning</h6>
              <p className="text-muted small">
                Every user gets a learning path that adapts to their strengths and progress.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <i className="bi bi-award-fill text-primary fs-1 mb-3"></i>
              <h6 className="fw-semibold">Expert Mentorship</h6>
              <p className="text-muted small">
                Learn from industry professionals who guide you every step of the way.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <i className="bi bi-lightning-fill text-primary fs-1 mb-3"></i>
              <h6 className="fw-semibold">Interactive Practice</h6>
              <p className="text-muted small">
                Apply what you learn immediately with coding challenges and projects.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-4 border rounded shadow-sm bg-white h-100">
              <i className="bi bi-globe2 text-primary fs-1 mb-3"></i>
              <h6 className="fw-semibold">Global Community</h6>
              <p className="text-muted small">
                Connect with thousands of learners around the world sharing your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-5 border-top" data-aos="zoom-in-up">
        <div className="container">
          <h3 className="fw-bold text-primary mb-3">
            Ready to begin your coding journey?
          </h3>
          <p className="text-muted mb-4">
            Join thousands of learners building their future with <strong>CodeAdapt</strong>.
          </p>
          <a href="/signup" className="btn btn-primary btn-lg px-4 shadow">
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
