import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errors: {},
};

export const registerUser = createAsyncThunk("auth/registerUser", async (user, thunkAPI) => {
  try {
    return await authService.registerUser(user);
  } catch (error) {
    const errors = (error.response && error.response.data) || error.message || error.toString();
    return thunkAPI.rejectWithValue(errors);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user);
  } catch (error) {
    const errors = (error.response && error.response.data) || error.message || error.toString();
    return thunkAPI.rejectWithValue(errors);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload: user }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = `User ${user.name} created successfully`;
      })
      .addCase(registerUser.rejected, (state, { payload: { message, errors } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        state.errors = errors;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload: user }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = user;
      })
      .addCase(loginUser.rejected, (state, { payload: { message, errors } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        state.errors = errors;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
