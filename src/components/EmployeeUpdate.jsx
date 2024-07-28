import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './NavigationBar'; // Assuming you have this component
import { useNavigate, useParams } from 'react-router-dom';
import { editEmployeeAPI, getSingleEmployeeDetailsAPI } from '../services/allAPI';
import uploadImg from "../assets/add_img.png"
import { SERVER_URL } from '../services/serverUrl';


function EmployeeUpdate({ setLoggedIn }) {
  const navigation = useNavigate()
  const { id } = useParams();
  const [form, setForm] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_Gender: '',
    f_Course: [],
    f_Image: ''
  });
  const [imgChange, SetImgChange] = useState("")

  const getEmployeeDetails = async () => {
    console.log("Employee Show function");
    try {
      if (!id) {
        console.error("Employee ID is not defined");
        // return navigator("/")
      }

      const result = await getSingleEmployeeDetailsAPI(id);
      console.log(result);

      if (result.status === 200) {
        const employee = result.data.employees;
        setForm(employee)
        console.log("employee:", employee);

      } else {
        console.error("Error fetching employee: ", result.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getEmployeeDetails();
  }, [id]);


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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prevForm) => ({ ...prevForm, f_Image: file })
      );
    }
  };

  useEffect(() => {
    if (form.f_Image.type == "image/png" || form.f_Image.type == "image/jpg") {
      SetImgChange(URL.createObjectURL(form.f_Image))
    } else {
      SetImgChange("")
    }
  }, [form.f_Image])

  const validate = () => {
    let validationErrors = {};
    if (!form.f_Name) validationErrors.f_Name = 'Name is required';
    if (!form.f_Email) validationErrors.f_Email = 'Email is required';
    else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(form.f_Email)) validationErrors.f_Email = 'Invalid Email';
    if (!form.f_Mobile) validationErrors.f_Mobile = 'Mobile number is required';
    else if (!/^[0]?[789]\d{9}$/.test(form.f_Mobile)) validationErrors.f_Mobile = 'Invalid Mobile Number';
    if (!form.f_Designation) validationErrors.f_Designation = 'Designation is required';
    if (!form.f_Gender) validationErrors.f_Gender = 'Gender is required';
    else if (form.f_Course.length === 0) validationErrors.f_Course = 'At least one course must be selected';
    // if(imgChange!==""){
    if (!form.f_Image) validationErrors.f_Image = 'Image is required';
    else if (!['image/jpeg', 'image/png'].includes(form.f_Image.type)) validationErrors.f_Image = 'Only jpg/png files are allowed';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      console.log("#1formData", form.f_Image);
      console.log("#2formData", form);

      const formData = new FormData();
      formData.append("f_Id", form.f_Id);
      formData.append("f_Image", form.f_Image);
      formData.append("f_Name", form.f_Name);
      formData.append("f_Email", form.f_Email);
      formData.append("f_Mobile", form.f_Mobile);
      formData.append("f_Designation", form.f_Designation);
      formData.append("f_Gender", form.f_Gender);
      formData.append("f_Course", form.f_Course);

      console.log("#formData", form)

      try {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
        };
        console.log("hhhhhhhhh", formData);
        const result = await editEmployeeAPI(form, reqHeader);
        console.log(result)
        if (result.status === 200) {
          console.log(`Employee ${result.data.message} successfully updated`);
          alert(result.data.message);
          setForm({
            f_Image: '',
            f_Name: '',
            f_Email: '',
            f_Mobile: '',
            f_Designation: '',
            f_Gender: '',
            f_Course: [],
          });
          setTimeout(() => {
            navigation('/employee');
          }, 1000);

        } else {
          console.log("ss", result.response.data)
          alert(`${result.response.data.message}`);
        }
      } catch (error) {
        console.error('Error creating employee:', error);
        alert('An error occurred while creating the employee');
      }

    }
  };

  return (
    <>
      <NavigationBar setLoggedIn={setLoggedIn} />


      <Container>
        <h2 className="my-4">Employee Edit</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Row>
            <Col md={6}>
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
            </Col>

            <Col md={6}>
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
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formMobile">
                <Form.Label className='mt-3'>Mobile No</Form.Label>
                <Form.Control
                  type="tel"
                  name="f_Mobile"
                  value={form.f_Mobile}
                  onChange={handleChange}
                  isInvalid={!!errors.f_Mobile}
                />
                <Form.Control.Feedback type="invalid">{errors.f_Mobile}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formDesignation">
                <Form.Label className='mt-3'>Designation</Form.Label>
                <Form.Control
                  as="select"
                  name="f_Designation"
                  value={form.f_Designation}
                  onChange={handleChange}
                  isInvalid={!!errors.f_Designation}
                >
                  <option value="">Select</option>
                  {designations.map(designation => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.f_Designation}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Form.Group controlId="formGender">
                <Form.Label className='mt-3'>Gender</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    name="f_Gender"
                    value="Male"
                    checked={form.f_Gender === 'Male'}
                    onChange={handleChange}
                    label="Male"
                  />
                  <Form.Check
                    type="radio"
                    name="f_Gender"
                    value="Female"
                    checked={form.f_Gender === 'Female'}
                    onChange={handleChange}
                    label="Female"
                  />
                </div>
                <Form.Control.Feedback type="invalid">{errors.f_Gender}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCourse">
                <Form.Label className='mt-3'>Course</Form.Label>
                {courses.map(course => (
                  <Form.Check
                    key={course}
                    type="checkbox"
                    name="f_Course"
                    value={course}
                    checked={form.f_Course.includes(course)}
                    onChange={handleChange}
                    label={course}
                  />
                ))}
                <Form.Control.Feedback type="invalid">{errors.f_Course}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={10}>
              <Form.Group controlId="formImage">
                <img
                  width={200}
                  className='img-fluid m-3'
                  src={imgChange ? imgChange : `${SERVER_URL}/uploads/${form.f_Image}`}
                  alt={form.f_Image ? form.f_Image.name : "No image uploaded"}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.f_Image}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Form.Group controlId="formImage">
              <Form.Label>Image Upload</Form.Label>
              <Form.Control
                type="file"
                name="f_Image"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                isInvalid={!!errors.f_Image}
                className='mt-3'
              />
              <Form.Control.Feedback type="invalid">
                {errors.f_Image}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {/* <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              name="f_Gender"
              value="Male"
              checked={form.f_Gender === 'Male'}
              onChange={handleChange}
              label="Male"
            />
            <Form.Check
              type="radio"
              name="f_Gender"
              value="Female"
              checked={form.f_Gender === 'Female'}
              onChange={handleChange}
              label="Female"
            />
          </div>
          <Form.Control.Feedback type="invalid">{errors.f_Gender}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCourse">
          <Form.Label>Course</Form.Label>
          {courses.map(course => (
            <Form.Check
              key={course}
              type="checkbox"
              name="f_Course"
              value={course}
              checked={form.f_Course.includes(course)}
              onChange={handleChange}
              label={course}
            />
          ))}
          <Form.Control.Feedback type="invalid">{errors.f_Course}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image Upload</Form.Label>
          <img
            width={400}
            className='img-fluid m-3'
            src={imgChange ? imgChange : `${SERVER_URL}/uploads/${form.f_Image}`}
            alt={form.f_Image ? form.f_Image.name : "No image uploaded"}
          />

          <Form.Control
            type="file"
            name="f_Image"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            isInvalid={!!errors.f_Image}
            className='mt-3'
          />
          <Form.Control.Feedback type="invalid">
            {errors.f_Image}
          </Form.Control.Feedback>
        </Form.Group> */}

          <Button variant="primary" type="submit" className='mt-3'>
            Submit
          </Button>
        </Form>

      </Container>


    </>
  );
}

export default EmployeeUpdate;
