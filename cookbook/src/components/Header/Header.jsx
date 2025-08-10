import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slice/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("access-token");
  let user = localStorage.getItem("user");

  if (user) {
    try {
      user = JSON.parse(user);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      user = null;
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <>
      <header className="navbar">
        <h2
          className="message"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Cookbook-Recipe App
        </h2>
        {token && user ? (
          <>
            <h2 className="message" onClick={() => navigate(`/user/${user.username}`)}>Hello, {user.username}</h2>
            <button className="login" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth/login" className="login">
            Login
          </Link>
        )}
      </header>
    </>
  );
}
