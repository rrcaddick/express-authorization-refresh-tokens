import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const submitHandler = (formData) => {
    console.log(formData);
  };

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
              className="form-control"
              placeholder="Enter your name"
              {...register("name", { required: "Please enter a name" })}
            />
          </div>
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
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm password "
              {...register("confirmPassword", { required: "Please enter a confirm password" })}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
