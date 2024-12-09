import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        {/* Dashboard */}
        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to="/dashboard"
        >
          <img className='w-5 h-5' src={assets.dashboard_icon || assets.order_icon} alt="" />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>

        {/* Add items */}
        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to="/add"
        >
          <img className='w-5 h-5' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add items</p>
        </NavLink>

        {/* List items */}
        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to="/list"
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>List items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to="/orders"
        >
          <img className='w-5 h-5' src={assets.order_icon} alt="" />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
        <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
            to="/users"
        >
            <img className="w-5 h-5" src={assets.user_icon} alt="" />
            <p className="hidden md:block">Users</p>
        </NavLink>
        <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
            to="/advanced-dashboard"
        >
            <img className="w-5 h-5" src={assets.dashboard_icon} alt="" />
            <p className="hidden md:block">Advanced Dashboard</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;