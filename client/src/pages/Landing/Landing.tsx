import "./Landing.css";
import { useState, useEffect } from "react";
import { UserType } from "../../App";
import { UserOutlined, ShoppingCartOutlined, TeamOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, Statistic } from "antd";
import * as productService from "../../services/productService";
import * as companyService from "../../services/companyService";
import * as userService from "../../services/userService";

interface LandingProps {
  user: UserType | null;
}
interface Company {
  _id: string;
  name: string;
  createdAt: string;
}

const Landing = ({ user }: LandingProps) => {
  const [productCount, setProductCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [latestCompanies, setLatestCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await productService.getAllProducts();
      const companies = await companyService.getAllCompanies();
      const users = await userService.getAllUsers();

      setProductCount(products.length);
      setCompanyCount(companies.length);
      setUserCount(users.length);
      setLatestCompanies(companies.slice(0, 3));
    };

    fetchData();
  }, []);

  return (
    <main className="container">
      <Card title="Statistics">
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Users" value={userCount} prefix={<UserOutlined />} />
        </Col>
        <Col span={8}>
        <Statistic title="Products" value={productCount} prefix={<ShoppingCartOutlined />} />
        </Col>
        <Col span={8}>
        <Statistic title="Companies" value={companyCount} prefix={<TeamOutlined />} />
        </Col>
      </Row>
      </Card>
      <Card title="Latest Companies">
        <List
          itemLayout="horizontal"
          dataSource={latestCompanies}
          renderItem={company => (
            <List.Item>
              <List.Item.Meta
                title={company.name}
                description={`Added on: ${new Date(company.createdAt).toLocaleDateString()}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </main>
  );
};

export default Landing;
