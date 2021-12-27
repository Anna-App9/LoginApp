import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


class Register extends React.Component {

  oldData = [];
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      phone:'',
      password:'',
      cpassword:'',
      errors : {},
      errMsg : {},
    }
  }  
  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  formValidation = () => {
    const {name, email, phone, password, cpassword} = this.state;

   let mailFormat = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;
   let phoneFormat = /^(\+\d{1,3}[- ]?)?\d{10}$/;
   console.log(!mailFormat.test(email));

      let isValid= true;
      if (password !== cpassword) {
        alert("Passwords don't match, Please try again");
          isValid = false;
          return isValid;
      } 
      if (password.length < 8){
        alert("Password should countain min 8 characters");
        isValid = false;
        return isValid;

      }
      if(name.length<4)
      {
        alert("Name should contain minimum 4 characters");
        isValid = false;
        return isValid;

      }
      if(name.length>30)
      {
        alert("Name should not exceed 30 characters");
        isValid = false;
        return isValid;
      }
      if(!this.validateEmail(email))
      {
        alert("Enter a valid Email");
        isValid=false;
        return isValid;
      }
    


      return true;
    }
   
      // if(!phoneFormat.test(this.state.phone)){
      //   alert("Please enter a valid phone number")
      //  isValid = false;
      //  return;
      // }      
  


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
    }
    // if(this.email in localStorage)
    // {
    //   errMsg("Username already exists");
    // }

    let oldData = localStorage.getItem('formData');
    console.log(oldData);
    if(!oldData){
      localStorage.setItem('formData', JSON.stringify([ob]));
    }else{
      let oldArr = JSON.parse(oldData)
      oldArr.push(ob)
      localStorage.setItem("formData", JSON.stringify(oldArr))
      console.log(oldArr,'Abc')
    }
    
  }
  }
  

  render() {
    return (
      <div>
      <li>
      Do you have an account? 
      <Link to={'/login'} className="nav-link"> Login </Link></li>
      
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
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
          <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" value={this.state.cpassword} onChange={this.onChangeCpassword} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.props.onRegister}>Register</button>
      </form>
      </div>
    )
  }
}

export default Register;