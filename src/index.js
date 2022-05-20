import React from "react";
import store from "redux/store";
import Application from "./app";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/style.css";
import "../node_modules/antd/dist/antd.css";

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Application />
      </ToastProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
