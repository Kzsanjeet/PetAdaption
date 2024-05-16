import React from 'react';
import Navbar from './Navbar';
import ShelterSidebar from './ShelterSidebar';

const ShelterLayout = ({ children }) => {
  return (
    <div>
      <div className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8" aria-label="Global">
      <ShelterSidebar />
      </div>
      
      {children}
    </div>
  )
}

export default ShelterLayout