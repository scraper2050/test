import { Action } from 'redux-actions';
import { Dispatch } from 'redux';
import { AuthInfo } from 'app/models/user';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setAuthAction } from 'actions/auth/auth.action';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { setRouteDataAction, setRouteTitleAction } from 'actions/route/route.action';

interface Props {
  token?: string;
  tokenCustomerAPI?: string;
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  title?: string;
  actionData?: {
    title: string,
    link: string
  };
  setAuthAction: (authInfo: AuthInfo) => Action<any>;
  hasAccess?: boolean;
}

function AuthRoute({
  token,
  tokenCustomerAPI,
  Component,
  path,
  title = '',
  actionData,
  exact = false,
  setAuthAction,
  hasAccess = true
}: Props): JSX.Element | null {
  const storageAuth: AuthInfo = {
    'token': localStorage.getItem('token'),
    'tokenCustomerAPI': localStorage.getItem('tokenCustomerAPI'),
    'user': JSON.parse(localStorage.getItem('user') || '{}')
  };
  const { hasLoaded: hasLoadedUserPermissions } = useSelector((state: any) => state.permissions)
  const { user } = useSelector((state: any) => state.auth);
  const isAdmin = user?.permissions?.role === 3;
  const dispatch = useDispatch();
  const history = useHistory();
  const loginFromStorage =
    (token === null || token === '') &&
    (tokenCustomerAPI === null || tokenCustomerAPI === '') &&
    storageAuth.token !== null &&
    storageAuth.token !== '' &&
    storageAuth.tokenCustomerAPI !== null &&
    storageAuth.tokenCustomerAPI !== '' &&
    storageAuth.user !== null;

  useEffect(
    () => {
      loginFromStorage && setAuthAction(storageAuth);
    },
    [loginFromStorage, setAuthAction, storageAuth]
  );

  useEffect(() => {
    dispatch(setRouteTitleAction(title));
  }, [title]);

  useEffect(() => {
    dispatch(setRouteDataAction(actionData));
  }, [actionData]);

  if (loginFromStorage) {
    return null;
  }

  const isAuthed = token !== null && token !== '';
  const message = isAuthed && !hasAccess
    ? 'You do not have access to this page'
    : 'Please log in to view this page';

  if (!hasAccess && hasLoadedUserPermissions && !isAdmin) {
    history.push("/main/dashboard")
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthed
          ? <Component {...props} />
          : <Redirect
            to={{
              'pathname': '/',
              'state': {
                message,
                'requestedPath': path
              }
            }}
          />

      }
    />
  );
}
const mapStateToProps = (state: {
  auth: {
    token: string;
    tokenCustomerAPI: string;
  };
}) => ({
  'token': state.auth.token,
  'tokenCustomerAPI': state.auth.tokenCustomerAPI
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  'setAuthAction': (authInfo: AuthInfo) =>
    dispatch(setAuthAction(authInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRoute);
