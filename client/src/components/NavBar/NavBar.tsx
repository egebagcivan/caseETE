import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../App';
import { Menu } from 'antd';
import { UserOutlined, TeamOutlined, LoginOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './NavBar.css'; // Özel CSS stil dosyanız

interface NavBarProps {
  user: UserType | null;
  handleLogout: () => void;
}

const NavBar = ({ user, handleLogout }: NavBarProps) => {
  return (
    <nav className="navbar">
      <Menu mode="horizontal">
        {user ? (
          <>
            <Menu.Item key="welcome" icon={<UserOutlined />}>
              Welcome, {user.name}
            </Menu.Item>
            <Menu.Item key="companies" icon={<TeamOutlined />}>
              <NavLink to="/companies">Companies</NavLink>
            </Menu.Item>
            <Menu.Item key="change-password" icon={<SettingOutlined />}>
              <NavLink to="/auth/change-password">Change Password</NavLink>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              LOG OUT
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <NavLink to="/auth/login">Log In</NavLink>
            </Menu.Item>
            <Menu.Item key="signup" icon={<UserOutlined />}>
              <NavLink to="/auth/signup">Sign Up</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </nav>
  );
};

export default NavBar;
