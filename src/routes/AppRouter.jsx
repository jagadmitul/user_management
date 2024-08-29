import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../components/auth/Signup';
import UserList from '../components/UserList';
import Layout from '../components/layout/Layout';
import Signin from '../components/auth/Signin';
import AuthLayout from '../components/layout/AuthLayout';
import UserPosts from '../components/UserPosts';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route path="/" exact element={<Signin />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="dashboard" element={<UserList />} />
                <Route path="post/:userId" element={<UserPosts />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
