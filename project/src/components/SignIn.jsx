import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Clear error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/users');
      const result = await response.json();
      const users = result.data;

      if (Array.isArray(users)) {
        const userExists = users.find(user =>
          user.name === formData.name &&
          user.surname === formData.surname &&
          user.age === Number(formData.age)
        );

        if (userExists) {
          console.log('User signed in:', userExists);
          localStorage.setItem('signedInUser', JSON.stringify(userExists)); // Save user to local storage
          navigate('/allpage'); // Navigate to AllPage after successful sign in
        } else {
          setErrorMessage('User not found'); // Set error message if user not found
        }
      } else {
        console.error('Received data is not an array:', users);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <div className="absolute top-4 right-4">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;