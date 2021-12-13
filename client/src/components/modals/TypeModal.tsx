import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button, Space, Select } from "antd";
import React, { FC } from "react";
import { IType } from "../../models/IType";
import { rules } from "../../utils/rules";

interface TypeProps {
  title: any;
  visibly: boolean;
  setVisibly: (v: boolean) => void;
  submit: (type: IType) => void;
  current?: CurrentRow;
}

interface CurrentRow {
  name: string;
}

const TypeModal: FC<TypeProps> = (props: TypeProps) => {
  const { title, visibly, current, setVisibly, submit } = props;
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(current);
  }, [form, current]);

  const exitBtn = () => {
    form.resetFields();
    setVisibly(false);
  };

  const submitBtn = () => {
    form
      .validateFields()
      .then((value) => {
        console.log("Value: ", value);
        submit(value);
        form.resetFields();
      })
      .catch((info) => {
        form.resetFields();
        console.log("Calibration failure:", info);
      });
  };

  const typePreferense = [
    { name: "STRING", key: 1 },
    { name: "DROPDOWN", key: 2 },
  ];

  return (
    <>
      <Modal
        forceRender
        destroyOnClose={true}
        title={title}
        visible={visibly}
        onCancel={exitBtn}
        onOk={submitBtn}
      >
        <Form form={form} preserve={false} name="types">
          <Form.Item
            // label="Наименование"
            name="name"
            rules={[rules.required()]}
          >
            <Input placeholder="Наименование" />
          </Form.Item>
          <Form.List name="pref">
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                  >
                    Add
                  </Button>
                </Form.Item>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "preferense"]}
                      fieldKey={[fieldKey, "preferense"]}
                      rules={[rules.required()]}
                    >
                      <Input placeholder="Preferense" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "type_preferense"]}
                      fieldKey={[fieldKey, "type_preferense"]}
                      rules={[rules.required()]}
                    >
                      <Select placeholder="Тип поля" style={{ width: 175 }}>
                        {typePreferense.map((el) => (
                          <Select.Option key={el.key} value={el.name}>
                            {el.name}
                          </Select.Option>
                        ))}
                      </Select>
                      {/* <Input placeholder="Type preferense" /> */}
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default TypeModal;
