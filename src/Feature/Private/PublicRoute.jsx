import React from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { useAuth } from '../../Contexts/AuthProvider';

export default function PublicRoute({ children }) {
  const { checkRole, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  const userHasUserRole = checkRole('user');
  console.log(userHasUserRole);
  return userHasUserRole ? children : <Navigate to="/login" />;
}
