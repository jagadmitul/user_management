import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { session } = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            element={session?.signedIn ? element : <Navigate to="/signin" />}
        />
    );
};

export default PrivateRoute;
