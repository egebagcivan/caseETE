import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as productService from "../../services/productService";

interface Product {
  _id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const productData = await productService.getAllProducts();
    setProducts(productData);
  };

  const showCreateModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async (values: Product) => {
    try {
      await productService.createProduct(values);
      setIsModalVisible(false);
      form.resetFields();
      fetchProducts();
      message.success("Product added successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to add product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      fetchProducts();
      message.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete product");
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Product Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Prouct Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: void, record: Product) => (
        <>
          <Popconfirm
            title="Are you sure delete this product?"
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
        Add Product
      </Button>
      <Modal
        title="Create New Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
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
      <Table dataSource={products} columns={columns} rowKey="_id" />
    </main>
  );
};

export default Products;
