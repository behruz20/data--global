import React, { useState } from 'react';

const AllPage = () => {
    const [profileImage, setProfileImage] = useState(
        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png' // Dastlabki tasvir
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Yuklangan faylni olish
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Tasvirni yangilash
            };
            reader.readAsDataURL(file); // Faylni base64 formatida o'qish
        }
    };

    return (
        <>
            <header>
                <div className="navbar bg-gray-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">daisyUI</a>
                    </div>
                    <div className="flex-none gap-2 items-center">
                        <div className="form-control">
                            <input
                                type="file"
                                onChange={handleImageChange} // Fayl yuklanganda ishlaydigan funksiyani chaqirish
                                className="input input-bordered w-24 md:w-auto border-gray-300 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                    <img
                                        alt="User Profile"
                                        src={profileImage} // Yuklangan tasvirni ko'rsatish
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default AllPage;
