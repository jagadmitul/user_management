import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../forms/CustomInput';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from 'react-icons/hi';
import useAuth from '../../utils/hooks/useAuth';
import { Link } from 'react-router-dom';

const Signin = () => {

    const { signIn } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });

    const handlePasswordClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-6 p-6 bg-white shadow-lg rounded-lg">
                <div className='space-y-2'>
                    <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                    <p className="text-sm text-gray-500">Please enter the below details to sign in to your account.</p>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        const response = await signIn(values);
                        if (response.status === 'failed') {
                            setErrors({ email: response.message });
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <CustomInput
                                label="Email"
                                name="email"
                                type="email"
                                icon={<HiOutlineMail />}
                            />
                            <CustomInput
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                icon={showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                                onClickEvent={handlePasswordClick}
                            />
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                                >
                                    Sign In
                                </button>
                            </div>
                            <p className="mt-2 text-center text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-black hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signin;