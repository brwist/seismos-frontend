import Auth from "layouts/Auth.js";
import Admin from "layouts/Admin.js";
import ENUMS from "constants/appEnums";
import { useDispatch } from "react-redux";
import allActions from "redux/actions/index";
import { AppContext } from "util/ContextUtil";
import React, { useState, useEffect } from "react";
import NotFound from "components/NotFound/NotFound";
import { useToasts } from "react-toast-notifications";
import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";
import { authApi } from "api/authApi";

export default function Application() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const logOutUser = () => {
    userHasAuthenticated(false);
    dispatch(allActions.authActions.userLoggedOut());
    localStorage.removeItem("JWT");
    history.push("/auth/login");
  };

  /**
   * Method to save user data in redux store and set local storage with JWT
   * @param {Object} data
   */
  const saveUserState = (data) => {
    userHasAuthenticated(true);
    dispatch(allActions.authActions.setUserState(data.user));
    dispatch(allActions.authActions.setUserProjectIds(data.project_ids));
  };

  useEffect(() => {
    const onLoad = async () => {
      if (localStorage.getItem("JWT")) {
        try {
          const data = await authApi.authStatus();
          saveUserState(data.data);
          userHasAuthenticated(true);
          setIsAuthenticating(false);
        } catch (error) {
          setIsAuthenticating(false);
          if (error.response) {
            // logOutUser();
          }
        }
      } else {
        setIsAuthenticating(false);
      }
    };
    onLoad();
  }, [addToast, dispatch]);

  return (
    <>
      {!isAuthenticating && (
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <BrowserRouter>
            <Switch>
              <Route
                path={ENUMS.ROUTES.ADMIN}
                render={(props) => <Admin {...props} isAuthenticated={isAuthenticated} />}
              />
              <Route
                path={ENUMS.ROUTES.AUTH}
                render={(props) => <Auth {...props} isAuthenticated={isAuthenticated} />}
              />
              {/* 
                        // TODO: remove the comments
                        <Redirect from="/" to="/auth/home" /> 
                        */}
              <Redirect from="/" to="/auth/login" />
              <Route render={(props) => <NotFound {...props} />} />
            </Switch>
          </BrowserRouter>
        </AppContext.Provider>
      )}
    </>
  );
}
