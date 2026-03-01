import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <img className="h-8" src="/path/to/logo.png" alt="Veliner Logo" />
                    </div>
                    <div className="hidden md:block">
                        <nav className="flex space-x-4">
                            <a href="#" className="text-gray-900 hover:text-blue-500">Home</a>
                            <a href="#" className="text-gray-900 hover:text-blue-500">About</a>
                            <a href="#" className="text-gray-900 hover:text-blue-500">Services</a>
                            <a href="#" className="text-gray-900 hover:text-blue-500">Contact</a>
                        </nav>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
                <nav className="flex flex-col space-y-4 p-4">
                    <a href="#" className="text-gray-900 hover:text-blue-500">Home</a>
                    <a href="#" className="text-gray-900 hover:text-blue-500">About</a>
                    <a href="#" className="text-gray-900 hover:text-blue-500">Services</a>
                    <a href="#" className="text-gray-900 hover:text-blue-500">Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;