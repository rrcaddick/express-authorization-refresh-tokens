import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: false,
};

export const createGoal = createAsyncThunk("goal/createGoal", async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.createGoal(goalData, token);
  } catch (error) {
    const message = (error.response && error.response.data) || error.message || error.toString();
    thunkAPI.rejectWithValue(message);
  }
});

// Get user alls
export const getGoals = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error) {
    const message = (error.response && error.response.data) || error.message || error.toString();
    thunkAPI.rejectWithValue(message);
  }
});

export const deleteGoal = createAsyncThunk("goal/deleteGoal", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.deleteGoal(id, token);
  } catch (error) {
    const message = (error.response && error.response.data) || error.message || error.toString();
    thunkAPI.rejectWithValue(message);
  }
});

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, { payload: { goal } }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(goal);
      })
      .addCase(createGoal.rejected, (state, { payload: { errors, message } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, { payload: { goals } }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = goals;
      })
      .addCase(getGoals.rejected, (state, { payload: { errors, message } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, { payload: { id } }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter((g) => g._id !== id);
      })
      .addCase(deleteGoal.rejected, (state, { payload: { errors, message } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
