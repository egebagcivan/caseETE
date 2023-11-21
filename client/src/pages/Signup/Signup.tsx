import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message as antMessage, Card } from "antd";
import * as authService from "../../services/authService";
import "./Signup.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

const Signup = ({ handleAuthEvt }: { handleAuthEvt: () => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async () => {
    if (!(formData.password && formData.password === formData.passwordConf)) {
      antMessage.error("Passwords do not match!");
      return;
    }

    try {
      setIsSubmitted(true);
      await authService.signup(formData);
      handleAuthEvt();
      navigate("/");
    } catch (err) {
      antMessage.error((err as Error).message);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="signup-container">
      <Card title="Sign Up" bordered={false}>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input name="name" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input name="email" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password name="password" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="passwordConf"
            rules={[{ required: true }]}
          >
            <Input.Password name="passwordConf" onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitted}
              loading={isSubmitted}
            >
              {!isSubmitted ? "Sign Up" : "Sending..."}
            </Button>
          </Form.Item>
          <Link to="/">Cancel</Link>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
