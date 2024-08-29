import React from 'react';
import { useField } from 'formik';

const CustomInput = ({ label, icon, onClickEvent, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">{label}</label>
            <div className="flex items-center border rounded">
                <input
                    {...field}
                    {...props}
                    className="w-full p-2 border-0 focus:outline-none"
                />
                {icon && <span className="p-2" onClick={onClickEvent}>{icon}</span>}
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomInput;