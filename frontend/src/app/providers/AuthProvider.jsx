import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi } from '@/api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Restore session on refresh
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async ({ username, password }) => {
        const data = await loginApi(username, password);

        const normalizedUser = {
            username: data.username ?? username, // fallback
            title: data.title ?? null,
            rating: data.rating ?? null,
        };

        setToken(data.accessToken);
        setUser(normalizedUser);

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
