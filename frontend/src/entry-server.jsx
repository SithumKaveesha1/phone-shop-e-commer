import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import App, { routes } from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "sonner";

export async function render(url) {
  const { query } = createStaticHandler(routes);
  const request = new Request(`http://localhost${url}`);
  const context = await query(request);

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(routes, context);

  const html = renderToString(
    <StrictMode>
      <Provider store={store}>
        <App router={router} />
        <Toaster />
      </Provider>
    </StrictMode>
  );

  return { html };
}