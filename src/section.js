import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Section() {


  const [sectNews, setSectnews] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SECTION_URL}?api-key=${process.env.REACT_APP_API_KEY}`,
    })
      .then(response => {
        console.log(response.data.results);
        setSectnews(response.data.results);
      })
  },
    []
  )

  return (
    <div className='sidebar'>
      {
        sectNews.map((sectNews, index) => {
          return (
              <div key={index}>
              <ul>{sectNews.display_name}</ul>
              </div>
          )
        }



        )
      }
        </div>
      
      )
      
      
}





