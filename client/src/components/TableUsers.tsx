/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { ISUser } from "../models/IUser";
import { formatDate } from "../utils/data";

interface UserProps {
  buttonEdit: () => void;
}

const TableUsers: FC<UserProps> = (props: UserProps) => {
  const { buttonEdit } = props;
  const { getUser, setSelectedUsers } = useActions();
  const { users, isLoading } = useTypedSelector((state) => state.users);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedUsers(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const clickButton = (username: string, selectedRowKeys?: any) => {
    const item = users.filter((el) => el.username === username);
    if (item[0].id) {
      setSetSelectedRowKeys([item[0].id]);
      setSelectedUsers([item[0].id]);
      buttonEdit();
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

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

  const tableDate = users.map((el) => ({ ...el, key: el.id }));

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
    </>
  );
};

export default TableUsers;
