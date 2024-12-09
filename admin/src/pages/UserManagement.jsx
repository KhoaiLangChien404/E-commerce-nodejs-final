import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const UserManagement = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [updatedUsers, setUpdatedUsers] = useState({});

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/all`, {
                headers: { token },
            });

            if (response.data.success) {
                setUsers(response.data.users);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleInputChange = (userId, field, value) => {
        setUpdatedUsers((prev) => ({
            ...prev,
            [userId]: { ...prev[userId], [field]: value },
        }));
    };

    const handleUpdateUser = async (userId) => {
        const userToUpdate = updatedUsers[userId];

        if (!userToUpdate) {
            toast.error('No changes to update');
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/update`,
                { userId, ...userToUpdate },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('User updated successfully');
                fetchUsers(); // Refresh user list
                setUpdatedUsers((prev) => {
                    const updated = { ...prev };
                    delete updated[userId];
                    return updated;
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleBanUser = async (userId) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/user/ban`,
                { userId },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                fetchUsers();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleUnbanUser = async (userId) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/user/unban`,
                { userId },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                fetchUsers();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={user.name}
                                    onChange={(e) =>
                                        handleInputChange(user._id, 'name', e.target.value)
                                    }
                                    className="border px-2 py-1"
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    defaultValue={user.email}
                                    onChange={(e) =>
                                        handleInputChange(user._id, 'email', e.target.value)
                                    }
                                    className="border px-2 py-1"
                                />
                            </td>
                            <td>{user.isBanned ? 'Banned' : 'Active'}</td>
                            <td>
                                <button
                                    onClick={() => handleUpdateUser(user._id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Update
                                </button>
                                {user.isBanned ? (
                                    <button
                                        onClick={() => handleUnbanUser(user._id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Unban
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBanUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Ban
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
