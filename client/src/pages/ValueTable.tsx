/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { Button, message, Space, Typography, Modal } from "antd";
import TabValueTable from "../components/TabValueTable";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { IValue } from "../models/IValue";
import ValueModal from "../components/modals/ValueModal";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { Title, Text } = Typography;

interface CurrentRow {
  value: string;
  typeId?: number;
  typeInfoId?: number;
  id: number;
  type?: string;
  typeInfo?: string;
  unit?: string;
  typePref?: string;
}

const ValueTable: FC = () => {
  const { error, count, selected, values } = useTypedSelector(
    (state) => state.values
  );
  const {
    setErrorValue,
    addValue,
    deleteValue,
    updateValue,
    setSelectedValue,
    removeTypeDropDown,
    setCurrentPageValue,
  } = useActions();

  const [visibly, setVisibly] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);
  const [isAddFeature, setIsAddFeature] = React.useState(false);
  const [rowEdit, setRowEdit] = React.useState({} as CurrentRow);

  React.useEffect(() => {
    if (error.length > 0) {
      message.error(error, () => setErrorValue(""));
    }
  }, [error]);

  let deleteRows: any = [];
  let delRow;

  const hasSelected = selected.length > 0;

  const findTypeById = (val: number) => {
    return values
      .map((el) => ({ name: el.name, id: el.id }))
      .filter((e) => e.id === val)[0].name;
  };

  if (hasSelected) {
    selected.forEach((i: number) => {
      const elem: any[] = values
        .map((el: IValue) => el.tableValue)
        .map((e) => e.find((e1) => e1.id === i))
        .filter((z) => z !== undefined);

      delRow = {
        key: +elem.map((el) => el.id),
        value: elem.map((el) => el.value).toString(),
        pref: elem.map((el) => el.type_info.preferense).toString(),
        typeId: +elem.map((el) => el.typeId),
        type: elem.map((el) => findTypeById(el.typeId)).toString(),
      };

      if (delRow) {
        deleteRows.push(delRow);
      }
    });
  }

  const createBtn = () => {
    setIsAdd(true);
    setVisibly(true);
  };

  const createBtnFeature = (val: any) => {
    setIsAdd(true);
    setIsAddFeature(true);
    setRowEdit({ typeId: val?.id, value: "", type: val.name, id: val.id });
    setVisibly(true);
  };

  const updateBtnRow = (row: any) => {
    const elem: any[] = values
      .map((el: IValue) => el.tableValue)
      .map((e) => e.find((e1) => e1.id === row))
      .filter((z) => z !== undefined);

    if (elem.length > 0) {
      setRowEdit({
        id: +elem[0].id,
        value: elem[0].value,
        typeId: +elem[0].typeId,
        typeInfoId: elem[0].typeInfoId,
        type: findTypeById(elem[0].typeId),
        typeInfo: elem[0].type_info.preferense,
        unit: elem[0].type_info.unit,
        typePref: elem[0].type_info.type_preferense,
      });
    }
    removeTypeDropDown([]);
    setIsAdd(false);
    setVisibly(true);
  };

  const createVal = (value: IValue) => {
    addValue(value);
    setCurrentPageValue(1);
    setIsAddFeature(false);
    setRowEdit({} as any);
    setVisibly(false);
  };
  const updateVal = (value: IValue) => {
    let payload = {} as IValue;
    if (!("id" in value)) {
      payload = { ...value, id: rowEdit.id };
    } else {
      payload = { ...value };
    }
    setCurrentPageValue(1);
    updateValue(payload);
    setSelectedValue([]);
    setVisibly(false);
  };

  const showDeleteModal = () => {
    confirm({
      title: <Text type="secondary">Do you really want to delete</Text>,
      icon: <ExclamationCircleOutlined />,
      content: deleteRows.map((el: any) => (
        <div key={el.key}>
          <b>{`${el.type} => ${el.pref} = ${el.value}`}</b>
        </div>
      )),
      okText: "Yes",
      okType: "danger",
      onOk() {
        setCurrentPageValue(1);
        deleteValue(selected);
      },
    });
  };

  const delFromTable = (rec: any) => {
    console.log("Rec: ", rec);
    confirm({
      title: <Text type="secondary">Do you really want to delete</Text>,
      icon: <ExclamationCircleOutlined />,
      content: <b>{`${rec.preferense}`}</b>,
      okText: "Yes",
      okType: "danger",
      onOk() {
        setCurrentPageValue(1);
        deleteValue([rec.key]);
      },
    });
  };

  return (
    <div>
      <Title type="secondary" level={4}>
        {count === 0 ? "Value" : `Values (${count} rows)`}
      </Title>
      <Space>
        <Button type="primary" onClick={createBtn} disabled={hasSelected}>
          Create
        </Button>
        <Button danger disabled={!hasSelected} onClick={showDeleteModal}>
          {hasSelected ? `Remove (${selected.length})` : "Remove"}
        </Button>
      </Space>
      <TabValueTable
        editBtn={updateBtnRow}
        createBtn={createBtnFeature}
        delBtn={delFromTable}
      />
      <ValueModal
        title={
          isAdd ? (
            <Text type="secondary">Create values</Text>
          ) : (
            <Text type="secondary">Update values</Text>
          )
        }
        visibly={visibly}
        setVisibly={setVisibly}
        submit={isAdd ? createVal : updateVal}
        current={rowEdit}
        isAdd={isAdd}
        isAddFeature={isAddFeature}
        setIsAddFeature={setIsAddFeature}
      />
    </div>
  );
};

export default React.memo(ValueTable);
