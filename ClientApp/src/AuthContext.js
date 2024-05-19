import React, { createContext, useEffect, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

    useEffect(() => {
        // Function to refresh token
        const refreshTokenInterval = setInterval(async () => {
            try {
                const refreshResponse = await fetch('http://localhost:5088/api/Authenticate/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken,
                    },
                    body: JSON.stringify({
                        accessToken: accessToken,
                        refreshToken: refreshToken // Pass both access token and refresh token
                    }),
                });

                if (refreshResponse.ok) {
                    const refreshedData = await refreshResponse.json();
                    localStorage.setItem('token', refreshedData.accessToken); // Update the token in localStorage
                    localStorage.setItem('refreshToken', refreshedData.refreshToken); // Update the refreshToken in localStorage
                    setAccessToken(refreshedData.accessToken); // Update the accessToken state
                    setRefreshToken(refreshedData.refreshToken); // Update the refreshToken state
                    console.log('Refreshed Access Token:', refreshedData.accessToken);
                } else {
                    console.log('Failed to refresh token:', refreshResponse.status);
                }
            } catch (error) {
                console.log('Error refreshing token:', error);
            }
        }, 50000); // Interval set to 5 seconds

        return () => clearInterval(refreshTokenInterval); // Cleanup on unmount
    }, [accessToken, refreshToken]);

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, setAccessToken, setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
