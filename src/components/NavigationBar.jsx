import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path according to your project structure

function NavigationBar({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        setLoggedIn(false);
        navigate('/');
    };

    const handleEmployeeList = () => {
        navigate('/employee');
    };

    return (
        <Navbar className='bg-primary disabled'  expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} width="60" height="50"className="d-inline-block align-top" alt="Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto h4">
                        <Nav.Link as={Link} to="/" className='text-light'><i className="fa-solid fa-house"></i> Home</Nav.Link>
                        <Nav.Link onClick={handleEmployeeList} className='text-light mx-3'><i class="fa-solid fa-address-book"></i> Employee List</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Item className="me-2 h4">
                            <Navbar.Text className='m-3'>
                              <span className='text-light'><i class="fa-solid fa-user"></i> {username}</span>
                            </Navbar.Text>
                        </Nav.Item>
                        <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
