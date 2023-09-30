import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <GoogleOAuthProvider clientId="330119411422-j8bs3rcb4esgqt8a4g7uqqn0j51hddks.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
