import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../axios/api";
import { signUp } from "../../store/slice/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/registration/", { email });

      dispatch(signUp(email));

      // navigate to congratulations page
      navigate("/auth/congratulations", { state: { email } });
    } catch (err) {
      console.error(err);
      setError("Failed to send verification email. Maybe already registered.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-top">
        Already have an account?{" "}
        <Link to="/auth/login" className="signin-link">
          Sign in
        </Link>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
