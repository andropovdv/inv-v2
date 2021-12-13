/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC } from "react";
import { Button, message, Space, Typography } from "antd";
import TabValueTable from "../components/TabValueTable";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { IValue } from "../models/IValue";
import ValueModal from "../components/modals/ValueModal";

const { Title, Text } = Typography;

const ValueTable: FC = () => {
  const { error, count } = useTypedSelector((state) => state.values);
  const { setErrorValue, addValue } = useActions();

  const [visibly, setVisibly] = React.useState(false);
  const [isAdd, setIsAdd] = React.useState(true);

  React.useEffect(() => {
    if (error.length > 0) {
      message.error(error, () => setErrorValue(""));
    }
  }, [error]);

  const createBtn = () => {
    setIsAdd(true);
    setVisibly(true);
  };
  const updateBtn = () => {
    setIsAdd(false);
    setVisibly(true);
  };

  const createVal = (value: IValue) => {
    addValue(value.value, value.typeId, value.typeInfoId);
    setVisibly(false);
    console.log("Create Values:", value);
  };
  const updateVal = (value: IValue) => {
    console.log("Update Values:", value);
  };

  return (
    <div>
      <Title type="secondary" level={4}>
        {count === 0 ? "Value" : `Values (${count} rows)`}
      </Title>
      <Space>
        <Button type="primary" onClick={createBtn}>
          Create
        </Button>
        <Button type="primary" onClick={updateBtn}>
          Update
        </Button>
        <Button danger>Remove</Button>
      </Space>
      <TabValueTable />
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
      />
    </div>
  );
};

export default ValueTable;
