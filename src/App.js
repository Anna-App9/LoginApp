import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Welcome from './Welcome';


export default function App () { 

    return (
      <Router>
          <div>
            <h2>Welcome to Login App</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
              Do you have an account? 
              <Link to={'/login'} className="nav-link"> Login </Link></li>
              <li>
              New Here?
              
              <Link to={'/register'} className="nav-link">Register</Link></li>
            </ul>
            </nav>
            <hr />
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>} />
                <Route path='/welcome' element={<Welcome/>}/>
            </Routes>
      
          </div>
        </Router>
      );
    }
  


