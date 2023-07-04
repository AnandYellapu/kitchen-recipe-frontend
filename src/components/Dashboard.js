import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [registered, setRegistered] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/dashboard');
      setRegistered(response.data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', textDecoration:'underline'}}>Registered Users:</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {registered.map(user => (
            <tr key={user._id}>
              <td style={{ ...tableDataStyle, textAlign: 'center' }}>{user._id}</td>
              <td style={{ ...tableDataStyle, textAlign: 'center' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  background: '#f2f2f2',
  padding: '8px',
  border: '1px solid #ddd',
};

const tableDataStyle = {
  padding: '8px',
  border: '1px solid #ddd',
};

export default Dashboard;
