import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../utils/hooks/useAuth';
import { useSelector } from 'react-redux';

const Header = () => {

    const { signOut } = useAuth();

    const { session, user } = useSelector((state) => state.auth);

    return (
        <header className="flex justify-between items-center p-4 bg-gray-200 text-black">
            <div className="text-xl font-bold">
                <Link href="/" className="flex items-center">
                    My App
                </Link>
            </div>
            <div>
                {session?.signedIn ?
                    <div  className="flex space-x-5">
                        <p>{`Welcome, ${user?.user?.firstName} ${user?.user?.lastName}`}</p>
                        <Link to="/signin" onClick={signOut} className="text-gray-700 hover:text-black">
                            Logout
                        </Link>
                    </div>
                    :
                    <div>
                        <Link to="/signup" className="mr-4 text-gray-700 hover:text-black">
                            Sign Up
                        </Link>
                        <Link to="/signin" className="text-gray-700 hover:text-black">
                            Sign In
                        </Link>

                    </div>
                }
            </div>
        </header>
    );
};

export default Header;