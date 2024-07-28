import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { deleteEmployeeAPI, EmployeeListAPI } from '../services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { SERVER_URL } from '../services/serverUrl';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

function EmployeeTable({ setCount }) {
    const [employee, setEmployee] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(null);
    const [loadSearch, setLoadSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const navigation = useNavigate();

    useEffect(() => {
        employeeListShow();
    }, []);

    const employeeListShow = async () => {
        console.log("EmployeeList Show function");
        try {
            const result = await EmployeeListAPI();

            if (result.status === 200) {
                const employees = result.data.employees;
                console.log(result.data.employees.length);
                const count = result.data.employees.length;
                setCount(count);
                setEmployee(employees);
                console.log("employee:", employee);
            } else {
                console.error("Error fetching employees: ", result.statusText);
            }
        } catch (error) {
            console.error("Error checking profile status:", error);
        }
    };

    const handleSearchChange = (keyword) => {
        if (employee) {
            console.log("DDD");
            const filtered = employee.filter(emp =>
                emp.f_Name.toLowerCase().includes(keyword.toLowerCase()) ||
                emp.f_Email.toLowerCase().includes(keyword.toLowerCase()) ||
                emp.f_Mobile.toString().toLowerCase().includes(keyword) ||
                emp.f_Designation.toLowerCase().includes(keyword.toLowerCase()) ||
                emp.f_Gender.toLowerCase().includes(keyword.toLowerCase()) ||
                emp.f_Course.some(course => course.toLowerCase().includes(keyword.toLowerCase())) ||
                emp.f_Createdate.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredEmployees(filtered);
            setLoadSearch(keyword !== "");
            setCount(filtered.length);
        }
    };

    useEffect(() => {
        handleSearchChange(keyword);
    }, [keyword]);

    const handleDeletion = async (id) => {
        try {
            const result = await deleteEmployeeAPI(id);
            if (result.status === 200) {
                employeeListShow();
                alert("Employee Deleted");
            } else {
                alert("Can't delete employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = loadSearch ? filteredEmployees?.slice(indexOfFirstItem, indexOfLastItem) : employee?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil((loadSearch ? filteredEmployees?.length : employee?.length) / itemsPerPage);

    const renderPaginationItems = () =>
        Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
            >
                {index + 1}
            </Pagination.Item>
        ));

    return (
        <div>
            <div className='d-flex justify-content-end m-2'>
                <h3 className='m-2'>Search :</h3>
                <input type="text" placeholder='Enter Search Keyword' onChange={e => setKeyword(e.target.value)} className='form-control w-25' />
            </div>

            <div className='m-2'>
                {employee ? (
                    <>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Unique Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile No</th>
                                    <th>Designation</th>
                                    <th>Gender</th>
                                    <th>Course</th>
                                    <th>Create date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems?.map((emp, index) => (
                                    <tr key={emp._id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td><img width={100} height={100} src={`${SERVER_URL}/uploads/${emp.f_Image}`} alt={`${SERVER_URL}/${emp.f_Image}`} /></td>
                                        <td>{emp.f_Name}</td>
                                        <td>{emp.f_Email}</td>
                                        <td>{emp.f_Mobile}</td>
                                        <td>{emp.f_Designation}</td>
                                        <td>{emp.f_Gender}</td>
                                        <td>{emp.f_Course.join(', ')}</td>
                                        <td>{emp.f_Createdate}</td>
                                        <td>
                                            <Link className='btn btn-success m-2' to={`/employee-edit/${emp._id}`}><i class="fa-solid fa-pen-to-square"></i> Edit</Link>
                                            <button className='btn btn-danger' onClick={() => handleDeletion(emp._id)}><i class="fa-solid fa-trash"></i> Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                       <div className='d-flex align-items-center justify-content-center mt-3'> <Pagination>{renderPaginationItems()}</Pagination></div>
                    </>
                ) : (
                    <div className="justify-content-center">
                        <div><Spinner animation="border" /></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeTable;
