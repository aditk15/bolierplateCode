import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
        }
      } catch (error) {
        console.error('Invalid token');
        logout();
      } finally {
        setInitializing(false);
      }
    } else {
      setInitializing(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
  const decoded = jwtDecode(data.token);
      setUser({ id: decoded.id, email: decoded.email, role: decoded.role });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // You can add error handling here, e.g., show a notification
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = { user, token, login, logout, initializing };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;