import React, { FC } from "react";
import { v4 as uuid } from "uuid";
import { Button, message, Typography, Modal } from "antd";
import TableDevices from "../components/TableDevices";
import DeviceModal from "../components/modals/DeviceModal";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Devices: FC = () => {
  const { error, selected, devices, count } = useTypedSelector(
    (state) => state.devices
  );
  const { setErrorDevice, addDevice, deleteDevice } = useActions();
  const [isAdd, setIsAdd] = React.useState(true);
  const [visibily, setVisibly] = React.useState(false);

  React.useEffect(() => {
    if (error.length > 0) {
      message.error(error, () => setErrorDevice(""));
    }
  }, [error, setErrorDevice]);

  const hasSelected = selected.length > 0;
  const hasEditSelected = selected.length > 0 && selected.length <= 1;

  let item: any = [];
  let editRow: any = [];
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
    editRow = devices.filter((el) => el.id === selected[0])[0];
  }

  const createBtn = () => {
    setIsAdd(true);
    setVisibly(true);
  };

  const updateBtn = () => {
    setIsAdd(false);
    setVisibly(true);
  };

  const createDev = (value: any) => {
    const info = JSON.stringify(value.info);
    if (value.type && value.vendor) {
      addDevice(value.name, value.type, value.vendor, info);
    }
    setVisibly(false);
  };

  const updateDev = () => {};

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
          type="primary"
          onClick={updateBtn}
          disabled={!hasEditSelected}
        >
          Update
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
      <TableDevices />
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
      />
    </div>
  );
};

export default Devices;
