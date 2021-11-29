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
          Nav 1
        </Menu.Item>
        <Menu.Item key="3" icon={<UpOutlined />}>
          Nav 1
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuSider;
