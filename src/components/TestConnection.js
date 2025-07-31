import React, { useEffect, useState } from 'react';
import apiClient from '../api/axios';

const TestConnection = () => {
  const [message, setMessage] = useState('Testing connection...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await apiClient.get('/');
        setMessage(`Connection successful! Server says: ${response.data.message}`);
      } catch (err) {
        setError(`Error connecting to backend: ${err.message}`);
        console.error('Connection error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers,
        });
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{
      padding: '20px',
      margin: '50px auto',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      maxWidth: '600px',
      textAlign: 'center'
    }}>
      <h2>Backend Connection Test</h2>
      <p>Testing connection to: {process.env.REACT_APP_API_URL || 'http://localhost:8000'}</p>
      
      {message && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#e8f5e9',
          borderRadius: '4px',
          color: '#2e7d32',
          fontWeight: 'bold'
        }}>
          {message}
        </div>
      )}
      
      {error && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          color: '#c62828',
          fontWeight: 'bold'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h4>Troubleshooting Steps:</h4>
        <ol>
          <li>Ensure backend server is running on port 8000</li>
          <li>Check browser's developer console (F12) for CORS errors</li>
          <li>Verify your network connection</li>
          <li>Check if any firewall is blocking the connection</li>
        </ol>
      </div>
    </div>
  );
};

export default TestConnection;
