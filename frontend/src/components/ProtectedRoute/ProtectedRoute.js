// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Assuming 'user' is the state slice for user authentication

    if (!isLoggedIn) {
        // If user is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    return children; // If user is logged in, render the children components (protected routes)
};

export default ProtectedRoute;
