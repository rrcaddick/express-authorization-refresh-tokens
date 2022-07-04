import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "clpcaddick@gmail.com",
      password: "Whatever123",
    },
    mode: "all",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, user, message } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      toast.success(`User ${user?.name} logged in successfully`);
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitHandler = (userData) => {
    dispatch(loginUser(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "invalid" : ""}`}
              placeholder="Enter your email"
              {...register("email", { required: "Please enter a email" })}
            />
            {errors.email && <p className="error">{errors.email?.message}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "invalid" : ""}`}
              placeholder="Enter your password"
              {...register("password", { required: "Please enter a password" })}
            />
            {errors.password && <p className="error">{errors.password?.message}</p>}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block" disabled={!isValid}>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
