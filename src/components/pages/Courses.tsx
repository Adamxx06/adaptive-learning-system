import { useEffect, useState } from "react";
import AOS from 'aos'; // 1. IMPORT AOS
import 'aos/dist/aos.css'; // You must import the CSS globally (or here)
import { listCourses } from "../../services/api";
import { useNavigate } from "react-router-dom";

// Define the core types used by the component
type Course = {
  id: number;
  title: string;
  description: string;
  image?: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

// --- MOCK DATA ---
const instructor = {
  name: "Alex Thorne",
  title: "Principal Software Engineer & Course Instructor",
  bio: "Alex is a veteran developer with 10+ years of experience leading projects at top tech companies. He specializes in creating scalable, performance-driven front-end architectures using modern tools. He's passionate about sharing the 'why' behind the code.",
  image: "path/to/alex-thorne-image.jpg",
};

const testimonials: Testimonial[] = [
  {
    quote: "This course is the definitive guide to professional development. The focus on best practices and tooling changed how I approach every project. It truly transformed my career.",
    name: "Sarah K.",
    title: "Senior Front-End Developer @ TechCorp",
  },
  {
    quote: "The deep dive into asynchronous JS and performance tuning was invaluable. Far beyond any other online course I've taken. The mentor support is exceptional.",
    name: "Mark T.",
    title: "Web Developer & Freelancer",
  },
];

// Helper function to map course titles to icons and color accents
const getCourseVisuals = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('javascript') || t.includes('react')) {
        return { icon: 'bi-file-earmark-code', color: '#f7df1e' };
    }
    if (t.includes('html')) {
        return { icon: 'bi-filetype-html', color: '#e34f26' };
    }
    if (t.includes('css')) {
        return { icon: 'bi-filetype-css', color: '#1572b6' };
    }
    if (t.includes('sql') || t.includes('php')) {
        return { icon: 'bi-database', color: '#4f5b93' };
    }
    return { icon: 'bi-code-slash', color: '#6c757d' };
};
// --- END MOCK DATA & HELPERS ---


