import React from 'react';
import axios from 'axios';
import Joi, { object } from 'joi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../CustomInput/CustomInput';
import { toast } from 'react-toastify';

const Register = () => {
let [inputs, setInputs] = useState({
  email:'',
  name:'',
  password:'',
  cPassword:'',
});

let [errors, setErrors] = useState({
  email:'',
  name:'',
  password:'',
  cPassword:'',
});

  let registerSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().max(15).required(),
  password: Joi.string().required(),
  cPassword: Joi.string().required(),
});

let validateInput= (input, inputSchema)=>{
  return inputSchema.validate(input);
};

let onChange = (event)=> {
let { name, value } = event.target;
//console.log(registerSchema.extract(name).validate( value));
let validation = validateInput(value, registerSchema.extract(name));
if(validation.error){
//console.log(validation.error);
console.log(event.target.value)
setErrors({...errors, [name]: validation.error.details[0].message});
console.log(errors);
} else{
  let err = { ...errors };
  delete err[name]; 
  setErrors({ ...err });
  console.log(errors)
}

setInputs({...inputs, [name]: value });
};

let onSubmit= async (event)=>{
event.preventDefault();
if (Object.keys(errors).length ===0){
  const {data} =await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup', inputs ,
  ); 
  toast.success('Registration Successful');
  console.log(data);
} else{
  console.log('test')
}
};


return (
 <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Login</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
     <CustomInput error={errors.email}  text="Enter your email" type="email" name="email" onChange={onChange} />
     <CustomInput  error={errors.name}  text="Enter your name" type="text" name="name" onChange={onChange} />
     <CustomInput   error={errors.password} text="Enter your Password" type="password" name="password" onChange={onChange}  />
     <CustomInput  error={errors.cPassword} text="Enter your cPassword" type="password" name="cPassword" onChange={onChange}  />
     <button className="btn btn-default-outline my-4 w-100 rounded reg-btn" type='submit'>Register</button>
    
     <Link className="btn btn-default-outline log-btn" to="/login">Login</Link>
    </form>
  </div>
</div>
  );
};

export default Register;
