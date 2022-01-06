import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Welcome from './welcome';
import { Navigate } from 'react-router-dom';
import { Details } from './details';
import Profile  from './profile';
import Manage from './manage';
export default function App () { 


    return (

      <Router>
          <div>
                 
            
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>} />
                <Route path='/welcome' element={<Welcome/>}/>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/detail" element={<Details/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/manage" element={<Manage/>}/>
            </Routes>

      
          </div>
        </Router>
      );
    }
  


