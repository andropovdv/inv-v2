import React, { FC } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraAddOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { RouterNames } from "../utils/consts";

const MenuSider: FC = () => {
  return (
    <>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <NavLink to={RouterNames.VENDORS_ROUTE}>Vendors</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraAddOutlined />}>
          <NavLink to={RouterNames.TYPES_ROUTE}>Types</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<UpOutlined />}>
          <NavLink to={RouterNames.DEVICES_ROUTE}>Devices</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<UpOutlined />}>
          <NavLink to={RouterNames.PROPERTY_ROUTE}>Property</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<UpOutlined />}>
          <NavLink to={RouterNames.VALUE_TABLE_ROUTE}>Value Table</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuSider;
