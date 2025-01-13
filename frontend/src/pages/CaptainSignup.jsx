import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [useData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName:{
        firstName,
        lastName,
      },
     
      email,
      password,
    });


    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
   
    console.log('User Data:', useData);
  }, [useData]);

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
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/Captain-login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>

        <p className="mt-8 text-xs">
          By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
