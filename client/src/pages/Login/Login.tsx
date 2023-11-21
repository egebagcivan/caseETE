import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message as antMessage } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import * as authService from "../../services/authService";
import "./Login.css";

interface LoginPageProps {
  handleAuthEvt: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const LoginPage = ({ handleAuthEvt }: LoginPageProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitted(true);
      await authService.login(formData);
      handleAuthEvt();
      navigate("/");
    } catch (err) {
      antMessage.error((err as Error).message);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="login-container">
      <Card title="Log In" bordered={false} style={{ width: 400 }}>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input
              prefix={<LoginOutlined />}
              name="email"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password name="password" onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitted}>
              Log In
            </Button>
          </Form.Item>
          <Link to="/">Cancel</Link>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
