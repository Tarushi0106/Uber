import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
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
          <h3 className="text-xl font-medium mb-4 text-gray-700 text-center">Log In</h3>
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            What's your email
          </label>
          <input
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-4"
            type="email"
            placeholder="email@example.com"
          />
          <label htmlFor="password" className="text-sm font-medium text-gray-600">
            Enter Password
          </label>
          <input
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-6"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2 w-full text-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          New here?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create new Account
          </Link>
        </p>

        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;