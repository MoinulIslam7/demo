import React from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import useUser from '../../Hooks/useUser';

export default function Private({ children }) {
    const { user, isLoading } = useUser();
    if (isLoading) return <Loading />;
    return user?.id ? children : <Navigate to="/login" />;
}
