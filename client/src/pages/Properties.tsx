/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { Button, message, Space, Typography, Modal } from "antd";
import { useTypedSelector } from "../hooks/useTypedSelector";
import TableProperty from "../components/TableProperty";
import { useActions } from "../hooks/useActions";
import PropertyModal from "../components/modals/PropertyModal";
import { IProperty } from "../models/IProperty";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Properties: FC = () => {
  const { count, error, selected, propertis } = useTypedSelector(
    (state) => state.propertis
  );
  const {
    setErrorProperty,
    addProperty,
    deleteProperty,
    updateProperty,
    setSelectedProperty,
  } = useActions();

  const [visibly, setVisibly] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);
  const [row, setRow] = React.useState({} as IProperty);

  React.useEffect(() => {
    if (error.length > 0) {
      message.error(error, () => setErrorProperty(""));
    }
  }, [error]);

  const hasSelected = selected.length > 0;
  // const hasEditSelected = selected.length > 0 && selected.length <= 1;

  // let item: any = [];
  let editRow: any = [];
  let deleteRow: any = [];

  if (hasSelected) {
    selected.forEach((e) => {
      const elem: any = propertis.find((el) => el.id === e);
      deleteRow.push(elem.preferense);
    });
  }

  // if (hasEditSelected) {
  //   selected.forEach((e) => {
  //     const elem: any = propertis.find((el) => el.id === e);
  //     item.push(elem.name);
  //   });
  //   editRow = propertis.filter((el) => el.id === selected[0])[0];
  // }

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
        deleteProperty(selected);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const createBtn = () => {
    setIsAdd(true);
    setVisibly(true);
  };
  const updateBtn = (row: number) => {
    const elem: any = propertis.find((el: IProperty) => el.id === row);
    console.log("elem:", elem);
    if (elem) {
      setRow(elem);
    }
    setIsAdd(false);
    setVisibly(true);
  };

  const createProp = (value: IProperty) => {
    addProperty(value.preferense, value.type_preferense);
    setVisibly(false);
  };
  const updateProp = (value: IProperty) => {
    const payload = { ...value, id: row.id };
    updateProperty(payload);
    setSelectedProperty([]);
    setVisibly(false);
  };

  return (
    <div>
      <Title level={4} type="secondary">
        {count === 0 ? "Property" : `Property (${count} rows) `}
      </Title>
      <Space>
        <Button type="primary" onClick={createBtn}>
          Create
        </Button>
        {/* <Button type="primary" disabled={!hasEditSelected} onClick={updateBtn}>
          Update
        </Button> */}
        <Button danger disabled={!hasSelected} onClick={showDeleteModal}>
          {hasSelected ? `Remove (${selected.length})` : "Remove"}
        </Button>
      </Space>
      <TableProperty editBtn={updateBtn} />
      <PropertyModal
        title={
          isAdd ? (
            <Text type="secondary">Create property</Text>
          ) : (
            <Text type="secondary">Create property</Text>
          )
        }
        visibly={visibly}
        setVisibly={setVisibly}
        submit={isAdd ? createProp : updateProp}
        current={row}
      />
    </div>
  );
};

export default Properties;
