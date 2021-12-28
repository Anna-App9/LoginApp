import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome =()=> {
  const location = useLocation();

    return (
      <div className="container">

        <h1>Hello, {location&& location.state}</h1>
        {
        console.log(location)
  }
              </div>
    )
  }


export default Welcome;