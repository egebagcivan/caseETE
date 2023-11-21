// npm modules
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// pages
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Companies from "./pages/Companies/Companies";
import Products from "./pages/Products/Products";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

// components
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// services
import * as authService from "./services/authService";

// styles
import "./App.css";

type UserType = {
  email: string;
  username: string;
  name: string;
  id: string;
} | null;

function App() {
  const [user, setUser] = useState<UserType>(authService.getUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleAuthEvt = () => {
    setUser(authService.getUser());
  };

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/companies"
          element={
            <ProtectedRoute user={user}>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute user={user}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
export type { UserType };
export default App;
