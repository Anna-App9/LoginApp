import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Details } from "./details";
import _ from 'lodash';
import './App.css';
import Section from './section';


export default function Welcome() {
  // const location = useLocation();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [paginatedNews, setpaginatedNews] = useState([]);
  const pageSize = 4;    //articles per page
  const pageCount = news ? Math.ceil(news.length / pageSize) : 0;
  const [newsDetail, setNewsDetail] = useState(null);
  const [curPage, setcurPage] = useState(1);    //stores cur page
  const [favourites, setFavourites] = useState([]);

  //To load news Api
  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_URL}?api-key=${process.env.REACT_APP_API_KEY}`,
    })
      .then(response => {
        console.log(response.data.results);
        setNews(response.data.results);
        setpaginatedNews(_(response.data.results).slice(0).take(pageSize).value());

      })
  },
    []
  )

  var logLocal = JSON.parse(localStorage.getItem('loggedUser'));
  console.log("current",logLocal);


  // let world = _.filter(news, ['section', 'World']);
  // let business = _.filter(news, ['section', 'Business']);
  // let politics = _.filter(news, ['section', 'Politics']);
  // let health = _.filter(news, ['section', 'Health']);
  // let science = _.filter(news, ['section', 'Science']);


  if (pageCount === 1)
    return null;

  const pages = _.range(1, pageCount + 1);

  const pro=()=>{
    navigate("/profile");
    console.log("Welcome to your profile");
  }

  const view = (news) => {
    localStorage.setItem("news", JSON.stringify(news));
    navigate("/detail");
    console.log("hi");
  }
  const clearDetail = () => {
    setNewsDetail(null)
  }

  const pagination = (pageNo) => {
    setcurPage(pageNo);
    const startI = (pageNo - 1) * pageSize;
    const paginated = _(news).slice(startI).take(pageSize).value();
    setpaginatedNews(paginated);

  }
  const logout = () => {
    navigate('/login');
  }



  return (
    <>
    <Section/>

    <div className='content'>
        <div className="container">
          <nav className="navbar navbar-right">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">News Portal  </a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home</a></li>
              </ul>
              <ul className="nav navbar-nav">
                <li className="active"><a href="#" onClick={() => pro()}>Profile</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={() => logout()}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
              </ul>
            </div>
          </nav>

          <div className='container-fluid'>
            <h1>Headlines</h1>
            {
              newsDetail ?

                <Details newsDetail={newsDetail} clearDetail={clearDetail} />
                :
                <div className="row">                  
                  {paginatedNews.map((news, index) => {
                    return (

                      <div className="col-md-5" key={index}>
                        <div className="card m-1">
                          <img src={news.multimedia && news.multimedia.length ? news.multimedia[0].url : ''} alt="" height="250"></img>
                          <div className="card-body">
                            <h5 className="card-title">{news.title}</h5>
                            <p className="card-text">{news.byline}</p>
                            <a href="#" onClick={() => view(news)} className="btn btn-primary">Read More</a>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  )
                  }
                  <nav className='d-flex justify-content-center'>
                    <ul className='pagination'>
                      {
                        pages.map((page) => (
                          <li className={page === curPage ? 'page-item-active' : 'page-item'}>
                            <p className='page-link' onClick={() => pagination(page)}>{page}</p>
                          </li>
                        ))
                      }
                    </ul>
                  </nav>
                </div>
            }
            
          </div>
        </div>
      </div>
    </>
  )
}