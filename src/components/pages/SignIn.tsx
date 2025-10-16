import React, { useState } from "react";
import styles from "./SignIn.module.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost/codeadapt-backend/api/signin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        // ✅ Store session info
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role || "user");
        localStorage.setItem("firstName", data.firstName || "");
        localStorage.setItem("lastName", data.lastName || "");

        setMessage("✅ Login successful!");
        // Redirect to courses page
        window.location.href = "/courses";
      } else {
        setMessage(data.message || "❌ Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setMessage("⚠️ Could not connect to the server. Please try again later.");
    }
  };

  return (
    <main
      className={`container-fluid min-vh-100 d-flex justify-content-center align-items-center ${styles.bgLight}`}
    >
      <section className={`card shadow p-4 w-100 ${styles.signinCard}`}>
        <header>
          <h2 className="text-center mb-4">Account Login</h2>
        </header>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className={`btn ${styles.btnOrangered}`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Feedback */}
          {message && <p className="text-center small">{message}</p>}

          {/* Links */}
          <p className="text-center small mb-3">
            Don’t have an account? <a href="/signup">Register here</a>
          </p>
          <p className="text-center small mb-0">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
