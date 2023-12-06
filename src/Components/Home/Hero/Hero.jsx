import React from 'react'
import Heading from "../../common/heading/Heading"
import "./Hero.css"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO SQLEA' title='Best Online Education Expertise' />
            <p>The software is designed to enhance the learning experience for students enrolled in our SQL classes. 
              By utilizing this application, students gain access to a practical platform where they can create, execute, and verify their SQL queries. 
              The incorporation of instant feedback, coupled with AI-driven personalized tutoring, creates an engaging and dynamic learning environment. 
              This approach aims to facilitate improved understanding and long-term retention of SQL concepts among students.</p>
            <div className='button'>
              <button className='primary-btn'>
              <Link to='/login'></Link>GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
              <Link to='/courses'></Link>VIEW COURSES <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero