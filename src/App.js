import logo from './logo.svg';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Login from './components/login/Login';
import Loader from './components/loader/Loader';
import CustomInput from './components/CustomInput/CustomInput';
import { Route,Routes } from 'react-router-dom';
import Pagenotfound from './components/pagenotfound/Pagenotfound';
import UserPage from './components/userpagee/UserPage';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import cookies from 'react-cookies';
import Userprofile from './components/userprofile/Userprofile';
import Myprofile from './components/myprofile/Myprofile';
import { ToastContainer } from 'react-toastify';
import Resetpassword from './components/resetpassword/Resetpassword';
import Forgetpassword from './components/forgetpassword/Forgetpassword';
import './App.css';
 
 

function App() {
let [user, setUser] = useState(cookies.load('token'));
let [users,setuser]=useState([])
let [loading,setloading]=useState(true)

let getuser=async ()=>{
  
let {data}=await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers')
//console.log(data);
 
//setTimeout(() => {
  setloading(false);
  setuser(data)
//}, 3000);
//
}

 
useEffect(() => {
getuser();
}, []);

useEffect(() => {
  console.log(user);
  }, [user]);


return (

    <div className="App">

       <Navbar user={user} setUser={setUser}/>

       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
         />

      { loading ? <Loader/> :  
       <Routes>
       {user ? (   <>     
         <Route path="/messages" element={<Myprofile user={user} users={users}/>}></Route> 
         <Route path="/list" element={<UserPage users={users}/>}></Route>
         </>) : ( <>   
       <Route path="/" element={<Home/>}></Route>
       <Route path="/login" element={<Login loguser={setUser}/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
       <Route path="/forgetpassword" element={<Forgetpassword/>}></Route>
       <Route path="/resetcode/:email" element={<Resetpassword/>}></Route>
       </> 
       )}
       <Route path="*" element={<Pagenotfound/>}></Route>
       <Route path="/userprofile/:id" element={<Userprofile users={users}/>}></Route>
      
       </Routes>

      }
    </div>
  );
}

export default App;

