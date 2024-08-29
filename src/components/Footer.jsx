import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { IoMdHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="flex justify-between items-center p-4 bg-gray-200 text-black">
            <div className="text-xs">
                Cookie Policy - Legal Notice
            </div>
            <div className="text-xs flex items-center">
                Copyright &copy; {new Date().getFullYear()}. Made with{' '}
                <span className="ml-1 text-black">
                    <IoMdHeart />
                </span>
            </div>
            <div className="text-xs flex items-center">
                <Link href="https://facebook.com" className="mr-4 text-gray-500 hover:text-black">
                    <FaFacebookF />
                </Link>
                <Link href="https://twitter.com" className="mr-4 text-gray-500 hover:text-black">
                    <FaTwitter />
                </Link>
                <Link href="https://instagram.com" className="text-gray-500 hover:text-black">
                    <FaInstagram />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;