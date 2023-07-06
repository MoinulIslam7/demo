import React from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { useAuth } from '../../Contexts/AuthProvider';

export default function Private({ children }) {
    const { checkRole, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />;
    }

    const userHasAdminRole = checkRole('admin');
    const userHasSuperAdminRole = checkRole('superadmin');
    const userHasRole = userHasAdminRole || userHasSuperAdminRole;

    return userHasRole ? children : <Navigate to="/login" />;
}
