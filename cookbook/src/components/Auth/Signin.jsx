import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "../../axios/api";
import { loginUser } from "../../store/slice/authSlice";
import "./signin.scss";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/token/", {
        email,
        password,
      });

      const { access, refresh, user } = response.data;

      dispatch(
        loginUser({
          user,
          accessToken: access,
          refreshToken: refresh,
        })
      );

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-top">
        <p>
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>

      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Sign In</button>

        <Link to="/auth/forgot-password" className="forgot-link">
          Forgot password?
        </Link>
      </form>
    </div>
  );
}
