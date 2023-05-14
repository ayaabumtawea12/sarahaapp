import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (  
 <div className="container text-center my-5">
  <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
  <div className="buttons d-flex justify-content-center align-items-center  flex-column">
    <Link href="login.html" className="btn btn-default-outline my-4 log-btn" to='/login'><i className="fas fa-user" /> Login</Link>
    <Link href="register.html" className="btn btn-default-outline reg-btn" to='/register'><i className="far fa-edit" /> Register</Link>
  </div>
  </div>

    
  ) 
}

export default Home
