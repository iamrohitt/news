import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const UserInformation = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    // Fetch user information from MongoDB
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user', config); // Replace with your API endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInformation();
  }, []);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className='container'>
      <h2></h2>
      <p>Hello, {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Display other user information fields as needed */}
    </div>
  );
};

export default UserInformation;
