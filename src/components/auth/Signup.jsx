import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../forms/CustomInput';
import CustomCheckbox from '../forms/CustomCheckbox';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from 'react-icons/hi';
import useAuth from '../../utils/hooks/useAuth';
import { Link } from 'react-router-dom';

const Signup = () => {

    const { signUp } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    });

    const handlePasswordClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen flex py-5 items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-6 p-6 bg-white shadow-lg rounded-lg">
                <div className='space-y-2'>
                    <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
                    <p className="text-sm text-gray-500">Enjoy the great benefits and exclusive offers by creating your account.</p>
                </div>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        terms: false,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        const response = await signUp(values);
                        if (response.status === 'failed') {
                            setErrors({ email: response.message });
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <CustomInput label="First Name" name="firstName" type="text" />
                            <CustomInput label="Last Name" name="lastName" type="text" />
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
                            <CustomCheckbox name="terms">
                                Subscribe to news and updates
                            </CustomCheckbox>
                            <p className='text-sm text-gray-500'>
                                By clicking Sign Up, you agree to out <Link href='/' className='underline text-black'>Terms and Conditions</Link> and <Link href='/' className='underline text-black'>Privacy Statement</Link>
                            </p>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="mt-2 text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link to="/signin" className="font-medium text-black hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;