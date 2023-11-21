import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as companyService from "../../services/companyService";

interface Company {
  _id: string;
  name: string;
  legalNumber: string;
  country: string;
  website?: string;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const companyData = await companyService.getAllCompanies();
    setCompanies(companyData);
  };

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async (values: Company) => {
    try {
      await companyService.createCompany(values);
      setIsModalVisible(false);
      form.resetFields();
      fetchCompanies();
      message.success("Company added successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to add company");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await companyService.deleteCompany(id);
      fetchCompanies();
      message.success("Company deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete company");
    }
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Legal Number",
      dataIndex: "legalNumber",
      key: "legalNumber",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text: string) =>
        text ? (
          <a href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : (
          ""
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: void, record: Company) => (
        <>
          <Popconfirm
            title="Are you sure delete this company?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <main>
      <Button type="primary" onClick={showCreateModal}>
        Add Company
      </Button>
      <Modal
        title="Create New Company"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="legalNumber"
            label="Legal Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={companies} columns={columns} rowKey="_id" />
    </main>
  );
};

export default Companies;
