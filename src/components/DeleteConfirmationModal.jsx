import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Delete Confirmation</h2>
                <p className="mb-4">Are you sure you want to delete this user?</p>
                <div className="flex flex-row">
                    <button
                        onClick={onConfirm}
                        className="basis-1/2 px-4 py-2 bg-black text-white rounded-md"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="basis-1/2 ml-2 px-4 py-2 bg-gray-300 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
