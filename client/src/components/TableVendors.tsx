/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { FC } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IVendor } from "../models/IVendor";
import { pagination } from "../utils/consts";

interface VendorProps {
  editBtn: () => void;
}

const TableVendors: FC<VendorProps> = (props: VendorProps) => {
  const { editBtn } = props;
  const { getVendor, setSelectedVendor } = useActions();
  const { vendors, isLoading, count } = useTypedSelector(
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

  const buttonEdit = (name: string) => {
    const item = vendors.filter((el) => el.name === name);
    if (item[0].id) {
      setSetSelectedRowKeys([item[0].id]);
      setSelectedVendor([item[0].id]);
      editBtn();
    }
  };

  React.useEffect(() => {
    getVendor();
  }, []);

  const tableData: IVendor[] = vendors.map((el) => ({ ...el, key: el.id }));

  const column: ColumnsType<IVendor> = [
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

  const changePage = (page: number) => {
    getVendor(page, pagination.pageSize);
  };

  let paginationOptions = {
    total: count,
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
        rowSelection={rowSelected}
        pagination={paginationOptions}
      />
    </>
  );
};

export default TableVendors;
