import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "App";
import ConfigureProvider from "store";

ReactDOM.render(
  <ConfigureProvider>
    <App />
  </ConfigureProvider>,
  document.getElementById("root")
);

serviceWorker.register();
