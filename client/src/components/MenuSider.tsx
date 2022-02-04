import React, { FC } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraAddOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { RouterNames } from "../utils/consts";

const { Item, SubMenu } = Menu;

const MenuSider: FC = () => {
  return (
    <>
      <Menu theme="dark" mode="inline">
        <SubMenu key="sub1" title="Справочники" icon={<UserOutlined />}>
          <Item key="1" icon={<UserOutlined />}>
            <NavLink to={RouterNames.VENDORS_ROUTE}>Vendors</NavLink>
          </Item>
          <Item key="2" icon={<VideoCameraAddOutlined />}>
            <NavLink to={RouterNames.TYPES_ROUTE}>Types</NavLink>
          </Item>
          <Item key="3" icon={<UpOutlined />}>
            <NavLink to={RouterNames.DEVICES_ROUTE}>Devices</NavLink>
          </Item>
          <Item key="4" icon={<UpOutlined />}>
            <NavLink to={RouterNames.PROPERTY_ROUTE}>Property</NavLink>
          </Item>
          <Item key="5" icon={<UpOutlined />}>
            <NavLink to={RouterNames.VALUE_TABLE_ROUTE}>Value Table</NavLink>
          </Item>
        </SubMenu>
        <SubMenu key="sub2" title="Операции" icon={<UserOutlined />}>
          <Item key="6" icon={<UpOutlined />}>
            <NavLink to={RouterNames.VALUE_TABLE_ROUTE}>Value Table</NavLink>
          </Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default MenuSider;
