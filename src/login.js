import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Welcome from './welcome';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      phone:'',
      password:'',
      error:''
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

  onSubmit = (e) =>{

    let { history } = this.props;
    e.preventDefault()
    let oldData = localStorage.getItem('formData');
    let oldArr = JSON.parse(oldData);
    oldArr.map(arr => 
      {
        if(this.state.name.length > 4 && this.state.password.length > 7){
          if (arr.name == this.state.name && (arr.password == this.state.password)) {
            let user = this.state.name;
            // console.log(user);
            // console.log(arr.password);
           this.props.history.push('/welcome');
          }else{
            this.setState({error:'Please check your email or password'})
            
          }
        }
      }
      )
  }

  onChangePassword = (e) =>{
    this.setState({password:e.target.value})
  }


  render() {
    
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

      <form onSubmit={this.onSubmit}>

        <p className="error">
          {this.state.error}
        </p>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block" onClick={this.props.onLogin}>Login</button>
      </form>
      </div>
    )
  }
}

export default Login;