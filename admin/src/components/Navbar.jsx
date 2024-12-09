import React from 'react'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-7 px-[4%] justify-between bg-gray-100 shadow-md'>
            <h1 className='text-2xl sm:text-4xl font-bold text-gray-800 tracking-wide'>Admin Panel</h1>
            <button
                onClick={() => setToken('')}
                className='bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300'>
                Logout
            </button>
        </div>
    );
};

export default Navbar;
