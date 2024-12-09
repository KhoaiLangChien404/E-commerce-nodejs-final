import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://localhost:4000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    setError('');
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:4000/api/user/change-password',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setSuccess('Change password successfully.');
                setError('');
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
            console.error(error.response);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className="text-2xl font-bold mb-4">Change Password</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={formData.currentPassword || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={formData.newPassword || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <button type="button" onClick={toggleShowPassword} className="text-sm text-blue-500">
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <button type="submit" className="w-full bg-black text-white text-sm my-2 px-8 py-3 rounded">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;