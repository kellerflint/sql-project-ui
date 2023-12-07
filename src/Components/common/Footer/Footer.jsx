import React from "react"
import "./Footer.css"

const Footer = () => {
  return (
    <>
     <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>SQLEA</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Courses</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map'></i>
                12401 SE 320th St , Auburn, WA 98092
              </li>
              <li>
                <i className='fa fa-phone-alt'></i>
                +1  253 833 9111
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                greenriver.edu
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2023 All rights reserved | This website is made with <i className='fa fa-heart'></i> by GreenRiverCollege Student
        </p>
      </div>
    </>
  )
}

export default Footer