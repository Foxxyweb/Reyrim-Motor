import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Cek apakah ada tulisan 'isAdmin' di memori browser
    const isAuthenticated = localStorage.getItem('isAdmin');

    // Kalau ada, tampilkan halaman rahasia (Outlet)
    // Kalau tidak, tendang ke "/login"
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;