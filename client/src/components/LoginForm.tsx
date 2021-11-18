import React, { FC } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { rules } from "../utils/rules";
import { useActions } from "../hooks/useActions";

const LoginForm: FC = () => {
  const { isLoading, error } = useTypedSelector((state) => state.auth);
  const { login } = useActions();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = () => {
    login(email, password);
  };

  return (
    <Form layout="inline" onFinish={submit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form.Item name="email" rules={[rules.required()]}>
        <Input
          placeholder="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="password" rules={[rules.required()]}>
        <Input
          placeholder="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="password">
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
