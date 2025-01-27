import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL, {
    reconnectionAttempts: 5, // Number of reconnection attempts before giving up
    reconnectionDelay: 1000, // Delay between reconnection attempts
});

export const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            setIsConnected(false);
            if (reason === 'io server disconnect') {
                // The disconnection was initiated by the server, you need to manually reconnect
                socket.connect();
            }
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    const sendMessage = (event, data) => {
        if (isConnected) {
            socket.emit(event, data);
        } else {
            console.error('Socket is not connected');
        }
    };

    return (
        <SocketContext.Provider value={{ socket, sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;