import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp: React.FC = () => {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost/signup.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // send JSON
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (data.success) {
      alert("Registration successful!");
      // Optionally redirect to login
      window.location.href = "/signin";
    } else {
      alert(data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to connect to server.");
  }
};

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center px-3">
      <div
        className="card p-4 shadow w-100"
        style={{ maxWidth: "500px", margin: "20px 0" }}
      >
        <h2 className="text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "orangered", color: "white" }}
            >
              Register
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


{/* PHP
  
 <?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // allow React dev server
header("Access-Control-Allow-Headers: Content-Type");

// Connect to database
$mysqli = new mysqli("localhost", "root", "", "your_database");
if ($mysqli->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);
$firstName = $mysqli->real_escape_string($data["firstName"]);
$lastName = $mysqli->real_escape_string($data["lastName"]);
$email = $mysqli->real_escape_string($data["email"]);
$password = $data["password"];

// Check if email exists
$check = $mysqli->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered"]);
    exit;
}

// Insert new user
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $mysqli->prepare("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $firstName, $lastName, $email, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed"]);
}
?>
 
  */}





  {/* SQL
    
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    
    
    */}