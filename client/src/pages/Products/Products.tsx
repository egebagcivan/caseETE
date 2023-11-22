import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as productService from "../../services/productService";
import * as companyService from "../../services/companyService";

interface Product {
  _id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: string;
}

interface Company {
  _id: string;
  name: string;
  legalNumber: string;
  country: string;
  website?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCompanies = async () => {
      const companyData = await companyService.getAllCompanies();
      setCompanies(companyData);
    };

    fetchCompanies();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const productData = await productService.getAllProducts();
    const productWithCompanyNames = productData.map(product => {
      const company = companies.find(c => c._id === product.company);
      return { ...product, companyName: company ? company.name : 'Unknown' };
    });
    setProducts(productWithCompanyNames);
    console.log(productWithCompanyNames);
  };

  const handleEditClick = (product: Product) => () => {
    showCreateOrEditModal(product);
  };

  const showCreateModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showCreateOrEditModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleCreateOrUpdate = async (values: Product) => {
    try {
      if (editingProduct) {
        await productService.updateProduct({ ...editingProduct, ...values });
        message.success("Product updated successfully");
      } else {
        await productService.createProduct(values);
        message.success("Product added successfully");
      }
      setIsModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error("Failed to process product");
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
      dataIndex: "category",
      key: "category",
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
      dataIndex: ["company", "name"], 
      key: "companyName",
      render: (_: void, record: Product) => record.company?.name || 'Unknown'
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
          <Button icon={<EditOutlined />} onClick={handleEditClick(record)} />
        </>
      ),
    },
  ];

  return (
    <main className="mainContainer">
      <Button type="primary" className="addButton" onClick={showCreateModal}>
        Add Product
      </Button>
      <Modal
        title={editingProduct ? "Edit Product" : "Create New Product"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreateOrUpdate} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Product Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Product Amount"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Product Unit"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Product Company"
            rules={[{ required: true }]}
          >
            <Select>
              {companies.map((company) => (
                <Select.Option key={company._id} value={company._id}>
                  {company.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <div className="tableContainer">
      <Table dataSource={products} columns={columns} rowKey="_id" />
      </div>
    </main>
  );
};

export default Products;
