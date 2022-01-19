import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider as ReduxProvider } from "react-redux";
import theme from "./theme";
import { AuthO_Client, AuthO_Domain } from "./config";
import { store } from "./redux/store";
import AuthProvider from "./context/auth";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AuthO_Domain}
      clientId={AuthO_Client}
      redirectUri={window.location.origin}
    >
      <ReduxProvider store={store}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
      </ReduxProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
