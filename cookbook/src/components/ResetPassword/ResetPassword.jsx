import "./ResetPassword.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/api";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await api.post("/auth/password-reset/validation/", {
        email,
        code: validationCode,
        password,
        password_repeat: confirmPassword,
      });

      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Check code or try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-right">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="code">Validation Code</label>
            <input
              id="code"
              type="text"
              value={validationCode}
              onChange={(e) => setValidationCode(e.target.value)}
              required
            />
          </div>

          <div className="password-pair top-gap">
            <div className="input-group">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Repeat Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="submit-btn" type="submit">
            Set a New Password
          </button>
        </form>
      </div>
    </div>
  );
}
