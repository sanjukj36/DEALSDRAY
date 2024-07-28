import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { loginAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
    const [f_userName, setUsername] = useState('');
    const [f_Pwd, setF_Pwd] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await loginAPI({ f_userName, f_Pwd });
            if (response.status === 200) {
                localStorage.setItem('username', response.data.f_userName);
                setLoggedIn(true);
                alert(`${response.data.f_userName} Successfully login`);
                navigate('/');
            } else {
                setError('Invalid login details');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="my-4 text-center">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={f_userName}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={f_Pwd}
                                onChange={(e) => setF_Pwd(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleLogin} className="mt-3">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
