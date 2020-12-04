import React, { useEffect } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setAuthAction } from "actions/auth/auth.action";
import { Action } from "redux-actions";

import { AuthInfo } from "app/models/user";

interface Props {
  token?: string;
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  setAuthAction: (authInfo: AuthInfo) => Action<any>;
}

const AuthRoute = ({
  token,
  Component,
  path,
  exact = false,
  setAuthAction,
}: Props): JSX.Element | null => {
  const storageAuth: AuthInfo = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "{}"),
  };

  const loginFromStorage =
    (token === null || token === "") &&
    storageAuth.token !== null &&
    storageAuth.token !== "" &&
    storageAuth.user !== null;

  useEffect(() => {
    loginFromStorage && setAuthAction(storageAuth);
  }, [loginFromStorage, setAuthAction, storageAuth]);

  if (loginFromStorage) return null;

  const isAuthed = token !== null && token !== "";
  const message = "Please log in to view this page";

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                message,
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state: {
  auth: {
    token: string;
  };
}) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthAction: (authInfo: AuthInfo) => dispatch(setAuthAction(authInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
