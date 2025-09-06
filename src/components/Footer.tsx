import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className='bg-dark text-white py-4'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Link
                            className="navbar-brand fw-bold position-relative z-3"
                            to="/"
                        >
                            <h5><i className="bi bi-code-slash"></i>CodeAdapt</h5>
                        </Link>
                        <p className='mt-4'>Master coding with adaptive learning. Build real projects, track your progress, and become job-ready with a supportive community by your side</p>
                    </div>
                    <div className="col-md-4">
                        <h6>QUICK LINKS</h6>
                        <div className="footer-liks mt-4">
                            <p><Link to="/">Courses</Link></p>
                            <p><Link to="/about">About Us</Link></p>
                            <p><Link to="/contact">Contact</Link></p>
                            <p><Link to="/terms">Terms of Service</Link></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h6>COURSES</h6>
                        <ul className="list-unstyled course-links mt-4">
                            <li><a href="">HTML</a></li>
                            <li><a href="">CSS</a></li>
                            <li><a href="">JavaScript</a></li>
                            <li><a href="">React</a></li>
                        </ul>
                    </div>
                    <hr className='my-4' />
                    <div className="copy-right">
                        <p>&copy; 2025 CodeAdapt. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;