/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IProperty } from "../models/IProperty";
import { pagination } from "../utils/consts";

interface PropertyProps {
  editBtn: () => void;
}

const TableProperty: FC<PropertyProps> = (props: PropertyProps) => {
  const { editBtn } = props;
  const { getProperty, setSelectedProperty } = useActions();
  const { propertis, count } = useTypedSelector((state) => state.propertis);

  React.useEffect(() => {
    getProperty();
  }, []);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedProperty(selectedRowKeys);
  };

  const buttonEdit = (value: string) => {
    const item = propertis.filter((el) => el.preferense === value);
    if (item[0].id) {
      setSetSelectedRowKeys([item[0].id]);
      setSelectedProperty([item[0].id]);
      editBtn();
    }
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changePage = (page: number) => {
    getProperty(page, pagination.pageSize);
  };

  let paginationOptions = {
    total: count,
    pageSize: pagination.pageSize,
    onChange: (page: number) => changePage(page),
    hideOnSinglePage: true,
  };

  const column: ColumnsType<IProperty> = [
    {
      title: "Property",
      dataIndex: "preferense",
      render: (text) => (
        <Button type="link" onClick={() => buttonEdit(text)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Type",
      dataIndex: "type_preferense",
    },
  ];

  const tableData: IProperty[] = propertis.map((el) => ({ ...el, key: el.id }));

  return (
    <div style={{ marginTop: 16 }}>
      <Table<IProperty>
        columns={column}
        dataSource={tableData}
        size="small"
        rowSelection={rowSelected}
        pagination={paginationOptions}
      />
    </div>
  );
};

export default TableProperty;
