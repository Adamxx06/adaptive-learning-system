import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../app.css"

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar navbar-expand-xl navbar-light bg-light shadow-sm position-relative">
      <div className="container position-relative">
        {/* Brand Logo */}
        <Link
          className="navbar-brand fw-bold position-relative z-3"
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{ cursor: "pointer" }}
          aria-label="Home"
        >
          <i className="bi bi-code-slash"></i> CodeAdapt
        </Link>

        {/* Hamburger/Close toggler */}
        <button
          className="navbar-toggler d-xl-none"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setMenuOpen(!isMenuOpen)}
          style={{ outline: "none", border: "none", background: "transparent" }}
        >
          {isMenuOpen ? (
            <span
              className="btn-close btn-close-dark p-0"
              role="button"
              tabIndex={0}
              aria-label="Close menu"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                display: "inline-block",
                background: `transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e") no-repeat center center`,
                backgroundSize: "1rem 1rem",
                cursor: "pointer",
                opacity: 1,
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
            />
          ) : (
            <span className="navbar-toggler-icon"></span>
          )}
        </button>

        {/* Desktop menu */}
        <div className="collapse navbar-collapse d-none d-xl-flex" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item me-lg-4">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Courses
              </NavLink>
            </li>
            <li className="nav-item me-lg-4">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item me-lg-4">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item me-lg-4">
              <NavLink
                to="/terms-of-service"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Terms of Service
              </NavLink>
            </li>
            <li className="nav-item me-lg-4"></li> {/* Spacer */}
            <li className="nav-item">
              <Link
                to="/signin"
                className="btn btn-signin btn-signin-mobile nav-link ms-2"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/signup"
                className="btn btn-register ms-2"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile full page overlay menu */}
        {isMenuOpen && (
          <div
            className="navbar-overlay d-xl-none"
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              top: "70px",
              left: 0,
              right: 0,
              bottom: 0,
              background: "white",
              paddingTop: "20px",
              zIndex: 1050,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <ul className="navbar-nav flex-column p-0" style={{ width: "100%" }}>
              {["courses", "about", "contact", "terms-of-service"].map((path) => (
                <li className="nav-item mb-3" key={path}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active-link" : ""}`
                    }
                    to={`/${path}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "1.3rem",
                      padding: "1rem 0",
                      width: "100%",
                      borderBottom: "none",
                    }}
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ")}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item mb-3" style={{ width: "100%" }}>
                <Link
                  className="btn"
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: "100%",
                    backgroundColor: "orangered",
                    border: "none",
                    color: "#fff",
                    padding: "1rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: "0.25rem",
                    textAlign: "center",
                    textDecoration: "none",
                    marginBottom: "1rem",
                  }}
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item" style={{ width: "100%" }}>
                <Link
                  className="btn"
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: "100%",
                    backgroundColor: "orangered",
                    border: "none",
                    color: "#fff",
                    padding: "1rem 0",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    borderRadius: "0.25rem",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