export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 2. INITIALIZE AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // global duration for animations
      once: true, // whether animation should happen only once - default
    });
    // Fetching logic below (original code)
    async function fetchCourses() {
      try {
        const data: Course[] = await listCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses, using mock data:", err); 
        setCourses([
            {id: 1, title: "JavaScript Architecture Mastery", description: "Deep dive into ES6+, asynchronous patterns, and performance.", duration: "40 Hours", difficulty: "Advanced"},
            {id: 2, title: "Modern HTML5 & Accessibility", description: "Build semantic, accessible, and SEO-friendly document structures.", duration: "15 Hours", difficulty: "Beginner"},
            {id: 3, title: "CSS Layouts & Animation", description: "Master Flexbox, Grid, and high-performance CSS animations.", duration: "20 Hours", difficulty: "Intermediate"},
        ] as Course[]);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);


  // Handler for course navigation (Dynamic ID included)
  const handleViewCurriculum = (courseId: number) => {
    navigate(`/courses/${courseId}/topics`); 
  };

  if (loading)
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-gear-fill spin me-2"></i> Loading courses...
      </div>
    );

  // 3. ADD data-aos ATTRIBUTES TO SECTIONS AND ELEMENTS
  return (
    <>
      {/* 1. HERO SECTION (data-aos="fade-down" on main elements) */}
      <section
        className="text-center text-white py-5 position-relative"
        style={{
          background: "linear-gradient(135deg, #002147, #0d6efd)",
        }}
      >
        <div className="container position-relative py-4">
          <h1 className="display-3 fw-bolder mb-3" data-aos="fade-down" data-aos-easing="ease-out-back">
            Master the Craft: Professional Front-End Development
          </h1>
          <p className="lead mb-4 fw-light" data-aos="fade-up" data-aos-delay="300">
            Transition from coding knowledge to **professional application**. Learn architecture, tooling, and best practices from a 10-year industry expert.
          </p>
          <button
            className="btn btn-warning btn-lg fw-bold px-5 py-3 shadow-lg"
             data-aos="zoom-in" data-aos-delay="600"
            style={{
              color: "#002147",
              backgroundColor: "#ffc107",
              border: "none",
            }}
            onClick={() => courses.length > 0 && handleViewCurriculum(courses[0].id)}
          >
            Start Your Mastery Today
          </button>
        </div>
      </section>

      {/* --- */}

      {/* 1.5. Key Statistics Bar (data-aos="fade-up" on the container) */}
      <section className="py-4 shadow-sm" style={{ backgroundColor: "#002147" }} data-aos="fade-up" data-aos-duration="800">
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="0">
              <h3 className="fw-bolder" style={{ color: "#ffc107" }}>3,000+</h3>
              <p className="small mb-0">Students Enrolled</p>
            </div>
            <div className="col-md-3 col-6" data-aos="zoom-in" data-aos-delay="100">
              <h3 className="fw-bolder" style={{ color: "#ffc107" }}>4.9/5</h3>
              <p className="small mb-0">Average Course Rating</p>
            </div>
            <div className="col-md-3 col-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
              <h3 className="fw-bolder" style={{ color: "#ffc107" }}>72%</h3>
              <p className="small mb-0">Promotion Rate After Completion</p>
            </div>
            <div className="col-md-3 col-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="300">
              <h3 className="fw-bolder" style={{ color: "#ffc107" }}>6 Months</h3>
              <p className="small mb-0">Career Coaching Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 2. COURSE GRID (Individual cards with staggered 'fade-up' animation) */}
      <section className="container py-5">
        <h2 className="fw-bolder text-center mb-5" style={{ color: "#002147" }} data-aos="fade-up">
          The Essential Professional Curriculum
        </h2>
        <div className="row g-4">
          {courses.length > 0 ? (
            courses.map((course, index) => { // Use index for delay
              const visuals = getCourseVisuals(course.title);
              
              const difficultyColor = 
                  course.difficulty === 'Advanced' ? 'text-danger' : 
                  course.difficulty === 'Intermediate' ? 'text-warning' : 
                  'text-success';
              
              return (
                <div 
                    className="col-sm-6 col-md-4 col-lg-3" 
                    key={course.id} 
                    data-aos="fade-up" // Animation on card
                    data-aos-delay={index * 150} // Staggered delay for cool effect
                    data-aos-anchor-placement="top-bottom"
                >
                  <div
                    className="card h-100 border-0 shadow-sm"
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      borderRadius: "15px",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                    onClick={() => handleViewCurriculum(course.id)} 
                    // Advanced Hover Effect
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1.0)';
                        e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                    }}
                  >
                    
                    {/* Advanced Card Header: Icon and Gradient */}
                    <div 
                        className="p-3 d-flex align-items-center justify-content-center"
                        style={{ 
                            height: "120px",
                            background: `linear-gradient(135deg, ${visuals.color}AA, #002147)`, 
                            position: 'relative'
                        }}
                    >
                        {/* Technology Icon */}
                        <i 
                            className={`bi ${visuals.icon}`} 
                            style={{ fontSize: '3.5rem', color: '#fff' }} 
                        ></i>
                        {/* Difficulty badge positioned at the top-right corner */}
                        <span 
                            className={`badge text-white px-3 py-2 position-absolute top-0 end-0 rounded-pill m-2 fw-bold`}
                            style={{ backgroundColor: visuals.color, textShadow: '0 0 5px rgba(0,0,0,0.5)' }}
                        >
                            {course.difficulty}
                        </span>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title fw-bold mb-2"
                        style={{ color: "#002147" }}
                      >
                        {course.title}
                      </h5>
                      {/* Key Metrics */}
                      <div className="d-flex justify-content-start mb-2 small text-secondary">
                          <span className="me-3"><i className="bi bi-clock me-1"></i> {course.duration || 'N/A'}</span>
                          <span className={`fw-bold ${difficultyColor}`}>
                            <i className="bi bi-bar-chart-fill me-1"></i> {course.difficulty}
                          </span>
                      </div>

                      <p className="card-text text-muted flex-grow-1 small">{course.description}</p>
                    </div>

                    <div className="card-footer bg-light border-0 text-center"> 
                      <button
                        className="btn btn-sm fw-bold w-75"
                        style={{
                          backgroundColor: "#ff4500", 
                          color: "#fff",
                          transition: "0.3s",
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleViewCurriculum(course.id);
                        }}
                      >
                        View Curriculum
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-4">
              <p className="lead text-muted">No courses found. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* --- */}
      
      {/* 3. Detailed Learning Outcomes */}
      <section className="py-5" style={{ background: "#f8f9fa" }} data-aos="fade-in">
        <div className="container">
          <h2 className="fw-bolder text-center mb-5" style={{ color: "#002147" }} data-aos="fade-up">
            Skills Gained From Our Core Curriculum
          </h2>
          <div className="row">
            <div className="col-md-6 mb-4" data-aos="fade-right">
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill fs-5 me-3" style={{ color: "#0d6efd" }}></i>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: "#002147" }}>Craft Component-Based UIs</h5>
                    <p className="text-muted small mb-0">Decompose complex interfaces into reusable, tested components, ready for frameworks like React or Vue.</p>
                  </div>
                </li>
                {/* ... other list items ... */}
              </ul>
            </div>
            <div className="col-md-6 mb-4" data-aos="fade-left">
              <ul className="list-unstyled">
                {/* ... list items ... */}
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill fs-5 me-3" style={{ color: "#0d6efd" }}></i>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: "#002147" }}>Manage State with Confidence</h5>
                    <p className="text-muted small mb-0">Design application state flow using the Redux pattern and effectively debug complex data mutations.</p>
                  </div>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill fs-5 me-3" style={{ color: "#0d6efd" }}></i>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: "#002147" }}>Implement Unit & Integration Tests</h5>
                    <p className="text-muted small mb-0">Utilize testing frameworks like Jest to write comprehensive test suites, ensuring code quality and preventing regressions.</p>
                  </div>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill fs-5 me-3" style={{ color: "#0d6efd" }}></i>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: "#002147" }}>Build a Full API Mocking Layer</h5>
                    <p className="text-muted small mb-0">Create a robust client-side mocking system for front-end development, minimizing dependency on back-end readiness.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 4. INSTRUCTOR/AUTHORITY SECTION */}
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container">
          <h2 className="fw-bolder text-center mb-5" style={{ color: "#002147" }}>
            Your Mentor: 10 Years of Industry Expertise
          </h2>
          <div className="row align-items-center" data-aos="fade-in" data-aos-delay="200">
            <div className="col-md-4 text-center">
              <div
                 data-aos="zoom-in" data-aos-duration="600"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  backgroundColor: "#002147",
                  margin: "0 auto 20px",
                  border: "5px solid #ff4500",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem'
                }}
              >
                {instructor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="fw-bold mb-1">{instructor.name}</h4>
              <p className="text-muted small">{instructor.title}</p>
            </div>
            <div className="col-md-8" data-aos="fade-up">
              <p className="lead">{instructor.bio}</p>
              <div className="d-flex justify-content-start flex-wrap">
                <span className="badge bg-secondary me-2 mb-2">Architectural Patterns</span>
                <span className="badge bg-secondary me-2 mb-2">Performance Tuning</span>
                <span className="badge bg-secondary me-2 mb-2">Full-Stack Leadership</span>
                <span className="badge bg-secondary me-2 mb-2">CI/CD & DevOps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 5. WHY LEARN WITH US (Refined) */}
      <section
        className="py-5 text-white"
        style={{ backgroundColor: "#001f3f" }}
         data-aos="zoom-in-up"
      >
        <div className="container text-center">
          <h2 className="fw-bolder mb-5" style={{ color: "#ffc107" }} data-aos="fade-up"> 
            The Professional Edge: What We Guarantee
          </h2>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="fade-right" data-aos-delay="0">
              <i className="bi bi-tools fs-1 text-warning mb-3"></i>
              <h5 className="fw-bold">Modern Tooling Mastery</h5>
              <p className="text-light">
                You'll configure and deploy professional pipelines with **Webpack, Babel, ESLint, and Git**.
              </p>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="150">
              <i className="bi bi-file-earmark-code-fill fs-1 text-info mb-3"></i>
              <h5 className="fw-bold">Architecture & Scalability</h5>
              <p className="text-light">
                Move past basic syntax. Learn **BEM, Module Patterns, and Clean Code** principles for large apps.
              </p>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-left" data-aos-delay="300">
              <i className="bi bi-briefcase-fill fs-1 text-success mb-3"></i>
              <h5 className="fw-bold">Portfolio-Ready Projects</h5>
              <p className="text-light">
                Build real-world projects, including a fully tested, deployed single-page application (SPA).
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* 6. ADAPTIVE LEARNING & SUPPORT SYSTEM */}
      <section className="py-5" data-aos="fade-in">
        <div className="container">
            <h2 className="fw-bolder text-center mb-5" style={{ color: "#002147" }} data-aos="fade-up">
                Adaptive Learning & 24/7 Expert Support
            </h2>
            <div className="row g-5 align-items-center">
                <div className="col-md-6" data-aos="fade-right" data-aos-delay="200">
                    <h3 className="fw-bold mb-3" style={{ color: "#ff4500" }}>
                        Your Personalized Path to Mastery
                    </h3>
                    <p className="lead text-muted">
                        Our platform continuously assesses your progress, automatically adjusting content depth and quizzes to match your unique learning pace and prior knowledge.
                    </p>
                    {/* ... list items ... */}
                </div>
                <div className="col-md-6 text-center" data-aos="zoom-in" data-aos-delay="400">
                    <div className="p-4 rounded shadow-lg" style={{ backgroundColor: '#fff', border: '1px solid #ddd' }}>
                         <h5 className="text-muted fw-light">Visualizing the Adaptive Flow</h5>
                         
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- */}

      {/* 7. SOCIAL PROOF/TESTIMONIALS */}
      <section className="py-5 bg-light" data-aos="fade-up">
        <div className="container">
          <h2 className="fw-bolder text-center mb-5" style={{ color: "#002147" }}>
            Results Speak for Themselves
          </h2>
          <div className="row g-4">
            {testimonials.map((t, index) => (
              <div className="col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 200}>
                <div className="p-4 border-start border-4 h-100 shadow-sm" style={{ borderColor: "#ff4500 !important" }}>
                  <i className="bi bi-quote fs-3 text-muted me-2"></i>
                  <p className="fst-italic mb-3">"{t.quote}"</p>
                  <footer className="blockquote-footer">
                    <cite title={t.title}>{t.name}</cite>
                    <span className="d-block small">{t.title}</span>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* 8. FINAL CTA SECTION */}
      <section
        className="text-center py-5"
        style={{
          background: "#f8f9fa",
        }}
         data-aos="zoom-in" data-aos-duration="600"
      >
        <div className="container">
          <h2 className="fw-bolder mb-3" style={{ color: "#002147" }}>
            Stop Copying Code. Start Building Architectures.
          </h2>
          <p className="lead text-muted mb-4">
            Join the ranks of high-performing developers. The next cohort starts soon.
          </p>
          <button
            className="btn btn-lg fw-bold shadow-lg"
            style={{
              backgroundColor: "#ff4500",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 40px",
              border: "none",
            }}
            onClick={() => courses.length > 0 && handleViewCurriculum(courses[0].id)}
          >
            Secure Your Spot <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </section>
    </>
  );
}