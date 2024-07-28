// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EmployeeUpdate from './components/EmployeeUpdate';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} /> */}
        {/* <Route path="/dashboard" element={loggedIn ? <Dashboard/> : <Login setLoggedIn={setLoggedIn} />} /> */}
        <Route path="/" element={loggedIn ? <Dashboard setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/employee" element={loggedIn ? <EmployeeList setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} />}/>
        <Route path="/employee-create" element={loggedIn ? <CreateEmployee setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} />}/>
        <Route path="/employee-edit/:id" element={loggedIn ? <EmployeeUpdate setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn} />}/>


      </Routes>
    </Router>
  );
};

export default App;
