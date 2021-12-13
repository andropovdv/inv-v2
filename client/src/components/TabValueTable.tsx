/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "antd";
import { v4 as uuid } from "uuid";

import React, { FC } from "react";
import { ColumnsType } from "antd/es/table";
import { useActions } from "../hooks/useActions";
import { IValue } from "../models/IValue";
import { useTypedSelector } from "../hooks/useTypedSelector";

const TabValueTable: FC = () => {
  const { getValue } = useActions();
  const { values } = useTypedSelector((state) => state.values);

  React.useEffect(() => {
    getValue();
  }, []);

  // const tableData: IValue[] = values.map((el) => ({
  //   ...el,
  //   key: el.id,
  //   nType: el.type.name,
  //   nTypeInfo: el.type_info.preferense,
  // }));

  const map: IValue[] = values.reduce((acc: any, cur: any) => {
    acc[cur.typeId] = acc[cur.typeId] || {
      id: cur.typeId,
      key: cur.typeId,
      nType: "",
      val: [],
    };
    acc[cur.typeId].nType = cur.type.name;
    acc[cur.typeId].val.push({
      pref: cur.type_info.preferense,
      perfType: cur.type_info.type_preferense,
      value: cur.value,
    });
    return acc;
  }, {});

  const result = Object.values(map);

  const recordInfo = (val: any) => {
    const column = [
      { title: "Хар-ка", dataIndex: "pref", key: val.id, width: "15%" },
      { title: "Тип хар-ки", dataIndex: "perfType", key: val.id },
      { title: "Значение", dataIndex: "value", key: val.id },
    ];
    const data: any = [];
    val.val.map((el: any) => data.push({ ...el, key: uuid() }));
    return (
      <Table
        columns={column}
        dataSource={data}
        pagination={false}
        size="small"
      />
    );
  };

  const column: ColumnsType<IValue> = [
    { title: "Type(Тип оборудования)", dataIndex: "nType" },
    // { title: "TypeInfo(Наименвание хар-ки)", dataIndex: "nTypeInfo" },
    // { title: "Value", dataIndex: "value" },
  ];

  return (
    <div style={{ marginTop: 16 }}>
      <Table<IValue>
        columns={column}
        dataSource={result}
        size="small"
        expandable={{
          expandedRowRender: recordInfo,
          rowExpandable: (record) => record.val?.length !== 0,
        }}
      />
    </div>
  );
};

export default TabValueTable;
