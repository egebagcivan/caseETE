import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, message as antMessage } from "antd";
import { LockOutlined } from "@ant-design/icons";
import * as authService from "../../services/authService";
import "./ChangePassword.css";

interface ChangePasswordProps {
  handleAuthEvt: () => void;
}

const ChangePassword = ({ handleAuthEvt }: ChangePasswordProps) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: { password: string; newPassword: string; newPasswordConf: string }) => {
    if (values.newPassword !== values.newPasswordConf) {
      antMessage.error("New passwords do not match!");
      return;
    }
  
    try {
      setIsSubmitted(true);
      // Only send password and newPassword to the backend
      await authService.changePassword({
        password: values.password,
        newPassword: values.newPassword,
      });
      handleAuthEvt();
      navigate("/");
      antMessage.success("Password changed successfully");
    } catch (err) {
      antMessage.error((err as Error).message);
      setIsSubmitted(false);
    }
  };
  

  return (
    <div className="change-password-container">
      <Card title="Change Password" bordered={false} style={{ width: 400 }}>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Current Password"
            name="password"
            rules={[{ required: true, message: "Please input your current password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please input your new password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="newPasswordConf"
            rules={[{ required: true, message: "Please confirm your new password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmitted}>
              Change Password
            </Button>
            <Link to="/" style={{ marginLeft: 10 }}>Cancel</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;
