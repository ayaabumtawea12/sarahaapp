import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import finduser from '../utlis/finduser';
import { toast } from 'react-toastify';


let Userprofile = ({users}) => {

let {id} =useParams();
    //console.log(id);
let [inputField,setinputField]=useState('');
const [user,setuser]=useState(finduser(users,id));

let onChange=(event)=>{
let {value}=event.target;
setinputField(value);
};

let submitForm=async (event)=>{
    event.preventDefault();
    let apiURL= `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`;
    let result= await axios.post(apiURL,{message: inputField});
    toast.success('message sent successfully');
};



const shareProfile=(event,url)=>{
  event.preventDefault();
  copy(url);
}

let x='is there something you wanr to say to without him knowing you ? write here';

console.log(user);
  return (
    
<div className="container text-center py-5 my-5 text-center">
  <div className="card py-5 mb-5">
    <a href data-toggle="modal" data-target="#profile">
      <img src='/images/avatar.png' className="avatar" alt='' />
    </a>
    <h3 className="py-2 text-capitalize">{user.userName}</h3>
    <div className="container w-50 m-auto">
      <form action method="post" onSubmit={submitForm}>
        <textarea className="form-control"  cols={10} rows={9} placeholder='is there something you want to say  without him knowing you ? write here' defaultValue={inputField} onChange={onChange} />
        <button className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
      </form> 
    </div>
  </div>
  <button data-toggle="modal" data-target="#share" className="btn btn-default-outline border rounded-pill  share" onClick={(e)=>shareProfile(e, window.location)}><i className="fas fa-share-alt" />  Share Profile</button>
</div>

  );
};

export default Userprofile
