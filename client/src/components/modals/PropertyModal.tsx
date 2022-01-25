import { Modal, Form, Input, Select } from "antd";
import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IProperty } from "../../models/IProperty";
import { rules } from "../../utils/rules";

interface PropertyProps {
  title: any;
  visibly: boolean;
  setVisibly: (v: boolean) => void;
  submit: (property: IProperty) => void;
  current?: CurrentRow;
}

interface CurrentRow {
  preferense: string;
  type_preferense: string;
}

const PropertyModal: FC<PropertyProps> = (props: PropertyProps) => {
  const { title, visibly, setVisibly, submit, current } = props;
  const [form] = Form.useForm();

  const { isLoading } = useTypedSelector((state) => state.propertis);
  const types = ["STRING", "DROPDOWN"];

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(current);
  }, [current, form]);

  const closeModal = () => {
    form.resetFields();
    setVisibly(false);
  };

  const submitButton = () => {
    form
      .validateFields()
      .then((values) => {
        submit(values);
        form.resetFields();
      })
      .catch((info) => console.log("Calibration failure", info));
  };

  return (
    <div>
      <Modal
        forceRender
        destroyOnClose={true}
        title={title}
        visible={visibly}
        confirmLoading={isLoading}
        onCancel={closeModal}
        onOk={submitButton}
      >
        <Form name="property" preserve={false} form={form}>
          <Form.Item name="preferense" rules={[rules.required()]}>
            <Input placeholder="Характеристика" />
          </Form.Item>
          <Form.Item name="type_preferense" rules={[rules.required()]}>
            <Select>
              {types.map((el, index) => (
                <Select.Option key={index} value={el}>
                  {el}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => {
              if (form.getFieldValue("type_preferense") === "STRING") {
                return (
                  <Form.Item name="unit">
                    <Input />
                  </Form.Item>
                );
              }
              return undefined;
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PropertyModal;
