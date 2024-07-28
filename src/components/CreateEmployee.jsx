import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import { createEmployeeAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function CreateEmployee({ setLoggedIn }) {
    const [form, setForm] = useState({
        f_Image: '',
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_Gender: '',
        f_Course: [],
        f_Createdate: new Date().toISOString().split('T')[0],
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const designations = ['HR', 'Manager', 'Sales'];
    const courses = ['MCA', 'BCA', 'BSC'];

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            const updatedCourses = checked ? [...form.f_Course, value] : form.f_Course.filter(course => course !== value);
            setForm({ ...form, f_Course: updatedCourses });
        } else if (type === 'file') {
            setForm({ ...form, f_Image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const validate = () => {
        let validationErrors = {};
        if (!form.f_Name) validationErrors.f_Name = 'Name is required';
        if (!form.f_Email) validationErrors.f_Email = 'Email is required';
        else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(form.f_Email)) validationErrors.f_Email = 'Invalid Email';
        if (!form.f_Mobile) validationErrors.f_Mobile = 'Mobile number is required';
        else if (!/^[0]?[789]\d{9}$/.test(form.f_Mobile)) validationErrors.f_Mobile = 'Invalid Mobile Number';
        if (!form.f_Designation) validationErrors.f_Designation = 'Designation is required';
        if (!form.f_Gender) validationErrors.f_Gender = 'Gender is required';
        if (form.f_Course.length === 0) validationErrors.f_Course = 'At least one course must be selected';
        if (!form.f_Image) validationErrors.f_Image = 'Image is required';
        else if (!['image/jpeg', 'image/png'].includes(form.f_Image.type)) validationErrors.f_Image = 'Only jpg/png files are allowed';

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("f_Image", form.f_Image);
            formData.append("f_Name", form.f_Name);
            formData.append("f_Email", form.f_Email);
            formData.append("f_Mobile", form.f_Mobile);
            formData.append("f_Designation", form.f_Designation);
            formData.append("f_Gender", form.f_Gender);
            formData.append("f_Course", form.f_Course);
            formData.append("f_Createdate", form.f_Createdate);

            try {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                };
                const response = await createEmployeeAPI(formData, reqHeader);
                if (response.status === 200) {
                    alert(`Employee ${response.data.data.f_Name} successfully created`);
                    setForm({
                        f_Image: '',
                        f_Name: '',
                        f_Email: '',
                        f_Mobile: '',
                        f_Designation: '',
                        f_Gender: '',
                        f_Course: [],
                        f_Createdate: new Date().toISOString().split('T')[0],
                    });
                    setTimeout(() => {
                        navigate('/employee');
                    }, 1000);
                } else {
                    alert(`${response.response.data.message}`);
                }
            } catch (error) {
                console.error('Error creating employee:', error);
                alert('An error occurred while creating the employee');
            }
        }
    };

    return (
        <div>
            <NavigationBar setLoggedIn={setLoggedIn} />
            <Container>
                <h2 className="mt-4">Create Employee</h2>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="f_Name" 
                            value={form.f_Name} 
                            onChange={handleChange} 
                            isInvalid={!!errors.f_Name} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.f_Name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="f_Email" 
                            value={form.f_Email} 
                            onChange={handleChange} 
                            isInvalid={!!errors.f_Email} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.f_Email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formMobile">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control 
                            type="tel" 
                            name="f_Mobile" 
                            value={form.f_Mobile} 
                            onChange={handleChange} 
                            isInvalid={!!errors.f_Mobile} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.f_Mobile}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDesignation">
                        <Form.Label>Designation</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="f_Designation" 
                            value={form.f_Designation} 
                            onChange={handleChange} 
                            isInvalid={!!errors.f_Designation} 
                        >
                            <option value="">Select</option>
                            {designations.map((designation) => (
                                <option key={designation} value={designation}>{designation}</option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{errors.f_Designation}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <div>
                            <Form.Check 
                                inline 
                                type="radio" 
                                name="f_Gender" 
                                value="Male" 
                                checked={form.f_Gender === 'Male'} 
                                onChange={handleChange} 
                                label="Male" 
                                isInvalid={!!errors.f_Gender} 
                            />
                            <Form.Check 
                                inline 
                                type="radio" 
                                name="f_Gender" 
                                value="Female" 
                                checked={form.f_Gender === 'Female'} 
                                onChange={handleChange} 
                                label="Female" 
                                isInvalid={!!errors.f_Gender} 
                            />
                            <Form.Control.Feedback type="invalid">{errors.f_Gender}</Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formCourse">
                        <Form.Label>Course</Form.Label>
                        {courses.map((course) => (
                            <Form.Check 
                                key={course} 
                                type="checkbox" 
                                name="f_Course" 
                                value={course} 
                                checked={form.f_Course.includes(course)} 
                                onChange={handleChange} 
                                label={course} 
                                isInvalid={!!errors.f_Course} 
                            />
                        ))}
                        <Form.Control.Feedback type="invalid">{errors.f_Course}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image Upload</Form.Label>
                        <Form.Control 
                            type="file" 
                            name="f_Image" 
                            accept="image/jpeg, image/png" 
                            onChange={handleChange} 
                            isInvalid={!!errors.f_Image} 
                        />
                        <Form.Control.Feedback type="invalid">{errors.f_Image}</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </Form>
            </Container>
        </div>
    );
}

export default CreateEmployee;
