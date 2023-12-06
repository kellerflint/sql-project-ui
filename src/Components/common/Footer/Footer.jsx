import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
     <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>SQLEA</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>The software is designed to enhance the learning experience for students enrolled in our SQL classes. By utilizing this application, 
              students gain access to a practical platform where they can create, execute, and verify their SQL queries.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>
              <Link to='/about'>About us</Link>
                </li>
              <li>
              <Link to='/courses'>Courses</Link>
                </li>
              <li>
              <Link to='/contact'>Contact us</Link>
                </li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>
              <Link to='/contact'>Contact Us</Link>
                </li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>
              <Link to='/contact'>Feedbacks</Link>
                </li>
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