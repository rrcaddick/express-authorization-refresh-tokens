import axios from "axios";
import authService from "../features/auth/authService";
import { refreshAccessToken } from "../features/auth/authSlice";
import { logout } from "../features/auth/authSlice";
export const authAxios = axios.create();

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
      console.log("Error here");
      Promise.reject(error);
    }
  );

  // Refresh access token
  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;

      if (error?.response?.status === 403) {
        const { token } = await authService.refreshToken();
        store.dispatch(refreshAccessToken(token));

        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return axios(config);
      }

      // Logout user if they are not authorized
      if (error?.response?.status === 401) {
        return store.dispatch(logout());
      }

      return Promise.reject(error);
    }
  );
};

export default authenticationProvider;
