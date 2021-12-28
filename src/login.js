import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

const Login= ()=>{
const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [name, setName] = useState("");
 const [password, setPassword] = useState("");
 const [phone, setPhone] = useState("");
 const [cpassword, setCpassword] = useState("");
 const [hidden, setHidden] = useState(true);
 const [error, setError] = useState("")


  const toggleShow =()=> {
    setHidden(!hidden);
  }


  const onChangeName = (e) =>{
    setName(e.target.value);
  }

 const onChangeEmail = (e) =>{
  setEmail(e.target.value);
  }

  const onChangePhone = (e) =>{
    setPhone(e.target.value);
  }
  const onChangePassword = (e) =>{
    setPassword(e.target.value);
    }

  const onSubmit = (e) =>{
    e.preventDefault()
    let oldData = localStorage.getItem('formData');
    let oldArr = JSON.parse(oldData);
    oldArr.map(arr => 
      {
        if(name.length > 4 && password.length > 7){
          if (arr.name == name && (arr.password == password)) {
            
            // console.log(user);
            // console.log(arr.password);
            // console.log(this.props.history);
            navigate('/welcome', { state: name })
          }else{
            setError('Please check your email or password');
            
          }
       }
      }
      )
  }


    
    return (

      <div>
             <h2>Welcome to Login App</h2>
             <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
            <ul className="navbar-nav mr-auto">

              <li>
              New Here?
              <Link to={'/register'} className="nav-link">Register</Link></li>
            </ul>
            </nav>
             <hr />

      <form onSubmit={onSubmit}>

        <p className="error">
          {error}
        </p>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={onChangeName} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={hidden ? 'password' : 'text'} className="form-control" value={password} onChange={onChangePassword} required />
          <button type="button" className="btn btn-secondary" onClick={toggleShow}>Show / Hide</button>

        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
      </form>
      </div>
    )
  }

export default Login;