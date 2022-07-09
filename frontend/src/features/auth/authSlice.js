import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: {
    login: false,
    logout: false,
    register: false,
    refresh: false,
  },
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

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const errors = (error.response && error.response.data) || error.message || error.toString();
    return thunkAPI.rejectWithValue(errors);
  }
});

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
  try {
    return await authService.refreshToken();
  } catch (error) {
    const errors = (error.response && error.response.data) || error.message || error.toString();
    return thunkAPI.rejectWithValue(errors);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = {
        login: false,
        logout: false,
        register: false,
      };
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
        state.isSuccess.register = true;
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
        state.isSuccess.login = true;
        state.user = user;
      })
      .addCase(loginUser.rejected, (state, { payload: { message, errors } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        state.errors = errors;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess.logout = true;
        state.message = `Logged out ${state.user.name} successfully`;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload: { message, errors } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        state.errors = errors;
        state.user = null;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, { payload: user }) => {
        state.isLoading = false;
        state.isSuccess.refresh = true;
        state.user = user;
      })
      .addCase(refreshToken.rejected, (state, { payload: { message, errors } }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        state.errors = errors;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
