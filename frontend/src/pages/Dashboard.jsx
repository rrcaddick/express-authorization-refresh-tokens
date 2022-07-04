import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoalForm } from "../components";
import { getGoals, reset } from "../features/goals/goalSlice";
import { Spinner } from "../components";
import { toast } from "react-toastify";
import { GoalItem } from "../components";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { goals, isLoading, isError, message } = useSelector((store) => store.goals);

  useEffect(() => {
    if (!user) navigate("/login");

    if (isError) {
      toast.error(message);
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 && (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} {...goal} />
            ))}
          </div>
        )}
        {goals.length <= 0 && <h3>You have not set any goals</h3>}
      </section>
    </>
  );
};

export default Dashboard;
