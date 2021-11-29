/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { Button, Dropdown, Menu, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { ISUser } from "../models/IUser";
import { formatDate } from "../utils/data";
import UserChangeModal from "./modals/UserChangeModal";

interface UserProps {
  buttonEdit: () => void;
}

const TableUsers: FC<UserProps> = (props: UserProps) => {
  const { buttonEdit } = props;
  const { getUser, setSelectedUsers } = useActions();
  const { users, isLoading } = useTypedSelector((state) => state.users);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);
  const [visibly, setVisibly] = React.useState(false);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedUsers(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const clickButton = (username: string) => {
    const item = users.filter((el) => el.username === username);
    if (item[0].id) {
      setSetSelectedRowKeys([item[0].id]);
      setSelectedUsers([item[0].id]);
      buttonEdit();
    }
  };

  const changePassword = (value: any) => (e: any) => {
    if (e.key === "change") {
      const item = users.filter((el) => el.email === value);
      if (item[0].id) {
        setSelectedUsers([item[0].id]);
        setVisibly(true);
      }
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const contextMenu = (value: any) => (
    <Menu onClick={changePassword(value)}>
      <Menu.Item key="change">Change password</Menu.Item>
      <Menu.Item key="edit">{value}</Menu.Item>
    </Menu>
  );

  const renderMenu = (value: any) => (
    <Dropdown overlay={contextMenu(value)} trigger={["contextMenu"]}>
      <div className="site-dropdown-context-menu">{value}</div>
    </Dropdown>
  );

  const column: ColumnsType<ISUser> = [
    {
      title: "Name",
      dataIndex: "username",
      width: "50%",
      render: (text) => (
        <Button type="link" onClick={() => clickButton(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: renderMenu,
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (text) => formatDate(new Date(text)),
      width: "10%",
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      render: (text) => formatDate(new Date(text)),
      width: "10%",
    },
  ];

  const tableDate: ISUser[] = users.map((el) => ({ ...el, key: el.id }));

  const data: ISUser[] = tableDate;

  return (
    <>
      <Table<ISUser>
        columns={column}
        dataSource={data}
        size={"small"}
        rowSelection={rowSelected}
        loading={isLoading}
      />
      <UserChangeModal visibly={visibly} setVisibly={setVisibly} />
      {/* <Modal
        visible={visibly}
        title="Change password"
        forceRender
        destroyOnClose={true}
        onCancel={exitButton}
      >
        <h1>Change password</h1>
      </Modal> */}
    </>
  );
};

export default TableUsers;
