import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../paganation/Pagination';
import pagination from '../utlis/pagination';

const UserPage = ({users}) => {

  let [pageInfo, setPageInfo] = useState({
    pageNumber:0,
    pagesize:12,
  });

let changepagenumber=(page)=>{
  setPageInfo({...pageInfo,pageNumber:page});
}

const navigate = useNavigate();  
const [results,setResults]=useState(users)

  const searchuser=(event)=>{
  const {value}=event.target;
    const  arr=[];
    users.map((user) => {
      if(user.userName.toLowerCase().includes(value.toLowerCase())){
        arr.push(user);
    }
  });
  setResults(arr);
};


  return (
  <div className='container my-4'>
  <input type="search" placeholder="SearchUser"  className='form-control mt-5 mb-5'  aria-label='inputField' aria-describedby='basic-addon1' onChange={searchuser}/>

   <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {results.map((user, index)=>( 
<tr key={user._id}>
<th scope="row">{1+index+pageInfo.pageNumber * pageInfo.pagesize}</th>
<td>{user.userName}</td>
<td><button className='py-1 px-3 bg-primary text-light rounded-2 border-0' onClick={()=>navigate(`/userprofile/${user._id}`)}>Sent Message <i class="fa-regular fa-paper-plane"></i>  </button></td>
</tr>

))
}
    
</tbody>
</table>
<Pagination users={results} changepagenumber={changepagenumber} {...pageInfo}/>
</div>
  );
};
export default UserPage;
