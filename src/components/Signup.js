import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
   let navigate= useNavigate()
   

   const handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=credentials
    const response=await fetch("http://localhost:5000/api/auth/createuser",{
        
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name,email,password})
    })
    const json=await response.json()
      //redirect
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        props.showAlert("Account created Successfully","success")
        navigate("/")
      }
      else{
        props.showAlert("Invalid details","danger")
      }
   }

   const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="text" className="form-label">name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={onchange}  id="name" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={onchange}  id="email"  required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onchange} id="password" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" value={credentials.cpassword} onChange={onchange} id="cpassword" required/>
        </div>
        <button type="submit" className="btn btn-primary">sign up</button>
      </form>
    </div>
  )
}

export default Signup
