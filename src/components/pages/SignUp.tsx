import React, { useState } from "react";

// 1. DEFINE INTERFACES for component props and server response

// Interface for the props of the MessageDisplay component
interface MessageProps {
  message: string;
  type: 'success' | 'error' | ''; // Explicitly allow only these values
}

// Interface for the expected JSON response from the PHP backend
interface SignUpResponse {
  success: boolean;
  message: string;
}


// This is a simple in-component message display component
// FIX 1 & 2: Added explicit MessageProps type to component arguments
const MessageDisplay: React.FC<MessageProps> = ({ message, type }) => {
  if (!message) return null;
  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  
  return (
    <div className={`alert ${alertClass} rounded-2 p-2 mb-3`} role="alert">
      {message}
    </div>
  );
};

const SignUp: React.FC = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Typecasting the initial state to MessageProps to satisfy the compiler
  const [status, setStatus] = useState<MessageProps>({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ message: '', type: '' });
    setIsSubmitting(true);

    try {
      const API_URL = "http://localhost/codeadapt-backend/api/signup.php";
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      // Declare data with the SignUpResponse interface
      let data: SignUpResponse; 
      
      try {
          // FIX 3, 4, 5: TypeScript now knows 'data' has 'success' and 'message' properties
          data = await response.json() as SignUpResponse; 
      } catch (jsonError) {
          // If the server sends something that isn't valid JSON, fall to the catch block
          console.error("Non-JSON response received:", await response.text());
          throw new Error("Received an invalid response from the server. Check PHP output.");
      }

      console.log("Server response:", data);

      if (response.ok && data.success) { // Check both HTTP status and internal success flag
        setStatus({ 
          message: data.message || "Registration successful! You can now log in.", 
          type: 'success' 
        });
        // Clear form fields on success
        setFirstName("");
        setLastName("");
        setLastName("");
        setEmail("");
        setPassword("");
      } else {
        // Handle explicit failure messages (like email already exists)
        setStatus({ 
          message: data.message || `Registration failed. HTTP Status: ${response.status}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      // Display the generic error if the network connection itself failed
      setStatus({ 
        message: "Failed to connect to the backend server. Please check your XAMPP/PHP server is running and the URL is correct.", 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div
        className="card p-4 shadow w-100 rounded-lg"
        style={{ maxWidth: "500px", margin: "20px 0" }}
      >
        <h2 className="text-center mb-4">Create Your Account</h2>
        
        {/* Status Message Display */}
        <MessageDisplay message={status.message} type={status.type} />
        
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control rounded-lg"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control rounded-lg"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control rounded-lg"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-lg"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn rounded-lg"
              style={{ backgroundColor: "orangered", color: "white" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>

          {/* Already have account */}
          <p className="text-center small mb-0">
            Already have an account? <a href="/signin">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;