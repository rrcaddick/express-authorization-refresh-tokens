import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitHandler = (formData) => {
    console.log(formData);
  };

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
              className="form-control"
              placeholder="Enter your email"
              {...register("email", { required: "Please enter a email" })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              {...register("password", { required: "Please enter a password" })}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
