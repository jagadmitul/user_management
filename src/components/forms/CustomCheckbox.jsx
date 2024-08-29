import React from 'react';
import { useField } from 'formik';

const CustomCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className="mb-4">
            <label className="flex items-center">
                <input type="checkbox" {...field} {...props} />
                <span className="ml-2">{children}</span>
            </label>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomCheckbox;
