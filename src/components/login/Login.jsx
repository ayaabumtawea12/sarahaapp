import React from 'react';
import { useState } from 'react';
import Joi from 'joi';
import { useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link, useNavigate } from 'react-router-dom';
 
  


const Login = ({loguser}) => {

const navigate = useNavigate();  

let [user,setuser]=useState({
    email:"",
    password:"",
});


let [errors,setErrors]=useState([]);

let getUserdata=(e)=>{
    setuser({...user,[e.target.name]:e.target.value});
}

let validateUser=(user)=>{
    //.email({minDomainSegments: 2,tlds:{allow:['com','net']}})
    //.pattern(/^[A-Z][a-z]{3,8}$/)
    let schema=Joi.object({
        email:Joi.string().required() ,
        password:Joi.string()  ,
    })
    return schema.validate(user,{abortEarly:false})
}


let onsubmit=async(e)=>{
e.preventDefault();
const validation =validateUser(user);
let errorlist=[];
//console.log(validateUser());
if(validation.error){
validation.error.details.map((err)=>{
//setErrors(err.message)
errorlist.push(err.message);
 
});
setErrors(errorlist);
 
}

else{
    setErrors([]);
let {data}=await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin',user);
//console.log(data);
if(data.message === "success"){
console.log(data.token);
console.log(data.message)
cookie.save('token',data.token);

let expires=new Date();
let futuredate=expires.getDate()+1;
expires.setDate(futuredate);
//console.log(expires);
loguser(data.token)
navigate('/list');
} else {
  console.log(data.message);
  let messages=data.message;
  setErrors([]);
    //data.err.map((err)=>{
    //  console.log(err);
        errorlist.push(messages);
        setErrors(errorlist);
        //console.log(errors);
   // });
}
}
};


  return (
  
<div className="container text-center my-5">
 <div className="user my-3">
   <i className="fas fa-user-secret user-icon" />
   <h4 className="login">Login</h4>
 </div>
 <div className="card p-5 w-50 m-auto">

<form method="POST" action="/handleLogin" onSubmit={onsubmit}>

  {errors.map((err,index)=>(
  <div className="alert alert-danger" role="alert" key={index}>
  {err}
 </div>
  ))
}

 
     <input className="form-control" placeholder="Enter your email" type="email" name="email" onChange={getUserdata} />
     <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" onChange={getUserdata}  />
     <button className="btn btn-default-outline my-4 w-100 rounded log-btn">Login</button>
     <p><Link className="text-muted forgot btn" to='/forgetpassword'>I Forgot My Password</Link></p>
     <Link className="btn btn-default-outline reg-btn" to="/register">Register</Link>
   </form>
 </div>
</div>
  )

}
export default Login;
