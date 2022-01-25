/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IType } from "../models/IType";
import { pagination } from "../utils/consts";

interface TypeProps {
  editBtn: (val: IType) => void;
}

const TableTypes: FC<TypeProps> = (props: TypeProps) => {
  const { editBtn } = props;
  const { getType, setSelectedTypes } = useActions();
  const { types, isLoading, count } = useTypedSelector((state) => state.types);

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
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: any) => (
        <Button type="link" onClick={() => buttonEdit(record)}>
          Edit type
        </Button>
      ),
    },
  ];

  const tableDate: IType[] = types.map((el) => ({ ...el, key: el.id }));

  const changePage = (page: number) => {
    getType(page, pagination.pageSize);
  };

  let paginationOptions = {
    total: count,
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
