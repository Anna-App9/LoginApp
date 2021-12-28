import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Welcome from './welcome';
import { Navigate } from 'react-router-dom';
export default function App () { 

    return (
      <Router>
          <div>
                 
            
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>} />
                <Route path='/welcome' element={<Welcome/>}/>
                <Route path="/" element={<Navigate replace to="/login" />} />

            </Routes>

      
          </div>
        </Router>
      );
    }
  


