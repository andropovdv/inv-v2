/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IProperty } from "../models/IProperty";
import { pagination } from "../utils/consts";

interface PropertyProps {
  editBtn: (v: any) => void;
  delBtn: (d: any) => void;
}

const TableProperty: FC<PropertyProps> = (props: PropertyProps) => {
  const { editBtn, delBtn } = props;
  const { getProperty, setSelectedProperty, setCurrentPageProperty } =
    useActions();
  const { propertis, count, currentPage } = useTypedSelector(
    (state) => state.propertis
  );

  React.useEffect(() => {
    getProperty();
  }, []);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedProperty(selectedRowKeys);
  };

  const buttonEdit = (row: any) => {
    editBtn(row.key);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const changePage = (page: number) => {
    setCurrentPageProperty(page);
    getProperty(page, pagination.pageSize);
  };

  let paginationOptions = {
    current: currentPage,
    total: count,
    pageSize: pagination.pageSize,
    onChange: (page: number) => changePage(page),
    hideOnSinglePage: true,
  };

  const column: ColumnsType<IProperty> = [
    {
      title: "Property",
      dataIndex: "preferense",
    },
    {
      title: "Type",
      dataIndex: "type_preferense",
    },
    {
      title: "Unit",
      dataIndex: "unit",
    },
    {
      title: <div style={{ textAlign: "center" }}>Action</div>,
      dataIndex: "action",
      width: "15%",
      render: (_: any, record: any) => (
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

  const tableData: IProperty[] = propertis.map((el) => ({ ...el, key: el.id }));

  return (
    <div style={{ marginTop: 16 }}>
      <Table<IProperty>
        columns={column}
        dataSource={tableData}
        size="small"
        rowSelection={{ ...rowSelected, hideSelectAll: true }}
        pagination={paginationOptions}
      />
    </div>
  );
};

export default TableProperty;
