import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <main className="container py-5">
      {/* Page Title */}
      <header className="text-center mb-5">
        <h1 className="fw-bold text-uppercase">Contact Us</h1>
        <p className="text-muted mt-3 fs-5">
          We'd love to hear from you! Whether you have a question about courses, pricing,
          features, or anything else, our team is ready to answer all your questions.
        </p>
      </header>

      {/* Contact Info */}
      <section className="row text-center mb-5">
        <article className="col-md-4 mb-4">
          <i className="bi bi-geo-alt fs-1 text-orangered"></i>
          <h5 className="fw-bold mt-3">Our Location</h5>
          <p className="text-muted">123 Learning Avenue, Benin City, Edo State, Nigeria</p>
        </article>
        <article className="col-md-4 mb-4">
          <i className="bi bi-envelope fs-1 text-orangered"></i>
          <h5 className="fw-bold mt-3">Email Us</h5>
          <p className="text-muted">support@codeadapt.com</p>
        </article>
        <article className="col-md-4 mb-4">
          <i className="bi bi-telephone fs-1 text-orangered"></i>
          <h5 className="fw-bold mt-3">Call Us</h5>
          <p className="text-muted">+234 801 234 5678</p>
        </article>
      </section>

      {/* Contact Form */}
      <section className="mx-auto" style={{ maxWidth: "700px" }}>
        <h3 className="fw-bold mb-4 text-center">Send Us a Message</h3>
        <form className="shadow-sm p-4 rounded bg-light">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label fw-semibold">Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="Enter subject" />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label fw-semibold">Message</label>
            <textarea
              id="message"
              rows={5}
              className="form-control"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "orangered", fontWeight: "600" }}
          >
            Send Message
          </button>
        </form>
      </section>

      {/* FAQ Section */}
      <section className="mt-5">
        <h3 className="fw-bold mb-3 text-center">Frequently Asked Questions</h3>
        <div className="accordion" id="faqAccordion">
          <article className="accordion-item">
            <h2 className="accordion-header" id="faqOne">
              <button
                className="accordion-button fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                How do I register for a course?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="faqOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Simply visit the "Courses" page, select your preferred course, and click on “Enroll Now”.
                You’ll be guided through the quick registration process.
              </div>
            </div>
          </article>

          <article className="accordion-item">
            <h2 className="accordion-header" id="faqTwo">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Can I contact support after office hours?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="faqTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Yes. You can reach out via email anytime, and our support team will respond within 24 hours.
              </div>
            </div>
          </article>

          <article className="accordion-item">
            <h2 className="accordion-header" id="faqThree">
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Do you offer group discounts?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="faqThree"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body text-muted">
                Absolutely! We offer discounts for schools, organizations, and teams enrolling together.
                Contact us directly to learn more.
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="text-center mt-5 pt-4 border-top">
        <p className="text-muted mb-0">
          We value your feedback and inquiries. Let's build something amazing together at{" "}
          <strong>CodeAdapt</strong> 🚀
        </p>
      </footer>
    </main>
  );
};

export default Contact;
