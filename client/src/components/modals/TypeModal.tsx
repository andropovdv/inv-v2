import { Modal, Form, Input } from "antd";
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
          <Form.Item name="name" rules={[rules.required()]}>
            <Input placeholder="Наименование" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TypeModal;
