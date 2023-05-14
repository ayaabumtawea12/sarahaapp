import React from 'react';
import { Link } from 'react-router-dom';
import cookies from 'react-cookies';
import { useNavigate } from 'react-router-dom';


 const Navbar = ({user,setUser}) => {
  let navigate = useNavigate();
  let logout=()=>{
    setUser(null);
    cookies.remove('token');
navigate('/login');
  }
  return (
<div>
 <nav className="navbar navbar-expand-lg bg-custom navbar-dark">
  <div className="container">
    <Link className="navbar-brand" to="/"><img src='/images/logo300.png' width={54}/></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      Menu <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
       

      {user ?  <>
        
        <li className="nav-item">
          <Link className="nav-link" to="/messages">Messages</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/list">All Users</Link>
        </li>
         
        <li className="nav-item">
          <Link className="nav-link ms-5" to="/login" onClick={logout}>Logout</Link>
        </li>
        </> : <>  
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link"  to="/login">Login</Link>
        </li>
        </>
         }
       
     
      </ul>
    </div>
  </div>
</nav>

</div>
  )
}

export default Navbar;
