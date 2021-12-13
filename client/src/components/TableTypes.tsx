/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { v4 as uuid } from "uuid";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IType } from "../models/IType";
import { pagination } from "../utils/consts";

interface TypeProps {
  editBtn: () => void;
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

  const buttonEdit = (name: string) => {
    const item = types.filter((el) => el.name === name);
    if (item[0].id) {
      setSetSelectedRowKeys([item[0].id]);
      setSelectedTypes([item[0].id]);
      editBtn();
    }
  };

  const column: ColumnsType<IType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <Button type="link" onClick={() => buttonEdit(text)}>
          {text}
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

  const recordInfo = (val: any) => {
    const column = [
      {
        title: "Характеристика",
        dataIndex: "preferense",
        key: val.id,
        width: "15%",
      },
      { title: "Тип поля", dataIndex: "type_preferense", key: val.id },
    ];
    const data: any = [];
    val.pref.map((el: any) => data.push({ ...el, key: uuid() }));
    return (
      <Table
        columns={column}
        dataSource={data}
        pagination={false}
        size="small"
      />
    );
  };

  return (
    <>
      <Table
        columns={column}
        dataSource={tableDate}
        size="small"
        loading={isLoading}
        rowSelection={rowSelected}
        pagination={paginationOptions}
        // expandable={{
        //   expandedRowRender: recordInfo,
        //   rowExpandable: (record) => record.pref.length !== 0,
        // }}
      />
    </>
  );
};

export default TableTypes;
