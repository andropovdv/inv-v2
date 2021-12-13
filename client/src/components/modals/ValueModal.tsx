/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Modal, Select } from "antd";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IValue } from "../../models/IValue";
import { rules } from "../../utils/rules";

interface ValueProps {
  title: any;
  visibly: boolean;
  setVisibly: (v: boolean) => void;
  submit: (value: IValue) => void;
  current?: CurrentRow;
}

interface CurrentRow {
  pref: string;
  perfType: string;
}

const ValueModal: FC<ValueProps> = (props: ValueProps) => {
  const { title, visibly, current, setVisibly, submit } = props;

  const { isLoading } = useTypedSelector((state) => state.values);
  const { types } = useTypedSelector((state) => state.types);
  const { propertis } = useTypedSelector((state) => state.propertis);

  const { getProperty, getType } = useActions();

  React.useEffect(() => {
    getProperty();
    getType();
  }, []);

  const [form] = Form.useForm();

  const closeModal = () => {
    form.resetFields();
    setVisibly(false);
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
      confirmLoading={isLoading}
      onCancel={closeModal}
      onOk={submitBtn}
    >
      <Form name="values" preserve={false} form={form}>
        <Form.Item name="typeId" rules={[rules.required()]}>
          <Select>
            {types.map((el, index) => (
              <Select.Option key={el.id} value={el.id}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="typeInfoId" rules={[rules.required()]}>
          <Select>
            {propertis.map((el, index) => (
              <Select.Option key={el.id} value={el.id}>
                {el.preferense}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="value" rules={[rules.required()]}>
          <Input placeholder="Value" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ValueModal;
