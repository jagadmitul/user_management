import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from './forms/CustomInput';
import { addNewUser, updateUser } from '../services/UserService';

const UserDataModal = ({ isOpen, onClose, initialValues, refreshUsers }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        gender: Yup.string().required('Gender is required'),
        status: Yup.string().required('Status is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (initialValues) {
                // Edit mode
                await updateUser(values);
            } else {
                // Add mode
                await addNewUser(values);
            }
            refreshUsers(); // Re-fetch users list after adding/editing
            onClose();
        } catch (error) {
            console.error("Failed to save user:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">
                    {initialValues ? 'Edit User' : 'Add New User'}
                </h2>
                <Formik
                    initialValues={initialValues || {
                        name: '',
                        email: '',
                        gender: '',
                        status: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <CustomInput label="Name" name="name" type="text" />
                            <CustomInput label="Email" name="email" type="email" />
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Gender</label>
                                <div className="flex">
                                    <label className="mr-4">
                                        <Field type="radio" name="gender" value="male" /> Male
                                    </label>
                                    <label className="mr-4">
                                        <Field type="radio" name="gender" value="female" /> Female
                                    </label>
                                    <label>
                                        <Field type="radio" name="gender" value="other" /> Other
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Status</label>
                                <Field as="select" name="status" className="w-full p-2 border rounded">
                                    <option value="">Select status</option>
                                    <option value="active">Active</option>
                                    <option value="away">Away</option>
                                    <option value="busy">Busy</option>
                                    <option value="inactive">In Active</option>
                                </Field>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-black text-white rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UserDataModal;
