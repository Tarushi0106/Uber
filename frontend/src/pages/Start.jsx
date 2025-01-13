import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div
        className="relative w-full h-full flex flex-col justify-between"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <img
            className="w-16"
            src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417"
            alt="Uber Logo"
          />
        </div>

        {/* Content Box */}
        <div className="absolute bottom-0 w-full bg-white py-6 px-6 shadow-lg rounded-t-xl flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started with Uber</h2>
          <Link
            to="/login"
            className="bg-black text-white py-3 px-6 rounded-lg w-full text-center hover:bg-gray-800 transition duration-200"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
