import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { IVendor } from "../../models/IVendor";
import { rules } from "../../utils/rules";

interface VendorProps {
  title: any;
  visibly: boolean;
  setVisibly: (v: boolean) => void;
  submit: (vendor: IVendor) => void;
  current?: CurrentRow;
}

interface CurrentRow {
  name: string;
}

const VendorModal: FC<VendorProps> = (props: VendorProps) => {
  const { current, title, visibly, setVisibly, submit } = props;

  const { setSelectedVendor } = useActions();
  const [form] = useForm();

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(current);
  }, [form, current]);

  const exitButton = () => {
    form.resetFields();
    setSelectedVendor([]);
    setVisibly(false);
  };

  const submitButton = () => {
    form
      .validateFields()
      .then((values) => {
        submit(values);
        setSelectedVendor([]);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Calibration failure:", info);
      });
  };

  return (
    <div>
      <Modal
        forceRender
        destroyOnClose={true}
        title={title}
        visible={visibly}
        onCancel={exitButton}
        onOk={submitButton}
      >
        <Form form={form} preserve={false} name="vendors">
          <Form.Item
            label="Наименование"
            name="name"
            rules={[rules.required()]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorModal;
