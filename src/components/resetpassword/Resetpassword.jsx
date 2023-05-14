import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Resetpassword = () => {

let navigate = useNavigate();

let [input, setInput] = useState({
   //email:'',
   code:'',
   newPassword:'',
 })

 let {email} =useParams();
 console.log(email);

let onChange=(e)=>{
let {name,value}=e.target;
setInput({...input,[name]:value});
}

let onsubmit=async(e)=>{
  e.preventDefault();
  let {data}=await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword',{...input,email});
  if (data.message === 'success') {
    toast.success('changed password successfully');
    navigate('/login');

  } else if (data.message === 'fail') {
    toast.error('failed to change password');

  }
}

  return  (
    <div className="container text-center my-5">
    <div className="user my-3">
      <i className="fas fa-user-secret user-icon" />
      <h4 className="login">Forget Password</h4>
    </div>
    <div className="card p-5 w-50 m-auto">
   
   <form method="POST" action="/handleLogin" onSubmit={onsubmit}>
 
        <input className="form-control  my-3" placeholder="Enter your code" type="text" name="code" value={input.code}  onChange={onChange} />
        <input className="form-control my-3" placeholder="Enter your newpassword" type="text" name="newPassword" value={input.newPassword}  onChange={onChange} />
         <button className="btn btn-default-outline my-4 w-100 rounded rest-btn">Reset Password</button>
        </form>
    </div>
   </div>
  )
}

export default Resetpassword
