import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const [password, setPassword] = useState(null);
    var logLocal = JSON.parse(localStorage.getItem('loggedUser'));
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [errorFound, setErrorFound] = useState(null)
    const [successFound, setSuccessFound] = useState(null)
    const [cuser, setCuser]=useState([]);


    useEffect(() => {
        getUser();
    },[]
    )

   
    const getUser=()=>{
        try{
            let list = localStorage.getItem('formData');
            if(list!=null){
                let data = JSON.parse(list);
                let userData = data.filter(item => item.email == logLocal.email);
                console.log("Our user",userData);
                setCuser(userData);
                setName(userData[0]?.name);
                setPhone(userData[0]?.phone);
                setPassword(userData[0]?.password);
            }

        }
        catch(e){
            console.log(e);
        }
    }
    const editUser = (Name, Phone, Password) => {

        setErrorFound(null) 
        setSuccessFound(null) 


        if (!Name) setErrorFound("Name can not be empty")
        else if (!Phone) setErrorFound("Phone can not be empty")
        else if (!Password) setErrorFound("Email can not be empty")
        else {

            try {
              
                let list = localStorage.getItem('formData');
                if (list !== null) {

                    let data = JSON.parse(list) 

                    var objIndex = data.findIndex((x => x.email == logLocal.email));
                    data[objIndex].name = Name;
                    data[objIndex].phone = Phone;
                    data[objIndex].password = Password;

                    localStorage.setItem("formData", JSON.stringify(data)) ;
                    
                    setSuccessFound("User Updated!");
                    
                    if(setSuccessFound){

                    navigate('/login');
                }
                    
                }

            } catch (e) {
                console.log(e) //for handling errors
            }
        }
    }




    return (
        <>           
             {cuser?.map((cuser, index) => {

                 return(
                     <div>
                    <p className='display-6'>Hey , {cuser.name} !</p>
                    <form>
                    
                             
                {errorFound !== null ? <div className="alert alert-danger"> {errorFound} </div> : null}
                {successFound !== null ? <div className="alert alert-success">  {successFound} </div> : null}
               
                   <div  key={index}>
                       <p className='lead'>Do you wish to edit your profile details?</p>
                       <div className="form-group">
                        <input type="text" placeholder="Enter your display name" className="form-control" value={name} onChange={e => {console.log(e.target.value);setName(e.target.value)}} required />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Enter your password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <input placeholder="Enter your mobile number"type="number" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
                    </div>
                    </div>
                    
                
                    <br></br>
                    <div>
                      <button className="btn btn-primary btn-success" onClick={() => editUser(name, phone, password)}> Update User </button>
                    </div>
                </form> 
                <Link to={'/welcome'} className="nav-link">Back</Link>
                </div>
                 )
                })
            }


            


        </>
    )

}