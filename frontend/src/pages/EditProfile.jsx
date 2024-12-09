import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const EditProfile = () => {
    const [profile, setProfile] = useState({ name: '', email: '', phoneNum: '', address: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { navigate } = useContext(ShopContext);

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
                    setProfile(response.data.profile);
                    setFormData(response.data.profile);
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
        if (formData.name === profile.name && formData.email === profile.email) {
            setError('New name and email cannot be the same as the old ones.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                'http://localhost:4000/api/user/edit-profile',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setError('');
                navigate('/my-profile'); // Navigate to my-profile page
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        }
    };

    if (loading) {
        return <p>Loading edit profile...</p>;
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder={formData.name || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder={formData.email || ''}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNum"
                            placeholder={formData.phoneNum || 'Don\'t have phone number yet'}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder={formData.address || 'Don\'t have address yet'}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full bg-black text-white text-sm my-2 px-8 py-3 rounded">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
