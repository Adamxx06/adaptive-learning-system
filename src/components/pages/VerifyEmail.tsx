import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/codeadapt-backend/api";


export default function VerifyEmail() {
  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    fetch(`${API_BASE}/verify-email.php?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus(data.message);
          setSuccess(true);
        } else {
          setStatus(`❌ ${data.message}`);
          setSuccess(false);
        }
      })
      .catch(() => {
        setStatus("⚠️ Server error. Please try again later.");
        setSuccess(false);
      });
  }, [searchParams]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4 text-center" style={{ maxWidth: "450px" }}>
        <h3 className="mb-3" style={{ color: success ? "#16a34a" : "#dc2626" }}>
          {status}
        </h3>

        {success ? (
          <>
            <p>Your account is now activated. You can log in to continue.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/signin")}
            >
              Go to Login
            </button>
          </>
        ) : (
          <p>If the link expired or is invalid, please request a new verification email.</p>
        )}
      </div>
    </div>
  );
}
