import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'; // Modal for user profile
import { FaComment, FaHeart, FaEllipsisV } from 'react-icons/fa';

const AllPage = () => {
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(() => {
        const user = JSON.parse(localStorage.getItem('signedInUser'));
        return localStorage.getItem(`profileImage_${user?.name}`) || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png';
    });
    const [selectedUser, setSelectedUser] = useState(JSON.parse(localStorage.getItem('signedInUser')));
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
    const [showMyComments, setShowMyComments] = useState(true); // State to toggle comments view

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                const user = JSON.parse(localStorage.getItem('signedInUser'));
                localStorage.setItem(`profileImage_${user?.name}`, reader.result); // Save image with user-specific key
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('signedInUser');
        navigate('/signin');
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const commentText = e.target.elements.comment.value;
        if (commentText && selectedUser) {
            const newComment = {
                text: commentText,
                user: selectedUser.name,
                likes: 0,
                likedUsers: [], // Store users who have liked the comment
                userProfileImage: profileImage // Add user's profile image to the comment
            };
            setComments([...comments, newComment]);
            e.target.reset();
        }
    };

    const handleLikeClick = (index) => {
        const updatedComments = comments.map((comment, i) => {
            if (i === index) {
                const hasUserLiked = comment.likedUsers.includes(selectedUser?.name);
                return {
                    ...comment,
                    likes: hasUserLiked ? comment.likes - 1 : comment.likes + 1,
                    likedUsers: hasUserLiked
                        ? comment.likedUsers.filter(user => user !== selectedUser?.name)
                        : [...comment.likedUsers, selectedUser?.name]
                };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const handleThreeDotsClick = (index) => {
        setSelectedCommentIndex(index);
        setShowOptionsModal(true);
    };

    const handleDeleteComment = () => {
        const updatedComments = comments.filter((_, index) => index !== selectedCommentIndex);
        setComments(updatedComments);
        setShowOptionsModal(false);
    };

    const handleCopyComment = () => {
        const selectedComment = comments[selectedCommentIndex]?.text; // Optional chaining for safety
        if (selectedComment) {
            navigator.clipboard.writeText(selectedComment);
        }
        setShowOptionsModal(false);
    };

    // Function to toggle between "MY Comments" and "All Comments"
    const handleViewToggle = () => {
        setShowMyComments(!showMyComments);
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
                            <Modal user={selectedUser} />
                        </div>
                    </div>
                </div>
            </div>

            <main className="pt-5 flex">
                <aside className="w-1/4 bg-gray-200 p-4 h-[460px] rounded-2xl m-5">
                    <h2 className="font-bold text-lg mb-4">Sidebar</h2>
                    <ul>
                        <li className="mb-2">
                            <button onClick={handleViewToggle} className="text-blue-600">
                                {showMyComments ? "All Comments" : "MY Comments"}
                            </button>
                        </li>
                    </ul>
                    <div className="flex items-center mb-4">
                        <FaComment className="mr-2" />
                        <form onSubmit={handleCommentSubmit} className="flex">
                            <input type="text" name="comment" placeholder="Add a comment..." className="input input-bordered flex-1" required />
                            <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 ml-2">Submit</button>
                        </form>
                    </div>
                </aside>

                <aside className='bg-gray-200 p-4 w-[69%] h-[460px] rounded-2xl m-5 overflow-y-auto'>
                    <h2 className="font-bold text-lg mb-4">Comments</h2>
                    <div className='bg-slate-100 w-[300px] rounded-lg flex flex-col justify-center'>
                        <div className='w-[300px] flex justify-center my-[10px]'>
                            <img className='w-[280px] rounded-xl' src="https://avatars.mds.yandex.net/get-vertis-journal/3934100/2020-09-24-fea4c16248e24ca2b1614f6f48670cc1.jpg_1622736695542/orig" alt="no img" />
                        </div>
                        <ul className='ml-[10px]'>
                            {(showMyComments 
                                ? comments.filter(comment => comment.user === selectedUser?.name) // Show only user's comments
                                : comments // Show all comments if showMyComments is false
                            ).map((comment, index) => (
                                <li key={index} className="border-b py-2 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <span>{comment.text}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleLikeClick(index)} className={`transition duration-200 ${comment.likedUsers.includes(selectedUser?.name) ? 'text-red-500' : ''}`}>
                                            <FaHeart className={`mr-1 ${comment.likedUsers.includes(selectedUser?.name) ? 'text-red-500' : 'text-gray-500'}`} />
                                            {comment.likes}
                                        </button>
                                        <button onClick={() => handleThreeDotsClick(index)}>
                                            <FaEllipsisV className="ml-2" />
                                        </button>
                                    </div>
                                </li>
                            ))} 
                        </ul>
                    </div>
                </aside>
            </main>

            {showOptionsModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold">Options</h2>
                        <button onClick={handleCopyComment} className="btn bg-blue-500 text-white hover:bg-blue-600 mr-2">Copy</button>
                        <button onClick={handleDeleteComment} className="btn bg-red-500 text-white hover:bg-red-600">Delete</button>
                        <button onClick={() => setShowOptionsModal(false)} className="btn">Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllPage;
