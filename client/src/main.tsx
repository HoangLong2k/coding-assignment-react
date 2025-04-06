import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";
import { Loading } from "./components";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import setupStore from "./stores/configureStore/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={setupStore()}>
    <BrowserRouter>
      <Loading loading={undefined} />
      <App />
    </BrowserRouter>
  </Provider>
);
