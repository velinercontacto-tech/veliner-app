import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
                <div className="flex items-center space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                        <FaInstagram />
                    </a>
                </div>
                <div className="text-center mt-4 sm:mt-0">
                    <p>&copy; {new Date().getFullYear()} Veliner. All rights reserved.</p>
                    <nav className="mt-2">
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;