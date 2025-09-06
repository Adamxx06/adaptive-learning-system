import "../../App.css";

const Home = () => {
  return (
    <>
      <section className="bg-dark text-white animated-bg">
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <div className="col-sm-12 col-xl-6 col-md-6 hero-text-container text-center text-xl-start text-md-start mt-4 mt-xl-0">
              <h1 className="display-3 fw-bold mb-3 mt-xl-0 mt-4">
                Welcome to <span style={{ color: "lightblue" }}>CodeAdapt</span>
              </h1>
              <p className="lead mb-4" data-aos="fade-up" data-aos-delay="100">
                Master coding with adaptive learning. Build real projects, track
                your progress, and become job-ready with a supportive community by
                your side
              </p>
              <div
                className="d-grid gap-2 d-xl-flex justify-content-xl-start"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button className="btn-modern btn-signup mb-xl-0 mb-2">
                  Sign Up
                </button>
                <button className="btn-modern btn-signin mb-5 mb-xl-0">
                  Sign In
                </button>
              </div>
            </div>
            <div
              className="col-xl-6 col-md-6 col-sm-12 hero-image-container"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <img
                src="./images/hero.jpg"
                alt="Hero Image"
                className="img-fluid rounded mb-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (new) */}
      <section className="how-it-works-section py-5 mt-xl-0 mt-md-0 mt-3">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">How CodeAdapt Works</h2>
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-3 mb-4 bg-secondary mx-0.2 bg-secondary">
              <i className="bi bi-person-circle fs-1 mb-3 bg-secondary mx-1 text-primary"></i>
              <h5 className="fw-semibold">Learner Profiling</h5>
              <p className="text-muted">
                Understand your current skills and preferences for a personalized pathway.
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3 mb-4 bg-secondary">
              <i className="bi bi-gear-fill fs-1 mb-3 bg-secondary mx-1 text-primary"></i>
              <h5 className="fw-semibold">Adaptive Content</h5>
              <p className="text-muted">
                Courses adjust in real-time based on your learning style and progress.
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3 mb-4 bg-secondary">
              <i className="bi bi-speedometer2 fs-1 mb-3 text-primary"></i>
              <h5 className="fw-semibold">Progress Tracking</h5>
              <p className="text-muted">
                Get personalized feedback and insights to help you improve.
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-3 mb-4 bg-secondary">
              <i className="bi bi-people-fill fs-1 mb-3 text-primary"></i>
              <h5 className="fw-semibold">Community Support</h5>
              <p className="text-muted">
                Connect with mentors and other learners for guidance and motivation.
              </p>
            </div>
          </div>
          <button className="btn btn-primary btn-lg mt-3">Get Started</button>
        </div>
      </section>

    </>
  );
};

export default Home;
