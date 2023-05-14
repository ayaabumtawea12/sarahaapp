import jwtDecode from 'jwt-decode'
import React from 'react';
import finduser from '../utlis/finduser';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import styles from './Myprofile.module.css';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

const Myprofile = ({user,users}) => {
    let [profileuser, setProfileuser] =useState({})
    let [messages, setMessages] = useState([]);

    let getuser=()=>{ 
    let decode=jwtDecode(user);
    setProfileuser(finduser(users, decode.id))
    }

    let getmessages=async()=>{
    let tokenapi=`tariq__${user}`;
    let {data}=await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages',{ headers: {token: tokenapi} });
   
  //console.log(data);
    //setProfileuser(data)
    if(data.message==='success'){
    setMessages(data.messages);
    }
} ;

let deletemessage=async(id)=>{
  let tokenapi=`tariq__${user}`;
  let {data}= await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{ headers: {token: tokenapi} });
  getmessages(); 
  toast.success('message deleted successfully');
  //console.log(id);
}

//console.log(messages);
let shareprofile=(event,url)=>{
event.preventDefault();
copy(url);
}

useEffect(() => {
 getuser();
 getmessages();
   
}, []);


 return (
 <>  
  <div className="container text-center py-5 my-5 text-center">
    <div className="card pt-5">
      <a href data-toggle="modal" data-target="#profile">
        <img src="/images/me.jpg" className="avatar " alt />
      </a>
      <h3 className="py-2 text-capitalize">{profileuser.userName} Abu Mtawea</h3>
      <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share" onClick={(e)=>shareprofile(e,`http://localhost:3000/userprofile/${profileuser._id}`)}><i className="fas fa-share-alt" />  Share Profile</button>
    </div>
  </div> 
  <div className="container text-center my-5 text-center">
  {messages.length == 0 ? ( 
    <div className="row">
      <div className="col-md-12">
        <div className="card py-5">
          <p>You don't have any messages...</p>
        </div>
      </div>
    </div>
  ) : 

  (
     messages.map((message)=>( 
    <div className="row my-4">
      <div className="col-md-12">
        <div className="card py-5 position-relative">
          <p>{message.text}</p>
          <div className={styles.deletebtn} onClick={()=>deletemessage(message._id)}><i class="fa-solid fa-trash"></i></div>
        </div>
      </div>
    </div>

     ) )
  )
  }
  </div>
  </>
 );
};

export default Myprofile;
