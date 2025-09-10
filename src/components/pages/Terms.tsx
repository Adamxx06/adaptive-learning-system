import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

interface TermSectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const TermSection: React.FC<TermSectionProps> = ({ number, title, children }) => (
  <section className="mb-4">
    <h4>{number}. {title}</h4>
    <p>{children}</p>
  </section>
);

const TermsOfService = () => {
  return (
    <main className="container my-5" aria-label="Terms of Service">
      <header>
        <h1>Terms of Service</h1>
        <p>
          Welcome to <b>CodeAdapt</b>. By accessing or using our platform, you agree to comply with these Terms of Service. Please read them carefully before using our services.
        </p>
      </header>
      <article className="terms">
        <TermSection number="1" title="Acceptance of Terms">
          By using our adaptive learning platform, you accept and agree to these Terms of Service and all applicable laws. If you do not agree, please do not use the platform.
        </TermSection>
        <TermSection number="2" title="Intellectual Property Rights">
          All content, software, algorithms, and associated materials provided by Adaptive Learning System are the intellectual property of the project owners. You are granted a limited, non-transferable license to use the system for educational and personal development purposes only. Copying, distributing, or reselling is prohibited.
        </TermSection>
        <TermSection number="3" title="Responsible Use">
          You agree to use our platform ethically and lawfully. The Adaptive Learning System is not responsible for any damages, losses, or legal implications resulting from misuse. You must not use the system for fraudulent or malicious activities.
        </TermSection>
        <TermSection number="4" title="User Data and Privacy">
          Your privacy is important to us. We are committed to protecting your personal information and using it only in accordance with our Privacy Policy. By using our platform, you consent to the collection and use of your data as described in the Privacy Policy.
        </TermSection>
        <TermSection number="5" title="Limitation of Liability">
          In no event shall Adaptive Learning System or its owners be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform. Your sole remedy for dissatisfaction with the platform is to stop using it.
        </TermSection>
        <TermSection number="6" title="Access and Termination">
          We reserve the right to suspend or terminate access to the platform if these terms are violated or unauthorized activities are detected.
        </TermSection>
        <TermSection number="7" title="Updates and Modifications">
          We may update or modify these Terms of Service from time to time. Any changes will be effective immediately upon posting the revised terms on our platform. Your continued use of the platform after any changes indicates your acceptance of the new terms.
        </TermSection>
        <TermSection number="8" title="Indemnification">
          You agree to indemnify and hold harmless the Adaptive Learning System creators from claims, damages, or expenses resulting from your misuse of the platform or violation of these Terms.
        </TermSection>
        <TermSection number="9" title="Governing Law">
          These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which the project owners reside, without regard to its conflict of law principles.
        </TermSection>
        <TermSection number="10" title="Contact Information">
          If you have any questions or concerns about these Terms of Service, please <Link to="/contact">contact us</Link>.
        </TermSection>
      </article>
    </main>
  );
};

export default TermsOfService;
