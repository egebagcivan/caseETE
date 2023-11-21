import { Navigate } from 'react-router-dom';
import React from 'react';

import { UserType } from '../../App';

interface ProtectedRouteProps {
  user: UserType | null;
  children: React.ReactNode;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/auth/login" />;
  return <>{children}</>;
};

export default ProtectedRoute;
