/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { Button, Modal } from "antd";
import React, { FC } from "react";
import UserModal from "../components/modals/UserModal";
import TableUsers from "../components/TableUsers";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ISUser } from "../models/IUser";

const Users: FC = () => {
  const { selected, users } = useTypedSelector((state) => state.users);
  const { registerUser, deleteUser, updateUser, setSelectedUsers } =
    useActions();

  const [visibly, setVisibly] = React.useState(false);
  const [isAdd, setAdd] = React.useState(true);

  const { confirm } = Modal;

  let item: any = [];
  let deleteItem: any = [];
  let editObject: any = [];

  const hasSelected = selected.length > 0;
  const hasEditSelected = selected.length > 0 && selected.length <= 1;

  if (hasSelected) {
    selected.forEach((e) => {
      const elem: any = users.find((el) => el.id === e);
      deleteItem.push(elem.username);
    });
  }

  if (hasEditSelected) {
    selected.forEach((e) => {
      const elem: any = users.find((el) => el.id === e);
      item.push(elem.username);
    });
    editObject = users.filter((el) => el.id === selected[0])[0];
  }

  const showDelete = () => {
    confirm({
      title: "Вы действительно хотите удалить",
      icon: <ExclamationCircleOutlined />,
      content: deleteItem.map((e: any) => (
        <div key={uuid()}>
          <b>{e}</b>
        </div>
      )),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUser(selected);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const buttonClick = () => {
    setAdd(false);
    setVisibly(true);
  };

  const addUser = (user: ISUser) => {
    registerUser(user.email, user.password, user.role, user.username);
    setVisibly(false);
  };

  const editUser = (user: ISUser) => {
    const payload = { ...user, id: editObject.id };
    updateUser(payload);
    setVisibly(false);
  };

  const clickAdd = () => {
    selected.length = 0;
    setAdd(true);
    setVisibly(true);
  };
  const clickEdit = () => {
    setAdd(false);
    setVisibly(true);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" className="m16button" onClick={clickAdd}>
          Создать
        </Button>
        <Button
          type="primary"
          className="m16button"
          disabled={!hasEditSelected}
          onClick={clickEdit}
        >
          Изменить
        </Button>
        <Button danger disabled={!hasSelected} onClick={showDelete}>
          {hasSelected ? `Удалить (${selected.length})` : "Удалить"}
        </Button>
      </div>
      <TableUsers buttonEdit={buttonClick} />
      <UserModal
        mode={isAdd}
        visibly={visibly}
        title={isAdd ? "Add user" : "Edit user"}
        cancelModal={setVisibly}
        current={editObject}
        submit={isAdd ? addUser : editUser}
      />
    </>
  );
};

export default Users;
