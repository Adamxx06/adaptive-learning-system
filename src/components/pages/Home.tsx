import "../../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

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
  { id: 1, name: "JavaScript", icon: "bi bi-filetype-js" },
  { id: 2, name: "HTML", icon: "bi bi-filetype-html" },
  { id: 3, name: "CSS", icon: "bi bi-filetype-css" },
  { id: 4, name: "React", icon: "bi bi-lightning-fill" },
  { id: 5, name: "PHP", icon: "bi bi-code-slash" },
  { id: 6, name: "SQL", icon: "bi bi-database-fill" },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleStartCourse = (courseName: string, courseId: number) => {
    // ✅ For JavaScript course only
    if (courseId === 1 || courseName === "JavaScript") {
      navigate(`/courses/${courseId}/topics`);
    } else {
      alert(`${courseName} course is coming soon!`);
    }
  };

  return (
    <>
      {/* Hero Section */}
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
                <button className="btn-modern btn-signup mb-xl-0 mb-2">Sign Up</button>
                <button className="btn-modern btn-signin mb-5 mb-xl-0">Sign In</button>
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

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold" data-aos="fade-up">
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
                className="col-12 col-sm-6 col-md-3 mb-4"
                data-aos="zoom-in"
                data-aos-delay={100 * (i + 1)}
              >
                <i className={`bi ${feature.icon} fs-1 mb-3 text-primary`}></i>
                <h5 className="fw-semibold">{feature.title}</h5>
                <p className="text-muted">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Popular Courses
          </h2>
          <div className="row">
            {courses.map((course, i) => (
              <div
                key={i}
                className="col-6 col-md-4 col-lg-2 mb-4"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <i className={`${course.icon} fs-1 text-primary mb-3`}></i>
                    <h5 className="fw-semibold">{course.name}</h5>
                    <button
                      className="btn btn-outline-primary btn-sm mt-2"
                      onClick={() => handleStartCourse(course.name, course.id)}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            What Our Learners Say
          </h2>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div
                  className="card shadow-sm h-100 text-center p-3"
                  style={{ minHeight: "280px" }}
                >
                  <p className="card-text">“{t.text}”</p>
                  <h6 className="fw-bold mt-3 mb-0">{t.name}</h6>
                  <small className="text-muted">{t.role}</small>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center bg-primary text-white">
        <div className="container" data-aos="zoom-in">
          <h2 className="fw-bold mb-3">Ready to Start Your Coding Journey?</h2>
          <p className="lead mb-4">
            Join CodeAdapt today and learn at your own pace with adaptive guidance.
          </p>
          <button
            className="btn btn-light btn-lg"
            onClick={() => navigate("/courses/1/topics")}
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
