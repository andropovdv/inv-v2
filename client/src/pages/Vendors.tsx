/* eslint-disable react-hooks/exhaustive-deps */
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { Button, message, Typography, Modal } from "antd";
import React, { FC } from "react";
import VendorModal from "../components/modals/VendorModal";
import TableVendors from "../components/TableVendors";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IVendor } from "../models/IVendor";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Vendors: FC = () => {
  const { vendors, error, count, selected } = useTypedSelector(
    (state) => state.vendors
  );
  const {
    setError,
    addVendor,
    updateVendor,
    setSelectedVendor,
    deleteVendor,
    setCurrentPageVendor,
  } = useActions();

  const [visibly, setVisibly] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);
  const [row, setRow] = React.useState({} as IVendor);

  const hasSelected = selected.length > 0;
  const hasEditSelected = selected.length > 0 && selected.length <= 1;

  let item: any = [];
  let editRow: any = [];
  let deleteRow: any = [];

  if (hasSelected) {
    selected.forEach((e) => {
      const elem: any = vendors.find((el) => el.id === e);
      deleteRow.push(elem.name);
    });
  }

  if (hasEditSelected) {
    selected.forEach((e) => {
      const elem: any = vendors.find((el) => el.id === e);
      item.push(elem.name);
    });
    editRow = vendors.filter((el) => el.id === selected[0])[0];
  }

  React.useEffect(() => {
    if (error.length > 0) {
      message.error(error, () => setError(""));
    }
  }, [error]);

  const createBtn = () => {
    setIsAdd(true);
    setVisibly(true);
  };

  const updateBtn = (row: number) => {
    const elem: any = vendors.find((el: IVendor) => el.id === row);
    console.log("elem", elem);
    if (elem) {
      setRow(elem);
    }
    setIsAdd(false);
    setVisibly(true);
  };

  const createVen = (value: IVendor) => {
    setCurrentPageVendor(1);
    addVendor(value.name);
    setVisibly(false);
  };
  const updateVen = (value: IVendor) => {
    const payload = { ...value, id: editRow.id };
    setCurrentPageVendor(1);
    updateVendor(payload);
    setSelectedVendor([]);
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
        setSelectedVendor([]);
        setCurrentPageVendor(1);
        deleteVendor(selected);
      },
      onCancel() {
        setSelectedVendor([]);
      },
    });
  };

  const delFromTable = (rec: any) => {
    confirm({
      title: <Text type="secondary">Do you really want to delete</Text>,
      icon: <ExclamationCircleOutlined />,
      content: <b>{`${rec.name}`}</b>,
      okText: "Yes",
      okType: "danger",
      onOk() {
        setCurrentPageVendor(1);
        deleteVendor([rec.id]);
      },
    });
  };

  return (
    <div>
      <Title level={4} type="secondary">{`Производители ${count}`}</Title>
      <div style={{ marginBottom: 16 }}>
        <Button className="m16button" type="primary" onClick={createBtn}>
          Create
        </Button>
        <Button danger disabled={!hasSelected} onClick={showDeleteModal}>
          {hasSelected ? `Delete (${selected.length})` : "Delete"}
        </Button>
      </div>
      <VendorModal
        title={
          isAdd ? (
            <Text type="secondary">Создать производителя</Text>
          ) : (
            <Text type="secondary">Редактировать производителя</Text>
          )
        }
        visibly={visibly}
        setVisibly={setVisibly}
        submit={isAdd ? createVen : updateVen}
        current={row}
      />
      <TableVendors editBtn={updateBtn} delBtn={delFromTable} />
    </div>
  );
};

export default Vendors;
