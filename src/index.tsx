import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./scss/index.scss";
import App from "./App";
import store from "./store";

import * as CONSTANTS from "./contants";

import * as serviceWorker from "./serviceWorker";

const THEME = createMuiTheme({
  palette: {
    primary: {
      main: CONSTANTS.PRIMARY_BLUE,
    },
  },
});

ReactDOM.render(
  <React.Fragment>
    <MuiThemeProvider theme={THEME}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
