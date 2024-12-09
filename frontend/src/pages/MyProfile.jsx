import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext'

const MyProfile = () => {
    const { navigate } = useContext(ShopContext)
    const [profile, setProfile] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);

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

                console.log('Profile data:', response.data);

                if (response.data.success) {
                    setProfile(response.data.profile);
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

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold mb-4">My Profile</h1>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-lg text-gray-900">{profile.name}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-lg text-gray-900">{profile.email}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-lg text-gray-900">**********</p>
                </div>
                <button onClick={() => navigate('/edit-profile')} className="w-full bg-black text-white text-sm my-2 px-8 py-3 rounded">
                    Edit Profile
                </button>
                <button onClick={() => navigate('/change-password')} className="w-full bg-black text-white text-sm my-2 px-8 py-3 rounded">
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
