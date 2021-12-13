/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IDevice } from "../models/IDevice";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { pagination } from "../utils/consts";

const TableDevices: FC = () => {
  const { getDevice, getType, setSelectedDevice } = useActions();
  const { devices, isLoading, count } = useTypedSelector(
    (state) => state.devices
  );

  React.useEffect(() => {
    getType();
    getDevice();
  }, []);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedDevice(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const res: IDevice[] = devices.map((el) => ({
    ...el,
    key: el.id,
    nType: el.type.name,
    nVendor: el.vendor.name,
  }));

  const column: ColumnsType<IDevice> = [
    { title: "Vendor", dataIndex: "nVendor", width: "15%" },
    { title: "Type", dataIndex: "nType", width: "15%" },
    { title: "Model", dataIndex: "name" },
    {
      title: "Action",
      dataIndex: "operation",
      render: () => (
        <Space size="middle">
          <Button type="link" disabled={selectedRowKeys.length === 0}>
            Edit
          </Button>
          <Button type="link">Delete</Button>
        </Space>
      ),
      align: "center",
    },
  ];

  const changePage = (page: number) => {
    getDevice(page, pagination.pageSize);
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
        dataIndex: "title",
        key: val.id,
        width: "15%",
      },
      { title: "Значение", dataIndex: "description", key: val.id },
    ];
    const data: any = [];
    val.info.map((el: any) => data.push({ ...el, key: uuid() }));
    console.log(data);
    return (
      <div style={{ color: "grey" }}>
        <Table
          columns={column}
          dataSource={data}
          pagination={false}
          size="small"
        />
      </div>
    );
  };

  return (
    <>
      <Table
        columns={column}
        dataSource={res}
        size="small"
        loading={isLoading}
        rowSelection={rowSelected}
        pagination={paginationOptions}
        expandable={{
          expandedRowRender: recordInfo,
          rowExpandable: (record) => record.info.length !== 0,
        }}
      />
    </>
  );
};

export default TableDevices;
