import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config/api.config';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing connection...');
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test root endpoint
        const rootResponse = await fetch(`${BASE_URL}/`);
        if (!rootResponse.ok) throw new Error('Root endpoint failed');
        
        // Test products endpoint (using correct path)
        let productsStatus = 'Not tested';
        try {
          const productsResponse = await fetch(`${BASE_URL}/gold/products/paginated`);
          productsStatus = productsResponse.ok ? '✅ Working' : `❌ Failed (${productsResponse.status})`;
        } catch (e) {
          productsStatus = '❌ Error (check console)';
          console.error('Products endpoint test error:', e);
        }
        
        setStatus('✅ Connected to backend successfully!');
        
        // List available endpoints with status
        setEndpoints([
          { path: '/', method: 'GET', status: '✅ Working' },
          { path: '/gold/products/paginated', method: 'GET', status: productsStatus },
          { path: '/cart', method: 'GET', status: '⚠️ May require auth' },
          { path: '/wishlist', method: 'GET', status: '⚠️ May require auth' },
        ]);
      } catch (error) {
        setStatus(`❌ Connection failed: ${error.message}`);
        console.error('Connection test error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{
      padding: '20px',
      margin: '20px auto',
      maxWidth: '800px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>Backend Connection Status</h2>
      <p>Backend URL: <code>{BASE_URL}</code></p>
      <p>Status: {status}</p>
      
      {endpoints.length > 0 && (
        <div>
          <h3>Tested Endpoints:</h3>
          <ul>
            {endpoints.map((endpoint, index) => (
              <li key={index}>
                <code>{endpoint.method} {endpoint.path}</code>
                {endpoint.status && <span style={{ marginLeft: '10px' }}>{endpoint.status}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;
