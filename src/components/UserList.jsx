import React, { useState, useEffect } from 'react';
import { getUsersList, deleteUser } from '../services/UserService';
import { TiPencil } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import UserDataModal from './UserDataModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsersList();
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = (userId) => {
        setUserToDelete(userId);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUser(userToDelete);
            fetchUsers(); // Re-fetch the users list after deletion
        } catch (error) {
            console.error("Failed to delete user:", error);
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false); // Close the confirmation modal
        }
    };

    const handleAddNewUser = () => {
        setSelectedUser(null); // Reset selected user for new user creation
        setIsModalOpen(true);
    };

    const handleUserPost = (userId, user_name) => {
        navigate(`/post/${userId}`, {
            state: { user_name },
        }); // Navigate to the posts page with userId
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
            <div className="flex justify-between mb-4">
                <button 
                    className="px-4 py-2 bg-black text-white rounded-md"
                    onClick={handleAddNewUser}
                >
                    Add New User
                </button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded-md p-2"
                />
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Gender</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.gender}</td>
                            <td className="py-2 px-4 border-b">{user.status}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    className="px-2 text-gray-600 hover:text-gray-800"
                                    onClick={() => handleEdit(user)}
                                >
                                    <TiPencil />
                                </button>
                                <button 
                                    className="px-2 text-gray-600 hover:text-gray-800"
                                    onClick={() => handleDelete(user.id)}
                                    disabled={isDeleting}
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                <button 
                                    className="px-2 text-gray-600 hover:text-gray-800"
                                    onClick={() => handleUserPost(user.id, user.name)}
                                >
                                    <BiEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for adding/editing user */}
            <UserDataModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialValues={selectedUser}
                refreshUsers={fetchUsers}
            />

            {/* Modal for delete confirmation */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default UserList;
