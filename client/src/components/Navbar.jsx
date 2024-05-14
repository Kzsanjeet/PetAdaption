import React, { useState, useEffect } from 'react';
import petLogo from '../assets/images/petrescue.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsLoggedIn(false); // Update isLoggedIn state
    navigate('/');
  };

  return (
    <>
      <header className="bg-indigo-800 sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 ">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={petLogo} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={handleMobileMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold leading-6 text-white">Dogs</a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">Cats</a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">Other Pets</a>
          <Link to="/about"><a href="#" className="text-sm font-semibold leading-6 text-white">About</a></Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <button className="text-sm font-semibold leading-6 text-white" onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/shelterlogin" className="text-sm font-semibold leading-6 text-white">Shelter Login <span aria-hidden="true">&rarr;</span></Link>
            )}
          </div>
        </nav>
        <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={petLogo} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={handleMobileMenuToggle}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-1.5 p-1.5">
                <a href="#" className="group flex items-center justify-between p-2.5 text-sm font-semibold leading-6 hover:bg-gray-50">
                  Dogs
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </a>
                {/* More mobile menu items... */}
              </div>
            </div>
            <a href="#" className="block mt-6 text-sm font-semibold leading-6 text-gray-900">Cats</a>
            <a href="#" className="block mt-4 text-sm font-semibold leading-6 text-gray-900">Other Pets</a>
            <a href="#" className="block mt-4 text-sm font-semibold leading-6 text-gray-900">Donate</a>
            <div className="mt-6">
              <Link to="/shelterlogin" className="block text-sm font-semibold leading-6 text-gray-900">Shelter Login <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
