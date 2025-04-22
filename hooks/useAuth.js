// hooks/useAuth.js
import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(email, password);
      setUser(data.user); // Suponiendo que data.user es la respuesta esperada
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const data = await registerUser(email, password);
      setUser(data.user);
    } catch (err) {
      setError('Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };
};
