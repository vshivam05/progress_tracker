import React from 'react';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element = {<Register/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path = "/tasklist" element = {<ProtectedRoute><TaskList/></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App;