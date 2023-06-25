import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthProvider';

export default function UserNavbar() {
  const { logout } = useAuth();
  return (
    <div
      style={{ boxShadow: '0px 4px 29px rgba(0, 0, 0, 0.09)' }}
      className="absolute top-16 right-60 z-10 w-32  rounded-md bg-white shadow-lg focus:outline-none cursor-pointer"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex="-1"
    >
      <div className="py-1" role="none">
        <Link to="/UserProfile" className="text-textPrimary block px-4 py-2 text-sm">
          Profile
        </Link>
        {/* routing should be apply here */}
        <button
          type="submit"
          onClick={logout}
          className="text-textPrimary block w-full px-4 py-2 text-left text-sm"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
