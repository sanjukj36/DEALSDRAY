import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import { Container } from 'react-bootstrap';

const Dashboard = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <NavigationBar setLoggedIn={setLoggedIn} />
      <Container>
      <div className='d-flex align-items-center justify-content-center mt-5'>
        <div>
          <h2>Welcome to Admin Panel {username}</h2>
        </div>
      </div>

      </Container>
      
    </>
  );
};

export default Dashboard;
