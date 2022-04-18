import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import "./messages/handler";
import PostsContainer from "./PostsContainer";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <PostsContainer />
    </Provider>
  </React.StrictMode>
);
