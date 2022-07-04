import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

const GoalItem = ({ _id, text, createdAt, ...props }) => {
  const dispatch = useDispatch();

  const deleteGoalHandler = () => {
    dispatch(deleteGoal(_id));
  };

  return (
    <div className="goal">
      <div>{new Date(createdAt).toLocaleString("en-ZA")}</div>
      <h2>{text}</h2>
      <button onClick={deleteGoalHandler} className="close">
        <FaTrash />
      </button>
    </div>
  );
};

export default GoalItem;
