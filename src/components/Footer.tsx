
import { Link } from "react-router-dom";
import styles from "./Footer.module.css"; 

type LinkItem = {
  label: string;
  path: string;
};

const quickLinks: LinkItem[] = [
  { label: "Courses", path: "/courses" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Terms of Service", path: "/terms" },
];

const courseLinks: LinkItem[] = [
  { label: "HTML", path: "/courses/html" },
  { label: "CSS", path: "/courses/css" },
  { label: "JavaScript", path: "/courses" },
  { label: "React", path: "/courses/react" },
];

const Footer = () => {
  return (
    <footer className={`${styles.footer} text-white py-4`}>
      <div className="container">
        <div className="row">

          {/* Brand & Description */}
          <div className="col-md-4">
            <Link className="navbar-brand fw-bold" to="/">
              <h5>
                <i className="bi bi-code-slash"></i> CodeAdapt
              </h5>
            </Link>
            <p className="mt-4">
              Master coding with adaptive learning. Build real projects, track
              your progress, and become job-ready with a supportive community by
              your side.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled mt-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="col-md-4">
            <h6 className="fw-bold">Courses</h6>
            <ul className="list-unstyled mt-4">
              {courseLinks.map((course) => (
                <li key={course.path}>
                  <Link to={course.path} className={styles.link}>
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <hr className="my-4" />
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} CodeAdapt. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
