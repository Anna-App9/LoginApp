import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {BsEye, BsFillEyeSlashFill} from 'react-icons/bs';
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState("");



  const [empty, setEmpty] = useState(true);

  const toggleShow = () => {
    setHidden(!hidden);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let oldData = localStorage.getItem("formData");
    let oldArr = JSON.parse(oldData);
      oldArr.map((arr) => {
        if (email.length > 7) {
          if (arr.email == email && arr.password == password) {
            navigate("/welcome", { state: email });
            let logLocal = {
              email: email,
              password: password,
              active: true,
            };
            console.log(logLocal);
            logLocal = localStorage.setItem(
              "loggedUser",
              JSON.stringify(logLocal)
            );
          } else {
            setError("Please check your email or password");
          }
        }
      });
    
  };

  return (
    <div>
      <div>
        <h2>Welcome to Login App</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              New Here?
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </nav>
        <hr />

        <form onSubmit={onSubmit}>
          <p className="error" style={{ color: "red" }}>
            {error}
          </p>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={hidden ? "password" : "text"}
              className="form-control"
              value={password}
              onChange={onChangePassword}
              required
            />
            <button type="button" onClick={toggleShow}>
            {!hidden? <BsEye/> : <BsFillEyeSlashFill/>}
            </button>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
