import React from "react";
import First from "../pages/First";
import Login from "../pages/Login";
import SPage from "../pages/SPage";
import Users from "../pages/Users";
import Vendors from "../pages/Vendors";
import { RouterNames } from "../utils/consts";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export const publicRoutes: IRoute[] = [
  { path: RouterNames.LOGIN_ROUTE, exact: true, component: Login },
  { path: RouterNames.NODE, exact: true, component: First },
];

export const authRouters: IRoute[] = [
  { path: RouterNames.START_PAGE, exact: true, component: SPage },
  { path: RouterNames.USERS_ROUTE, exact: true, component: Users },
  { path: RouterNames.VENDORS_ROUTE, exact: true, component: Vendors },
];
