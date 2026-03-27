import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import App, { routes } from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "sonner";

const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <Provider store={store}>
      <App router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);