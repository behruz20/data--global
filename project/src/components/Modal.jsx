import React, { useState } from 'react';

const Modal = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="btn bg-blue-500 text-white mt-4 hover:bg-blue-600 transition duration-300"
                onClick={() => setShowModal(true)}
            >
                View Profile
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                        {user ? ( // Check if user exists before rendering details
                            <>
                                <p className="text-lg">Name: {user.name}</p>
                                <p className="text-lg">Surname: {user.surname}</p>
                                <p className="text-lg">Age: {user.age}</p>
                            </>
                        ) : (
                            <p className="text-lg">No user information available.</p>
                        )}
                        <button
                            className="btn bg-red-500 text-white mt-4 hover:bg-red-600 transition duration-300"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
