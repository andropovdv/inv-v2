import React, { FC } from "react";
import { Form, Input, Modal, Select } from "antd";
import { rules } from "../../utils/rules";
import { ISUser } from "../../models/IUser";

export interface UserProps {
  mode: boolean;
  visibly: boolean;
  title: any;
  cancelModal: (v: boolean) => void;
  current?: CurrentRow;
  submit: (user: ISUser) => void;
}

export interface CurrentRow {
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserModal: FC<UserProps> = (props: UserProps) => {
  const { mode, visibly, title, cancelModal, current, submit } = props;

  const roles = ["ADMIN", "USER"];

  const [form] = Form.useForm();

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(current);
  }, [form, current]);

  const exitButton = () => {
    cancelModal(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        forceRender
        title={title}
        visible={visibly}
        onCancel={exitButton}
        destroyOnClose={true}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              submit(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Calibration failure:", info);
            });
        }}
      >
        <Form form={form} name="users" preserve={false}>
          <Form.Item
            label="username"
            name="username"
            rules={[rules.required()]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[
              rules.required(),
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {mode ? (
            <>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  rules.required(),
                  { min: 5, message: "Не менее 5 символов" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="repeat password"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  rules.required(),
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Не совпадают"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          ) : null}
          <Form.Item label="Role" name="role" rules={[rules.required()]}>
            <Select placeholder="select role user">
              {roles.map((el) => (
                <Select.Option key={el} value={el}>
                  {el}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
