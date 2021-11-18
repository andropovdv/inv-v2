/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { ISUser } from "../models/IUser";
import { formatDate } from "../utils/data";

const TableUsers: FC = () => {
  const { getUser, setSelectedUsers } = useActions();
  const { users } = useTypedSelector((state) => state.users);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState([]);

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    console.log("selectedRow ", selectedRows);
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedUsers(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const column: ColumnsType<ISUser> = [
    {
      title: "Name",
      dataIndex: "username",
      width: "50%",
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

  // const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type="primary">Создать</Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Выбрано ${selectedRowKeys.length} строк` : ""}
        </span>
      </div> */}

      <Table<ISUser>
        columns={column}
        dataSource={data}
        size={"small"}
        rowSelection={rowSelected}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (e) => console.log(record),
        //   };
        // }}
      />
    </>
  );
};

export default TableUsers;
