import "../../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const courseStyles = {
  JavaScript: {
    iconColor: '#F7DF1E',
    bgColor: '#e5ebdbff',
    borderColor: '#F7DF1E',
    buttonColor: '#F7DF1E',
    buttonTextColor: '#323330'
  },
  HTML: {
    iconColor: '#E44D26',
    bgColor: '#F8F9FA',
    borderColor: '#E44D26',
    buttonColor: '#E44D26',
    buttonTextColor: '#FFFFFF'
  },
  CSS: {
    iconColor: '#1572B6',
    bgColor: '#F8F9FA',
    borderColor: '#1572B6',
    buttonColor: '#1572B6',
    buttonTextColor: '#FFFFFF'
  },
  React: {
    iconColor: '#61DAFB',
    bgColor: '#7b8294ff',
    borderColor: '#61DAFB',
    buttonColor: '#61DAFB',
    buttonTextColor: '#20232A'
  },
  PHP: {
    iconColor: '#777BB4',
    bgColor: '#F8F9FA',
    borderColor: '#777BB4',
    buttonColor: '#777BB4',
    buttonTextColor: '#FFFFFF'
  },
  SQL: {
    iconColor: '#00758F',
    bgColor: '#F8F9FA',
    borderColor: '#00758F',
    buttonColor: '#00758F',
    buttonTextColor: '#FFFFFF'
  },
};

const testimonials = [
  { name: "Ada Lovelace", role: "Student", text: "CodeAdapt helped me understand coding concepts at my pace. Truly amazing!" },
  { name: "Grace Hopper", role: "Instructor", text: "The adaptive system makes teaching so much more effective." },
  { name: "Alan Turing", role: "Student", text: "I love the projects. They really make learning practical and fun." },
  { name: "Barbara Liskov", role: "Student", text: "The progress tracking kept me motivated every step of the way." },
  { name: "Donald Knuth", role: "Mentor", text: "CodeAdapt is bridging the gap between learners and real opportunities." },
  { name: "Linus Torvalds", role: "Student", text: "Finally, a coding platform that adapts to ME!" },
  { name: "Margaret Hamilton", role: "Student", text: "I feel more confident now thanks to the structured adaptive content." },
  { name: "Tim Berners-Lee", role: "Student", text: "Great balance of theory and practice. Highly recommend!" },
  { name: "Guido van Rossum", role: "Instructor", text: "Students actually stay engaged — it’s fantastic." },
  { name: "James Gosling", role: "Student", text: "Never thought I’d enjoy coding this much!" },
];

