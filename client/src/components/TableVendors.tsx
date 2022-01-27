/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IVendor } from "../models/IVendor";
import { pagination } from "../utils/consts";

interface VendorProps {
  editBtn: (v: any) => void;
  delBtn: (d: any) => void;
}

const TableVendors: FC<VendorProps> = (props: VendorProps) => {
  const { editBtn, delBtn } = props;
  const { getVendor, setSelectedVendor, setCurrentPageVendor } = useActions();
  const { vendors, isLoading, count, currentPage } = useTypedSelector(
    (state) => state.vendors
  );

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedVendor(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // const buttonEdit = (name: string) => {
  //   const item = vendors.filter((el) => el.name === name);
  //   if (item[0].id) {
  //     setSetSelectedRowKeys([item[0].id]);
  //     setSelectedVendor([item[0].id]);
  //     editBtn();
  //   }
  // };

  React.useEffect(() => {
    getVendor();
  }, []);

  const updateBtn = (row: any) => {
    editBtn(row.key);
  };

  const tableData: IVendor[] = vendors.map((el) => ({ ...el, key: el.id }));

  const column: ColumnsType<IVendor> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "25%",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => updateBtn(record)}>
            Edit vendor
          </Button>
          <Button danger type="link" onClick={() => delBtn(record)}>
            Delete vendor
          </Button>
        </Space>
      ),
    },
  ];

  const changePage = (page: number) => {
    setCurrentPageVendor(page);
    getVendor(page, pagination.pageSize);
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
      <Table<IVendor>
        columns={column}
        dataSource={tableData}
        size="small"
        loading={isLoading}
        rowSelection={{ ...rowSelected, hideSelectAll: true }}
        pagination={paginationOptions}
      />
    </>
  );
};

export default TableVendors;
