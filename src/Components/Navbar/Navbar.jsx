import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import login from '../Assets/login.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [menu, setMenu] = useState("courses"); 

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SQL</p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("courses")}}><Link style={{ textDecoration: 'none'}} to='/'>Courses</Link>{menu==="courses"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("sql editor")}}><Link style={{ textDecoration: 'none'}} to='/sql-editor'>SQL Editor</Link>{menu==="sql editor"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/login'><img src={login} alt="" width="50" height="50" /></Link>
                
            </div>
        </div>
    )
}

export default Navbar 