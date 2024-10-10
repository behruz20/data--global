import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const AllPage = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png');
    const [selectedUser, setSelectedUser] = useState(JSON.parse(localStorage.getItem('signedInUser'))); // Get signed-in user

    // Handle profile image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Update image
                localStorage.setItem('profileImage', reader.result); // Save image to local storage
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle sign out
    const handleSignOut = () => {
        localStorage.removeItem('signedInUser'); // Remove signed-in user
        navigate('/signin'); // Navigate to SignIn
    };

    return (
        <>
            <header>
                <div className="navbar bg-gray-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">DataGlobal</a>
                    </div>
                    <div className="flex-none gap-2 items-center">
                        <div className="form-control">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="input input-bordered w-24 md:w-auto border-gray-300 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={profileImage} alt="Profile" />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleSignOut}
                            className="btn bg-red-600 text-white hover:bg-red-700 transition duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex">
                <div className="flex-1">
                    <div className="flex justify-center">
                        <div className="text-center p-6 rounded-xl mt-5 bg-slate-50">
                            <h2 className='font-bold'>Information Profile</h2>

                            {/* Modal trigger */}
                            <Modal user={selectedUser} />
                        </div>
                    </div>
                </div>
            </div>
            <main className="pt-5">
                {/* Sidebar */}
                <aside className="w-1/4 bg-gray-200 p-4 h-[497.5px]">
                    <h2 className="font-bold text-lg mb-4">Sidebar</h2>
                    <ul>
                        <li className="mb-2">
                            <a href="#profile" className="text-blue-600">Profile</a>
                        </li>
                        <li className="mb-2">
                            <a href="#settings" className="text-blue-600">Settings</a>
                        </li>
                        <li className="mb-2">
                            <a href="#help" className="text-blue-600">Help</a>
                        </li>
                    </ul>
                </aside>
            </main>
        </>
    );
};

export default AllPage;
