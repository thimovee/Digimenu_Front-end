import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
//Wrapped de applicatie in een Provider en BrowserRouter zodat alle componenten toegang hebben tot de store en de router.
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
