import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './index.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { includes } from 'lodash';
import Welcome from './welcome';

var logLocal = JSON.parse(localStorage.getItem('loggedUser')); 


class Register extends React.Component {

  oldData = [];
  oldArr =[];
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      phone:'',
      password:'',
      cpassword:'',
      errMsg : {},
      hidden: true,
      cpHidden :true,
      added : false,
      successMsg : {},
      logActive: false,
      error:{}
      
    }
    this.toggleShow = this.toggleShow.bind(this);
    this.cptoggleShow = this.cptoggleShow.bind(this);
  } 
  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
}
cptoggleShow() {
  this.setState({ cpHidden: !this.state.cpHidden });

}



  formValidation = () => {
    const {name, email, phone, password, cpassword} = this.state;

  let phoneFormat= /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;


      let isValid= true;

      if (password !== cpassword) {
        toast("Passwords don't match, Please try again");
          isValid = false;
          return isValid;
      } 
      if (password.length < 8){
        toast("Password should countain min 8 characters");
        isValid = false;
        return isValid;

      }
      if(name.length<4)
      {
        toast("Name should contain minimum 4 characters");
        isValid = false;
        return isValid;

      }
      if(name.length>30)
      {
        toast("Name should not exceed 30 characters");
        isValid = false;
        return isValid;
      }
      if(!this.validateEmail(email))
      {
        toast("Enter a valid Email");
        isValid=false;
        return isValid;
      }
      if(phone.length>10 || phone.length<9) {
        toast("Enter a valid phone number!")
        isValid = false;
        return isValid;
    }  
      return true;
    }


  onChangeName = (e) =>{
    this.setState({name:e.target.value})
  }

  onChangeEmail = (e) =>{
    this.setState({email:e.target.value})
  }

  onChangePhone = (e) =>{
    this.setState({phone:e.target.value})
  }

  onChangePassword = (e) =>{
    this.setState({password:e.target.value})
  }
  onChangeCpassword = (e) =>{
    this.setState({cpassword:e.target.value})
  }

  onSubmit = (e) =>{
    e.preventDefault();
   if(this.formValidation()){
    let ob = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      cpassword: this.state.cpassword,
      active: false
    }

    let oldData = localStorage.getItem('formData');
    console.log(oldData);
    if(!oldData){
      localStorage.setItem('formData', JSON.stringify([ob]));
    }
    else{
      let dup = true;
      let oldArr = JSON.parse(oldData)
      oldArr.map(arr => {
      if(arr.email == this.state.email)
      { dup = false; 
      }
    })
      if(!dup)
      {
      oldArr.push(ob)
        localStorage.setItem("formData", JSON.stringify(oldArr))
        console.log(oldArr,'Abc')
      }
      else{
        console.log("User Already Exists");
      }
    
    
    }
    
  }
  }
  

  render() {
    return (
      // <div>
      //   {
      //     logActive ?
      //     <Welcome/>
      //     :
          <div>
      <li>
      Do you have an account? 
      <Link to={'/login'} className="nav-link"> Login </Link></li>
      
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <ToastContainer />

          <label>Name</label>
          <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" className="form-control" value={this.state.phone} onChange={this.onChangePhone} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={this.state.hidden ? 'password' : 'text'} className="form-control" value={this.state.password} onChange={this.onChangePassword} required />
          <button type="button" className="btn btn-secondary" onClick={this.toggleShow}>Show / Hide</button>        
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type={this.state.cpHidden ? 'password' : 'text'} className="form-control" value={this.state.cpassword} onChange={this.onChangeCpassword} required />
          {/* <i className="fa fa-eye password-icon"></i> */}
          {/* <i className="bi bi-eye-slash" 
                    id="togglePassword"></i> */}
                     {/* <span className="fa fa-fw fa-eye field-icon toggle-password"></span>
                     <i className="bi bi-eye"></i> */}


        <button type="button" className="btn btn-secondary" onClick={this.cptoggleShow}>Show / Hide</button>

        

        </div>
  
        <button type="submit" className="btn btn-primary btn-block" onClick={this.props.onRegister}>Register</button>
      </form>
      {/* </div>
      } */}
 
      </div>
      
    )
  }
}


export default Register;