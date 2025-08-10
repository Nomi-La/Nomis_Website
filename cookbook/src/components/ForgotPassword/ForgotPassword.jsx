import "./ForgotPassword.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../axios/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/password-reset/", { email });

      navigate("/auth/congrats", { state: { email } });
    } catch (err) {
      console.error(err);
      setError("Could not send reset email. Check address.");
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder=" "
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
