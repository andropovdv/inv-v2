import React from "react";
import Devices from "../pages/Devices";
import First from "../pages/First";
import Login from "../pages/Login";
import Properties from "../pages/Properties";
import SPage from "../pages/SPage";
import Types from "../pages/Types";
import Users from "../pages/Users";
import ValueTable from "../pages/ValueTable";
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
  { path: RouterNames.TYPES_ROUTE, exact: true, component: Types },
  { path: RouterNames.DEVICES_ROUTE, exact: true, component: Devices },
  { path: RouterNames.PROPERTY_ROUTE, exact: true, component: Properties },
  { path: RouterNames.VALUE_TABLE_ROUTE, exact: true, component: ValueTable },
];
