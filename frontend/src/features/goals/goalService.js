import { authAxios } from "../../config/axiosInterceptor";

const API_URL = "/api/goals/";

// Create user goal
const createGoal = async (goalData) => {
  const response = await authAxios.post(API_URL, goalData);
  return response.data;
};

// Get all user goals
const getGoals = async () => {
  const response = await authAxios.get(API_URL);
  return response.data;
};

// Delete user goals
const deleteGoal = async (goalId) => {
  const response = await authAxios.delete(`${API_URL}${goalId}`);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
