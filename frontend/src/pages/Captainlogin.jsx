import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { captain, setCaptain } = useContext(CaptainContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-xl font-medium mb-4 text-gray-700 text-center'>Log In</h3>
          <label htmlFor='email' className='text-sm font-medium text-gray-600'>Email</label>
          <input
            id='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-4'
            type='email'
            placeholder='email@example.com'
          />
          <label htmlFor='password' className='text-sm font-medium text-gray-600'>Password</label>
          <input
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-100 rounded-lg px-4 py-2 border w-full text-sm mb-6'
            type='password'
            placeholder='Password'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2 w-full text-sm'
          >
            Log In
          </button>
        </form>
        <p className='text-center text-sm mt-4'>
          New here?{' '}
          <Link to='/captain-signup' className='text-blue-600 hover:underline'>
            Create new Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainLogin;