/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import TableUsers from "../components/TableUsers";
import { Button, Modal } from "antd";
import { useTypedSelector } from "../hooks/useTypedSelector";
import UserForm from "../components/forms/UserForm";
import { ISUser } from "../models/IUser";
import { useActions } from "../hooks/useActions";

const Users: FC = () => {
  const { selected, isLoading } = useTypedSelector((state) => state.users);
  const { registerUser } = useActions();
  const [visibly, setVisibly] = React.useState(false);

  const addUser = (user: ISUser) => {
    registerUser(user.email, user.password, user.role, user.username);

    if (!isLoading) {
      setVisibly(false);
    }
  };

  const hasSelected = selected.length > 0;
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          className="m16button"
          onClick={() => setVisibly(true)}
        >
          Создать
        </Button>
        <Button danger disabled={!hasSelected}>
          Удалить
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Выбрано ${selected.length} строк` : ""}
        </span>
      </div>
      <TableUsers />
      <Modal
        title="Add User"
        visible={visibly}
        onCancel={() => setVisibly(false)}
        footer={null}
      >
        <UserForm submit={addUser} loading={isLoading} />
      </Modal>
    </>
  );
};

export default Users;
