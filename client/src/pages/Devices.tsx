/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { Button, message, Typography, Modal } from "antd";
import TableDevices from "../components/TableDevices";
import DeviceModal from "../components/modals/DeviceModal";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CurrentDevice } from "../models/IDevice";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Devices: FC = () => {
  const { error, selected, devices, count } = useTypedSelector(
    (state) => state.devices
  );
  const {
    setErrorDevice,
    addDevice,
    deleteDevice,
    updateDevice,
    setCurrentPageDevice,
  } = useActions();
  const [isAdd, setIsAdd] = React.useState(true);
  const [visibily, setVisibly] = React.useState(false);
  const [row, setRow] = React.useState({} as CurrentDevice);

  React.useEffect(() => {
    if (error.length > 0) {
      message.error(error, () => setErrorDevice(""));
    }
  }, [error]);

  const hasSelected = selected.length > 0;
  const hasEditSelected = selected.length > 0 && selected.length <= 1;

  let item: any = [];
  let deleteRow: any = [];

  if (hasSelected) {
    selected.forEach((e) => {
      const elem: any = devices.find((el) => el.id === e);
      deleteRow.push(elem.name);
    });
  }

  if (hasEditSelected) {
    selected.forEach((e) => {
      const elem: any = devices.find((el) => el.id === e);
      item.push(elem.name);
    });
  }

  const createBtn = () => {
    setRow({} as CurrentDevice);
    setIsAdd(true);
    setVisibly(true);
  };

  const updateBtn = (row: any) => {
    setRow({
      id: row.id,
      typeId: row.typeId,
      vendorId: row.vendorId,
      name: row.name,
      info: row.info,
      nType: row.nType,
      nVendor: row.nVendor,
    });
    setIsAdd(false);
    setVisibly(true);
  };

  const createDev = (value: any) => {
    setCurrentPageDevice(1);
    const info = JSON.stringify(value.info);
    addDevice(value.name, value.typeId, value.vendorId, info);

    setVisibly(false);
  };

  const updateDev = (value: any) => {
    const elem: any = devices.find((el) => el.name === value.name);
    const info = JSON.stringify(value.info);
    setCurrentPageDevice(1);
    updateDevice(value.id, value.name, info);
    // updateDevice(elem.id, elem.name, info);
    setVisibly(false);
  };

  const delFromTable = (rec: any) => {
    confirm({
      title: <Text type="secondary">Do you really want to delete</Text>,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <i>{rec.nVendor}</i>
          <b>{` ${rec.name}`}</b>
        </>
      ),
      okText: "Yes",
      okType: "danger",
      onOk() {
        deleteDevice([rec.id]);
        setCurrentPageDevice(1);
      },
    });
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
        setCurrentPageDevice(1);
        deleteDevice(selected);
      },
    });
  };

  return (
    <div>
      <Title level={4} type="secondary">
        {`Devices ${count}`}
      </Title>
      <div style={{ marginBottom: 16 }}>
        <Button className="m16button" type="primary" onClick={createBtn}>
          Create
        </Button>
        <Button
          className="m16button"
          danger
          disabled={!hasSelected}
          onClick={showDeleteModal}
        >
          {hasSelected ? `Delete (${selected.length})` : "Delete"}
        </Button>
      </div>
      <TableDevices editBtn={updateBtn} delBtn={delFromTable} />
      <DeviceModal
        visibly={visibily}
        title={
          isAdd ? (
            <Text type="secondary">Create device</Text>
          ) : (
            <Text type="secondary">Update device</Text>
          )
        }
        submit={isAdd ? createDev : updateDev}
        setVisibly={setVisibly}
        current={row}
        mode={isAdd}
      />
    </div>
  );
};

export default Devices;
