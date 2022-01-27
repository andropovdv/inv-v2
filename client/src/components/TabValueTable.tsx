/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row, Space, Table } from "antd";

import React, { FC } from "react";
import { ColumnsType } from "antd/es/table";
import { useActions } from "../hooks/useActions";
import { IValue } from "../models/IValue";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { pagination } from "../utils/consts";

interface ValueProps {
  editBtn: (r: IValue[]) => void;
  createBtn: (r: any[]) => void;
}

const TabValueTable: FC<ValueProps> = (props: ValueProps) => {
  const { editBtn, createBtn } = props;
  const { getValue, setSelectedValue } = useActions();
  const { values, selected, count } = useTypedSelector((state) => state.values);

  React.useEffect(() => {
    getValue();
  }, []);

  const [selectedRowKeys, setSetSelectedRowKeys] = React.useState<number[]>([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSetSelectedRowKeys(selectedRowKeys);
    setSelectedValue(selectedRowKeys);
  };

  const rowSelected = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const btnEdit = (row: any) => {
    editBtn(row.key);
  };

  // TODO имеет смысл вынести в отдельный компонент ?
  const recordInfo = (val: IValue) => {
    const column = [
      {
        title: "Хар-ка",
        dataIndex: "preferense",
        key: "preferense",
        width: "15%",
      },
      {
        title: "Тип хар-ки",
        dataIndex: "type_preferense",
        key: "type_preferense",
      },
      { title: "Значение", dataIndex: "value", key: "value" },
      {
        title: "Action",
        dataIndex: "action",
        key: "sub_action",
        render: (_: any, record: any) => {
          if (record.type_preferense === "STRING") {
            return undefined;
          } else {
            return (
              <Button type="link" onClick={() => btnEdit(record)}>
                Edit feature
              </Button>
            );
          }
        },
      },
    ];
    const data: any = [];
    val.tableValue.map((el) =>
      data.push({
        preferense: el.type_info.preferense,
        type_preferense: el.type_info.type_preferense,
        value: el.value,
        key: el.id,
      })
    );
    return (
      <Table
        columns={column}
        dataSource={data}
        pagination={false}
        rowSelection={{
          ...rowSelected,
          hideSelectAll: true,
        }}
        size="small"
      />
    );
  };

  const tableData: IValue[] = values.map((el: IValue) => ({
    ...el,
    key: el.id,
  }));

  const column: ColumnsType<IValue> = [
    {
      title: "Type(Тип оборудования)",
      dataIndex: "name",
      width: "20%",
      key: "name,",
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            disabled={selected.length > 0}
            onClick={() => createBtn(record)}
          >
            Add feature
          </Button>
        </Space>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = React.useState(1);

  console.log("Current Page:", currentPage);
  const changePage = (page: number) => {
    setCurrentPage(page);
    getValue(page, pagination.pageSize);
  };

  let paginationOption = {
    defaultCurrent: 1,
    // current: currentPage,
    total: count,
    pageSize: pagination.pageSize,
    onChange: (page: number) => changePage(page),
    hideOnSinglePage: true,
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Table<IValue>
        columns={column}
        dataSource={tableData}
        rowKey={(record) => record.id}
        size="small"
        expandable={{
          expandedRowRender: recordInfo,
          rowExpandable: (record: IValue) => record.tableValue?.length !== 0,
        }}
        pagination={paginationOption}
      />
      <Row>
        <Col span={12}>span 12-1</Col>
        <Col span={12}>span 12-2</Col>
      </Row>
    </div>
  );
};

export default TabValueTable;
