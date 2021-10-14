import React from "react";
import routes from "routes/routes.js";
import { Switch, Route, Redirect } from "react-router-dom";
import ENUMS from "constants/appEnums";
import APP_CONSTANTS from "constants/appConstants";

// components
import Navbar from "components/Navbars/AuthNavbar.js";

export default function Auth(props) {
  const getRoutes = (routes) => {
    if (props.isAuthenticated && APP_CONSTANTS.LOGIN_TO_APP_ROUTES.indexOf(props.location.pathname) > -1) {
      return <Redirect to="/admin/project" />
    }
    return routes.map((prop, key) => {
      if (prop.layout === ENUMS.ROUTES.AUTH) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full min-h-screen flex items-center">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full"
          ></div>
          <Switch>
              {getRoutes(routes)}
          </Switch>
        </section>
      </main>
    </>
  );
}
