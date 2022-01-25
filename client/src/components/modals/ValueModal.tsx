/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Modal } from "antd";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IValue } from "../../models/IValue";
import PropertyDropDown from "../dropdown/PropertyDropDown";
import TypesDropDown from "../dropdown/TypesDropDown";
import StaticScreenValue from "./StaticScreenValue";

interface ValueProps {
  title: any;
  visibly: boolean;
  setVisibly: (v: boolean) => void;
  setIsAddFeature: (v: boolean) => void;
  submit: (value: IValue) => void;
  current?: CurrentRow;
  isAdd: boolean;
  isAddFeature: boolean;
}

interface CurrentRow {
  value: string;
  typeId?: number;
  typeInfoId?: number;
  id?: number;
  type?: string;
  typeInfo?: string;
  unit?: string;
  typePref?: string;
}

const { Item } = Form;

const ValueModal: FC<ValueProps> = (props: ValueProps) => {
  const {
    title,
    visibly,
    current,
    setVisibly,
    submit,
    isAdd,
    isAddFeature,
    setIsAddFeature,
  } = props;

  const { isLoading: isLoadingValue } = useTypedSelector(
    (state) => state.values
  );
  const { propertisDropDown } = useTypedSelector((state) => state.propertis);

  const { setSelectedValue, removeTypeDropDown } = useActions();

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(current);
  }, [form, current]);

  const closeModal = () => {
    setVisibly(false);
    form.resetFields();
    setSelectedValue([]);
    removeTypeDropDown([]);
    setIsAddFeature(false);
  };

  const submitBtn = () => {
    form
      .validateFields()
      .then((values) => {
        submit(values);
        form.resetFields();
      })
      .catch((info) => console.log("Calibration failure", info));
  };

  return (
    <Modal
      forceRender
      destroyOnClose={true}
      title={title}
      visible={visibly}
      confirmLoading={isLoadingValue}
      onCancel={closeModal}
      onOk={submitBtn}
    >
      <Form name="values" preserve={false} form={form}>
        {isAdd ? (
          <>
            {isAddFeature ? (
              <StaticScreenValue
                title="Тип оборудования"
                current={current?.type}
                nameItem="typeId"
              />
            ) : (
              <TypesDropDown />
            )}
            <PropertyDropDown />
          </>
        ) : (
          <>
            <StaticScreenValue
              nameItem="typeId"
              title="Тип оборудования"
              current={current?.type}
            />
            <StaticScreenValue
              nameItem="typeInfoId"
              title="Характеристика"
              current={current?.typeInfo}
            />
          </>
        )}
        <Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.typeInfoId !== currentValues.typeInfoId
          }
        >
          {() => {
            const typePref = propertisDropDown.find(
              (el) => el.id === form.getFieldValue("typeInfoId")
            );
            if (typePref?.type_preferense !== "STRING") {
              return (
                <Item name="value">
                  <Input />
                </Item>
              );
            }
            return null;
          }}
        </Item>
      </Form>
    </Modal>
  );
};

export default React.memo(ValueModal);
