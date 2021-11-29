import { Modal, Form, Input, Typography } from "antd";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { rules } from "../../utils/rules";

const { Text } = Typography;

interface UserProps {
  visibly: boolean;
  setVisibly: (v: boolean) => void;
}

const UserChangeModal: FC<UserProps> = (props: UserProps) => {
  const { visibly, setVisibly } = props;
  const { selected, users } = useTypedSelector((state) => state.users);
  const { setSelectedUsers, updateUser } = useActions();

  const [form] = Form.useForm();

  const exitButton = () => {
    setSelectedUsers([]);
    setVisibly(false);
  };

  const updateButton = () => {
    form.validateFields().then((values) => {
      delete values["confirm"];
      const payload = { ...values, id: selected[0] };
      updateUser(payload);
      form.resetFields();
      setSelectedUsers([]);
      setVisibly(false);
    });
  };

  const titleUser = users.filter((el) => el.id === selected[0]);

  return (
    <Modal
      visible={visibly}
      title={
        titleUser.length > 0 ? (
          <Text type="secondary">
            Change password for {titleUser[0].username}
          </Text>
        ) : (
          ""
        )
      }
      forceRender
      destroyOnClose={true}
      onCancel={exitButton}
      okText="Update"
      onOk={updateButton}
    >
      <Form form={form} name="chagePassword" preserve={false}>
        <Form.Item
          label="password"
          name="password"
          rules={[rules.required(), { min: 5, message: "min 5 symbols" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="confirm password"
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
                return Promise.reject(new Error("do not match"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserChangeModal;
