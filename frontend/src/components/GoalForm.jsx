import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createGoal, reset } from "../features/goals/goalSlice";

const GoalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset: resetForm,
  } = useForm({
    initialState: {
      text: "",
    },
    mode: "all",
  });
  const dispatch = useDispatch();

  const { goals, isLoading, isSuccess, isError, message } = useSelector((store) => store.goals);

  useEffect(() => {
    if (isSuccess) resetForm();
  }, [isSuccess, resetForm, dispatch, reset]);

  const submitHandler = (goalData) => {
    dispatch(createGoal(goalData));
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            className={`form-control ${errors.text && "invalid"}`}
            id="text"
            {...register("text", { required: "Please enter a goal" })}
          />
          {errors.text && <p className="error">{errors.text?.message}</p>}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block" disabled={!isValid}>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
