import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [serverErrors, setServerErrors] = useState({});
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "Raymond Caddick",
      email: "rrcaddick@gmail.com",
      password: "Whatever123",
      confirmPassword: "Whatever123",
    },
    mode: "all",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    isSuccess: { register: registerSuccess },
    user,
    message,
    errors: validationErrors,
  } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setServerErrors((state) => validationErrors);
      dispatch(reset());
    }
    if (registerSuccess) {
      setServerErrors({});
      toast.success(message);
      navigate("/login");
      dispatch(reset());
    }
  }, [user, isError, registerSuccess, message, validationErrors, navigate, dispatch]);

  const submitHandler = (userData) => {
    dispatch(registerUser(userData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              className={`form-control ${errors.name || serverErrors.name ? "invalid" : ""}`}
              placeholder="Enter your name"
              {...register("name", { required: "Please enter a name" })}
            />
            {(errors.name || serverErrors.name) && <p className="error">{errors.name?.message || serverErrors.name}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email || serverErrors.email ? "invalid" : ""}`}
              placeholder="Enter your email"
              {...register("email", { required: "Please enter a email" })}
            />
            {(errors.email || serverErrors.email) && (
              <p className="error">{errors.email?.message || serverErrors.email}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password || serverErrors.password ? "invalid" : ""}`}
              placeholder="Enter your password"
              {...register("password", { required: "Please enter a password" })}
            />
            {(errors.password || serverErrors.password) && (
              <p className="error">{errors.password?.message || serverErrors.password}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              className={`form-control ${errors.confirmPassword || serverErrors.confirmPassword ? "invalid" : ""}`}
              placeholder="Confirm password "
              {...register("confirmPassword", {
                validate: {
                  passwordsMatch: (confirmPassword) =>
                    confirmPassword === getValues().password || "Passwords do not match",
                },
              })}
            />
            {(errors.confirmPassword || serverErrors.confirmPassword) && (
              <p className="error">{errors.confirmPassword?.message || serverErrors.confirmPassword}</p>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block" disabled={!isValid}>
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
