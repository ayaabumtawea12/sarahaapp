import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
 const Forgetpassword = () => {
      
let [email,setemail]=useState(null);
let navigate=useNavigate();
let onchange=(event)=>{

       let {value}=event.target;
        setemail(value);
   }

   let onsubmit=async(event)=>{
   event.preventDefault();
   if(!email || email.length < 8){

       toast.warning('Please enter  email address');
   }  

   let {data}= await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode/',{email});
   navigate(`/resetcode/${email}`);
   toast.success('Please check your email');   
}
 return (
   <div className="container text-center my-5">
   <div className="user my-3">
     <i className="fas fa-user-secret user-icon" />
     <h4 className="login">Forget Password</h4>
   </div>
   <div className="card p-5 w-50 m-auto">
  
  <form method="POST" action="/handleLogin" onSubmit={onsubmit}>

       <input className="form-control" placeholder="Enter your email" type="email" name="email" value={email}  onChange={onchange} />
        <button className="btn btn-default-outline my-4 w-100 rounded rest-btn">Reset Password</button>
       </form>
   </div>
  </div>
 )
}

 export default Forgetpassword;
 