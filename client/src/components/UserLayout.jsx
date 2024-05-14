import React from 'react';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';

const UserLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8" aria-label="Global">
      <UserSidebar/>
      </div>
      
      {children}
    </div>
  )
}

export default UserLayout