import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { Button, Modal, Typography } from "antd";
import TableTypes from "../components/TableTypes";
import TypeModal from "../components/modals/TypeModal";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { context } from "rc-image/lib/PreviewGroup";
import { useActions } from "../hooks/useActions";
import { IType } from "../models/IType";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Types: FC = () => {
  const [visibly, setVisibly] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);

  const { selected, types } = useTypedSelector((state) => state.types);
  const { deleteType, addType, updateType, setSelectedTypes } = useActions();

  const hasSelected = selected.length > 0;
  const hasEditSelected = selected.length > 0 && selected.length <= 1;

  let deleteRow: any = [];
  let item: any = [];
  let editRow: any = [];

  if (hasSelected) {
    selected.forEach((e) => {
      const elem: any = types.find((el) => el.id === e);
      deleteRow.push(elem.name);
    });
  }

  if (hasEditSelected) {
    selected.forEach((e) => {
      const elem: any = types.find((el) => el.id === e);
      item.push(elem.name);
    });
    editRow = types.filter((el) => el.id === selected[0])[0];
  }

  const createBtn = () => {
    setIsAdd(true);
    setVisibly(true);
  };
  const updateBtn = () => {
    setIsAdd(false);
    setVisibly(true);
  };

  const typeCreate = (value: IType) => {
    const pref = JSON.stringify(value.pref);
    addType(value.name, pref);
    setVisibly(false);
  };
  const typeUpdate = (value: IType) => {
    const payload = { ...value, id: editRow.id };
    updateType(payload);
    setSelectedTypes([]);
    setVisibly(false);
  };

  const showDeleteModal = () => {
    confirm({
      title: <Text type="secondary">Do you really want to delete</Text>,
      icon: <ExclamationCircleOutlined />,
      content: deleteRow.map((e: any) => (
        <div key={uuid()}>
          <b>{e}</b>
        </div>
      )),
      okText: "Yes",
      okType: "danger",
      onOk() {
        deleteType(selected);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div>
      <Title level={4} type="secondary">
        Types
      </Title>
      <div style={{ marginBottom: 16 }}>
        <Button className="m16button" type="primary" onClick={createBtn}>
          Create
        </Button>
        <Button
          disabled={!hasEditSelected}
          className="m16button"
          type="primary"
          onClick={updateBtn}
        >
          Update
        </Button>
        <Button danger disabled={!hasSelected} onClick={showDeleteModal}>
          {hasSelected ? `Delete (${selected.length})` : "Delete"}
        </Button>
      </div>
      <TableTypes editBtn={updateBtn} />
      <TypeModal
        title={
          isAdd ? (
            <Text type="secondary">Создать тип</Text>
          ) : (
            <Text type="secondary">Редактировать тип</Text>
          )
        }
        visibly={visibly}
        setVisibly={setVisibly}
        submit={isAdd ? typeCreate : typeUpdate}
        current={editRow}
      />
    </div>
  );
};

export default Types;
