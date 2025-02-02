import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    };
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          className="w-16 mx-auto mb-6"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-4 text-gray-700 text-center">Sign Up</h3>

          <label htmlFor="first-name" className="text-sm font-medium text-gray-600">
            Enter your First Name
          </label>
          <input
            id="first-name"
            required
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-4"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="last-name" className="text-sm font-medium text-gray-600">
            Enter your Last Name
          </label>
          <input
            id="last-name"
            required
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-4"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            What's your Email
          </label>
          <input
            id="email"
            required
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-4"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="text-sm font-medium text-gray-600">
            Enter Password
          </label>
          <input
            id="password"
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-6"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2 w-full text-sm"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>

        <div>
          <p className="mt-8 text-xs">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup