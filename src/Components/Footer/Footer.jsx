import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/footer_logo.png'
import Facebook_icon from '../Assets/Facebook_icon.png'
import GRC_logo from '../Assets/GRC_logo.png'

const Footer = () => {
    return (
        <div className='footer' >
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>STUDENT</p>
        </div>
        <ul className="footer-links">
            <li>School</li>
            <li>Courses</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={Facebook_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={GRC_logo} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2023 - All Right Reserved</p>
        </div>
        </div>
        
    )
}

export default Footer