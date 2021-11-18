/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Typography } from "antd";
// import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import React from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useActions";
// import { Redirect } from "react-router";
import { RouterNames } from "./utils/consts";
import { useHistory } from "react-router";
import MenuSider from "./components/MenuSider";

const App = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);
  const { check } = useActions();
  const history = useHistory();

  React.useEffect(() => {
    check();
    if (!isAuth) {
      history.push(RouterNames.NODE);
    }
  }, []);

  const [colapsed, setColapsed] = React.useState(false);

  // const toggle = () => {
  //   setColapsed(!colapsed);
  // };

  return (
    <div>
      <Layout>
        {isAuth ? (
          <Layout.Sider collapsible collapsed={colapsed}>
            <div className="logo">Inventor</div>
            <MenuSider />
          </Layout.Sider>
        ) : null}

        <Layout className="site-layout">
          <Layout.Header className="header-color">
            {/* {React.createElement(
              colapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )} */}
            <Navbar />
          </Layout.Header>
          <Layout.Content style={{ padding: 16 }}>
            <AppRouter />
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
