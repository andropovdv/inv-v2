import { Button, Form, Input, Select } from "antd";
import React, { FC } from "react";
import { ISUser } from "../../models/IUser";
import { rules } from "../../utils/rules";

const { Option } = Select;

interface UserProps {
  submit: (user: ISUser) => void;
  mode: boolean;
  loading: boolean;
}

const UserForm: FC<UserProps> = (props: UserProps) => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    console.log("value: ", value);
    props.submit(value);
    form.resetFields();
  };

  // const initForm: ISUser = {
  //   username: "default",
  //   email: "",
  //   role: "",
  //   password: "",
  // };

  // const initForm: ISUser = {} as ISUser;

  const addInit: ISUser = {
    username: "add",
    email: "",
    password: "",
    role: "",
  };
  const editInit: ISUser = {
    username: "edit",
    email: "",
    password: "",
    role: "",
  };

  const roles = ["ADMIN", "USER"];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Form
      {...layout}
      onFinish={onFinish}
      form={form}
      initialValues={props.mode ? addInit : editInit}
    >
      <Form.Item label="Имя" name="username" rules={[rules.required()]}>
        <Input
        // value={element.username}
        // onChange={(e) => setElement({ ...element, username: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="e-mail"
        name="email"
        rules={[
          {
            type: "email",
            message: "message: 'The input is not valid E-mail!",
          },
          rules.required(),
        ]}
      >
        <Input
        // value={element.email}
        // onChange={(e) => setElement({ ...element, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required(), { min: 5, message: "Не менее 5 символов" }]}
      >
        <Input.Password
        // value={element.password}
        // onChange={(e) => setElement({ ...element, password: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Еще раз пароль"
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
              return Promise.reject(new Error("Пароли не совпадают"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="Role" name="role" rules={[rules.required()]}>
        <Select
          placeholder="select role user"
          // onChange={(role: string) => setElement({ ...element, role: role })}
        >
          {roles.map((el) => (
            <Option key={el} value={el}>
              {el}
            </Option>
          ))}
          {/* <Option value="ADMIN">Admin</Option>
          <Option value="USER">User</Option> */}
        </Select>
      </Form.Item>
      {/* <Row justify="end"> */}
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="m16button"
          loading={props.loading}
        >
          Register
        </Button>
      </Form.Item>
      {/* </Row> */}
    </Form>
  );
};

export default UserForm;
