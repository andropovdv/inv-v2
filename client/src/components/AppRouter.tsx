import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { publicRoutes, authRouters } from "../router";
import { RouterNames } from "../utils/consts";

const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  return isAuth ? (
    <Switch>
      {authRouters.map((el) => (
        <Route
          path={el.path}
          exact={el.exact}
          component={el.component}
          key={el.path}
        />
      ))}
      <Redirect to={RouterNames.START_PAGE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((el) => (
        <Route
          path={el.path}
          exact={el.exact}
          component={el.component}
          key={el.path}
        />
      ))}
      {/* <Redirect to={RouterNames.NODE} /> */}
    </Switch>
  );
};

export default AppRouter;
