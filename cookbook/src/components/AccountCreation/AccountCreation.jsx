import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/api";
import "./AccountCreation.scss";

export default function AccountCreation() {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.patch("/auth/registration/validation/", {
        code,
        username,
        email,
        password,
        password_repeat: repeatPassword,
      });

      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError("Could not create account. Check your code or try again.");
    }
  };

  return (
    <div className="account-creation-container">
      <form className="account-creation-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <label htmlFor="code">Validation Code</label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder=" "
          required
        />

        <div className="row">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder=" "
              required
            />
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
