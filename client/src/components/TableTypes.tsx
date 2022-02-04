/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IType } from "../models/IType";
import { pagination } from "../utils/consts";

interface TypeProps {
  editBtn: (val: IType) => void;
  delBtn: (d: any) => void;
}

const TableTypes: FC<TypeProps> = (props: TypeProps) => {
  const { editBtn, delBtn } = props;
  const { getType, setSelectedTypes, setCurrentPageTyoe } = useActions();
  const { types, isLoading, count, currentPage } = useTypedSelector(
    (state) => state.types
  );

  React.useEffect(() => {
    getType();
  }, []);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedTypes(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const buttonEdit = (val: IType) => {
    if (val) {
      editBtn(val);
    }
  };

  const column: ColumnsType<IType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      dataIndex: "action",
      width: "15%",
      render: (_, record: any) => (
        <Space>
          <Button type="link" onClick={() => buttonEdit(record)}>
            Edit
          </Button>
          <Button danger type="link" onClick={() => delBtn(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const tableDate: IType[] = types.map((el) => ({ ...el, key: el.id }));

  const changePage = (page: number) => {
    setCurrentPageTyoe(page);
    getType(page, pagination.pageSize);
  };

  let paginationOptions = {
    total: count,
    current: currentPage,
    pageSize: pagination.pageSize,
    onChange: (page: number) => changePage(page),
    hideOnSinglePage: true,
  };

  return (
    <>
      <Table
        columns={column}
        dataSource={tableDate}
        size="small"
        loading={isLoading}
        rowSelection={{ ...rowSelected, hideSelectAll: true }}
        pagination={paginationOptions}
      />
    </>
  );
};

export default TableTypes;
