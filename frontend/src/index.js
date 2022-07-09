import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import authenticationProvider from "./config/axiosInterceptor";

const container = document.getElementById("root");
const root = createRoot(container);

authenticationProvider(store);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
