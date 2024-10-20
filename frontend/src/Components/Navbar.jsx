import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <p>Rentify</p>
      </div>
      <ul className="link">
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
      <div className="loginsignup">
        <Link to='/login'>
        <button>Login</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Navbar;