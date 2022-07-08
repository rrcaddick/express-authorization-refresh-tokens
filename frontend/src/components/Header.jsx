import { useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    isError,
    isSuccess: { logout: logoutSuccess },
    message,
  } = useSelector((store) => store.auth);

  const logoutHandler = (e) => {
    dispatch(logout());
  };

  useEffect(() => {
    if (logoutSuccess) {
      toast.success(message);
      navigate("/login");
      dispatch(reset());
    }

    if (isError) {
      toast.error(message);
    }
  }, [logoutSuccess, isError, message, navigate, dispatch]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Goal Setter</Link>
      </div>
      <ul>
        {!user && (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <p>Logged in as {user.name}</p>
            </li>
            <li>
              <button className="btn" onClick={logoutHandler}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