const courses = [
  { id: 1, name: "JavaScript", icon: "bi bi-filetype-js", description: "The core language of web development" },
  { id: 2, name: "HTML", icon: "bi bi-filetype-html", description: "Structure the web with semantic markup" },
  { id: 3, name: "CSS", icon: "bi bi-filetype-css", description: "Design beautiful and responsive layouts" },
  { id: 4, name: "React", icon: "bi bi-lightning-fill", description: "Build modern, component-based UIs" },
  { id: 5, name: "PHP", icon: "bi bi-code-slash", description: "Server-side scripting and web backend" },
  { id: 6, name: "SQL", icon: "bi bi-database-fill", description: "Master relational database management" },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleStartCourse = (courseName: string, courseId: number) => {
    const availableCourses = [1, 2, 3, 4, 5, 6]; // IDs of courses that exist in your DB
    if (availableCourses.includes(courseId)) {
      navigate(`/courses/${courseId}/topics`);
    } else {
      alert(`${courseName} course is coming soon!`);
    }
  };

  return (
    <>
      {/* Hero Section (EXISTING) */}
      <section className="bg-dark text-white animated-bg">
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
          >
            <div
              className="col-sm-12 col-xl-6 col-md-6 text-center text-xl-start text-md-start mt-4 mt-xl-0"
              data-aos="fade-right"
            >
              <h1 className="display-3 fw-bold mb-3 mt-xl-0 mt-4">
                Welcome to <span style={{ color: "lightblue" }}>CodeAdapt</span>
              </h1>
              <p className="lead mb-4">
                Master coding with adaptive learning. Build real projects, track your progress, and become job-ready with a supportive community by your side.
              </p>
              <div className="d-grid gap-2 d-xl-flex justify-content-xl-start">
                <button
                  className="btn-modern btn-signup mb-xl-0 mb-2"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="btn-modern btn-signin mb-5 mb-xl-0"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12" data-aos="fade-left">
              <img
                src="./images/hero.jpg"
                alt="Hero"
                className="img-fluid rounded mb-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Trusted by Top Companies
          </h2>
          <p className="text-muted mb-5" data-aos="fade-up" data-aos-delay="100">
            We collaborate with global tech leaders and educational partners.
          </p>

          <div className="row justify-content-center align-items-center g-4" data-aos="fade-up" data-aos-delay="200">
            {[
              { name: "Google", img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
              { name: "Microsoft", img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
              { name: "Amazon", img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
              { name: "Meta", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg" },
              { name: "IBM", img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
            ].map((company, i) => (
              <div key={i} className="col-6 col-md-2 col-lg-2">
                <img
                  src={company.img}
                  alt={company.name}
                  className="img-fluid"
                  style={{ maxHeight: "40px", filter: "grayscale(100%)", opacity: 0.8 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)";
                    (e.currentTarget as HTMLImageElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)";
                    (e.currentTarget as HTMLImageElement).style.opacity = "0.8";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (EXISTING) */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5 fw-bold" data-aos="fade-up">
            How CodeAdapt Works
          </h2>
          <div className="row justify-content-center">
            {[
              { icon: "bi-person-circle", title: "Learner Profiling", text: "Personalized pathways designed for your skills and goals." },
              { icon: "bi-gear-fill", title: "Adaptive Content", text: "Courses adjust in real-time based on your learning style." },
              { icon: "bi-speedometer2", title: "Progress Tracking", text: "Insights and feedback to help you stay on track." },
              { icon: "bi-people-fill", title: "Community Support", text: "Engage with mentors and peers to grow together." },
            ].map((feature, i) => (
              <div
                key={i}
                className="col-12 col-sm-6 col-md-3 mb-4 d-flex"
                data-aos="zoom-in"
                data-aos-delay={100 * (i + 1)}
              >
                <div
                  className="p-4 w-100"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.07)',
                    borderTop: '4px solid #0d6efd',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#0d6efd',
                      color: '#ffffff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '15px',
                      boxShadow: '0 4px 10px rgba(13, 110, 253, 0.4)',
                    }}
                  >
                    <i className={`bi ${feature.icon} fs-4`}></i>
                  </div>
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Breakdown */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            Adaptive Learning: Why CodeAdapt Works
          </h2>

          <div className="row align-items-center mb-5 pb-5">
            <div className="col-md-6" data-aos="fade-right">
              <h3 className="fw-bold mb-3" style={{ color: '#0d6efd' }}>
                Goodbye Frustration, Hello Flow State
              </h3>
              <p className="lead text-muted">
                Our AI dynamically generates content and practice problems based on your real-time performance, ensuring you're always challenged, never overwhelmed.
              </p>
              <ul className="list-unstyled mt-4 text-start">
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span>Targeted Quizzes to fill knowledge gaps immediately.</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span>Adaptive difficulty that scales with your mastery.</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                  <span>Concepts repeated just enough to stick, but not bore you.</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 mt-4 mt-md-0 text-center" data-aos="fade-left">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Personalized Learning Chart"
                className="img-fluid rounded-3 shadow-lg"
                style={{ maxHeight: '500px', width: '90%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="row align-items-center pt-5">
            <div className="col-md-6 order-md-2" data-aos="fade-left">
              <h3 className="fw-bold mb-3" style={{ color: '#0d6efd' }}>
                Learn by Doing: Real-World Projects
              </h3>
              <p className="lead text-muted">
                Theory is useless without application. Every course is built around portfolio-ready projects that mirror industry workflows, getting you job-ready faster.
              </p>
              <ul className="list-unstyled mt-4 text-start">
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-code-slash text-warning me-2 mt-1"></i>
                  <span>Integrated development environment (IDE) practice.</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-clipboard-check-fill text-warning me-2 mt-1"></i>
                  <span>Code reviews and feedback loops from mentors.</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-briefcase-fill text-warning me-2 mt-1"></i>
                  <span>Projects designed to pass technical interviews.</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6 order-md-1 mt-4 mt-md-0 text-center" data-aos="fade-right">
              <img
                src="https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Coding terminal with hands"
                className="img-fluid rounded-3 shadow-lg"
                style={{ maxHeight: '500px', width: '90%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5" data-aos="fade-up">
            Popular Courses
          </h2>
          <div className="row justify-content-center">
            {courses.map((course, i) => {
              const styles = courseStyles[course.name as keyof typeof courseStyles];
              return (
                <div
                  key={i}
                  className="col-6 col-md-4 col-lg-2 mb-4 d-flex"
                  data-aos="zoom-in"
                  data-aos-delay={i * 100}
                >
                  <div
                    style={{
                      backgroundColor: styles.bgColor,
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      borderLeft: `5px solid ${styles.borderColor}`,
                      padding: '20px',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: styles.iconColor,
                        color: styles.bgColor === '#F8F9FA' ? styles.bgColor : styles.iconColor === '#F7DF1E' ? styles.bgColor : '#FFFFFF',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '15px',
                        boxShadow: `0 2px 8px ${styles.borderColor}66`,
                      }}
                    >
                      <i className={`${course.icon} fs-4`}></i>
                    </div>

                    <h5 className="fw-bold mb-1" style={{ color: styles.bgColor === '#20232A' ? '#FFFFFF' : '#212529' }}>
                      {course.name}
                    </h5>

                    <p className="text-muted small mb-3" style={{ fontSize: '0.8rem', color: styles.bgColor === '#20232A' ? '#ADB5BD' : '#6C757D' }}>
                      {course.description}
                    </p>

                    <button
                      className="btn btn-sm mt-auto"
                      style={{
                        backgroundColor: styles.buttonColor,
                        color: styles.buttonTextColor,
                        border: 'none',
                        fontWeight: '600',
                        width: '100%',
                        borderRadius: '6px',
                        padding: '8px 0',
                        boxShadow: `0 2px 4px ${styles.borderColor}66`,
                        transition: 'transform 0.2s ease',
                      }}
                      onClick={() => handleStartCourse(course.name, course.id)}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-5" data-aos="fade-up">
            What Our Learners Say
          </h2>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            data-aos="fade-up"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div
                  className="p-4 h-100 d-flex flex-column justify-content-between shadow-sm"
                  style={{
                    borderRadius: '12px',
                    backgroundColor: '#F8F9FA',
                    minHeight: '250px',
                  }}
                >
                  <p className="text-muted fst-italic mb-4">“{t.text}”</p>
                  <div>
                    <h6 className="fw-bold mb-0">{t.name}</h6>
                    <small className="text-secondary">{t.role}</small>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Ready to Start Your Journey?
          </h2>
          <button
            className="btn btn-lg btn-primary px-5"
            data-aos="fade-up"
            data-aos-delay="100"
            onClick={() => navigate("/signup")}
          >
            Get Started Now
          </button>
          <p className="mt-4 text-secondary small mb-0" data-aos="fade-up" data-aos-delay="200">
            © 2025 CodeAdapt. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
