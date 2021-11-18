import { Button, Layout, Row } from "antd";
import React, { FC } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useHistory } from "react-router-dom";
import { RouterNames } from "../utils/consts";
import { useActions } from "../hooks/useActions";

const { Header } = Layout;

const Navbar: FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push(RouterNames.NODE);
  };

  return (
    <>
      {/* <Header className="header-color"> */}
      <Row justify="end" align="middle">
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>{user.email}</div>
            {user.role === "ADMIN" ? (
              <Button
                style={{ marginLeft: 16, color: "white" }}
                type="ghost"
                // onClick={() => console.log("users")}
                onClick={() => history.push(RouterNames.USERS_ROUTE)}
              >
                Users
              </Button>
            ) : null}
            <Button
              type="ghost"
              style={{ color: "white", marginLeft: 16 }}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </>
        ) : (
          <>
            <div>
              <Button
                type="ghost"
                style={{ color: "white", marginLeft: 16 }}
                onClick={() => history.push(RouterNames.LOGIN_ROUTE)}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </Row>
      {/* </Header> */}
    </>
  );
};

export default Navbar;
