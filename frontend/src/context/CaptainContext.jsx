import React, { createContext, useState } from 'react';

export const CaptainContext = createContext();

const CaptainContextProvider = ({ children }) => {
    const [captain, setCaptain] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    });

    return (
        <CaptainContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainContext.Provider>
    );
};

export default CaptainContextProvider;