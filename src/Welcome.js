import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Welcome =()=> {
  const location = useLocation();
  const navigate = useNavigate();

  const logout=()=>{
    navigate('/login');
  }

    return (
      <div className="container">
        <button onClick={logout}>Logout</button>

        <h1>Hello, {location&& location.state}</h1>

        {
        console.log(location)
  }
              </div>
    )
  }


export default Welcome;