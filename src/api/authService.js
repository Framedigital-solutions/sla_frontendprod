import apiClient from './axios';

// Firebase imports (commented out as they're not being used currently)
// import {
//   signInWithPopup,
//   signInWithRedirect,
//   getRedirectResult,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// User authentication

export const validateUserJWTToken = async (token) => {
  try {
    console.log('Validating Google token with backend...');
    const res = await apiClient.post('/auth/google-signin', {
      idToken: token,
    });

    console.log('Google auth response:', res);
    
    if (!res.data) {
      throw new Error('No data received from server');
    }

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      console.log('Token stored in localStorage');
    } else {
      console.warn('No token received in response');
    }
    
    if (!res.data.user) {
      console.warn('No user data received in response');
      return null;
    }
    
    return res.data.user;
  } catch (error) {
    console.error('Token validation failed:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      stack: error.stack
    });
    
    // Return null instead of throwing to prevent uncaught promise rejections
    return null;
  }
};

// Email/Password Authentication
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data.user;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const signup = async (userData) => {
  try {
    const res = await apiClient.post('/auth/signup', userData);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    throw error;
  }
};
