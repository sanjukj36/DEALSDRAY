import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';

function EmployeeList({ setLoggedIn }) {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    const createEmployee = () => {
        navigate('/employee-create');
    };

    return (
        <>
            <NavigationBar setLoggedIn={setLoggedIn} />
            <Container>
                <Row className="align-items-center my-4">
                    <Col>
                        <h1>Employee List</h1>
                    </Col>
                    <Col className="text-center">
                        <p className='w-2'>Total Count: {count}</p>
                    </Col>
                    <Col className="text-end">
                        <Button onClick={createEmployee}>Create Employee</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <EmployeeTable setCount={setCount} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EmployeeList;
