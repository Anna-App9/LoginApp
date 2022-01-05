import React from 'react';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Details(props){
    useEffect(()=>{
        let storageNews=localStorage.getItem("news");
        setNews(JSON.parse(storageNews));
    },
    []);
    const [news, setNews]=useState("");
    const navigate=useNavigate();

    return(
        <div className="container">
        
            <h3 >{news.title}</h3>
            <p>{news.abstract}</p>
            <button className="btn btn-danger" onClick={()=>navigate("/welcome")}>Close</button>

        </div>

    )
}