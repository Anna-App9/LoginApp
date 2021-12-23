import { Alert } from 'bootstrap';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Register extends React.Component {
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




  
  formValidation = () => {
   let mailFormat = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;
   let phoneFormat = /^(\+\d{1,3}[- ]?)?\d{10}$/;

      const {name, email, phone, password, cpassword} = this.state;
      let isValid= true;
      if (password !== cpassword) {
        alert("Passwords don't match, Please try again");
          isValid = false;
      } 
      if (password.length < 8){
        alert("Password should countain min 8 characters");
        isValid = false;

      }
      if(name.length<4)
      {
        alert("Name should contain minimum 4 characters");
        isValid = false;

      }
      if(name.length>30)
      {
        alert("Name should not exceed 30 characters");
        isValid = false;
      }
      if (!mailFormat.test(email)){
        alert("Enter a valid Mail-ID")
        isValid=false;
      }else{
      }
      if(!phoneFormat.test(phone)){
        alert("Please enter a valid phone number")
       isValid = false;
      }
      


      
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
  onChangeCPassword = (e) =>{
    this.setState({cpassword:e.target.value})
  }

  onSubmit = (e) =>{
    const isValid=this.formValidation();
    if(isValid)
    {
    let ob = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      cpassword: this.state.cpassword,
    }
    let olddata = localStorage.getItem('formData');
    if(olddata==null){
      olddata = []
      olddata.push(ob)
      localStorage.setItem('formData', JSON.stringify(olddata));
    }else{
      let oldArr = JSON.parse(olddata)
      oldArr.push(ob)
      localStorage.setItem("formData", JSON.stringify(oldArr))
      console.log(oldArr,'Abc')
    }
  }
  }

  render() {
    return (
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
          <input type="password" className="form-control" value={this.state.cpassword} onChange={this.onChangeCPassword} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.props.onRegister}>Register</button>
      </form>
    )
  }
}

export default Register;