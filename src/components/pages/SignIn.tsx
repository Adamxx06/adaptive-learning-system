import React, { useState } from "react";
import styles from "./SignIn.module.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // success or error message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/myproject/signin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // send JSON
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Login successful!");
        // redirect if needed
        // window.location.href = "/dashboard";
      } else {
        setMessage("❌ Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Server error. Please try again.");
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
            <button type="submit" className={`btn ${styles.btnOrangered}`}>
              Sign In
            </button>
          </div>

          {/* Feedback message */}
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

{/* SQL
  
  CREATE DATABASE myproject;
USE myproject;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- hashed password
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

  */}

  

{/* PHP (signin.php) 
  <?php
// signin.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // allow React frontend
header("Access-Control-Allow-Methods: POST");

// DB connection
$host = "localhost";
$user = "root";      // change to your DB username
$pass = "";          // change to your DB password
$db   = "myproject"; // your database

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "DB connection failed"]);
    exit;
}

// Get JSON body
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Prepared statement
$stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verify password
    if (password_verify($password, $row['password'])) {
        echo json_encode([
            "success" => true,
            "userId" => $row['id'],
            "message" => "Login successful"
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();

  */}