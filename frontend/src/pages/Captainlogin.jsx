import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const Captainlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
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
            className="bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
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
          <Link to="/Captain-signup" className="text-blue-600 hover:underline">
            Create new Account
          </Link>
        </p>

        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  );
};

export default Captainlogin;

