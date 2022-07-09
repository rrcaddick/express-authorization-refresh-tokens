import axios from "axios";
import { EnhancedStore } from "@reduxjs/toolkit";
import poes from "../features/auth/authService";
import { refreshToken } from "../features/auth/authSlice";
export const authAxios = axios.create();

/** @param {EnhancedStore} store */
const authenticationProvider = (store) => {
  // Add access token to all requests
  authAxios.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.user.token;
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },

    (error) => {
      Promise.reject(error);
    }
  );

  // Refresh access token
  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        // const { token } = await poes.refreshToken();
        store.dispatch(refreshToken());
        // authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return authAxios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};

export default authenticationProvider;
