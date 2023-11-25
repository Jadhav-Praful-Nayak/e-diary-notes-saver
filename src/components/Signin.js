import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {

   const [credentials,setCredentials]=useState({email:"",password:""})
   let navigate= useNavigate()
   

   const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/auth/login",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const json=await response.json()
    console.log(json)
    if(json.success){
      //redirect
      localStorage.setItem('token',json.authToken)
      props.showAlert("Successful login","success")
      navigate("/")
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
   }

   const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
        <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={onchange}  id="email" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onchange} id="password" required/>
        </div>
        <button type="submit" className="btn btn-primary">
          sign in
        </button>
      </form>
      </div>
    </div>
  );
};

export default Signin;
