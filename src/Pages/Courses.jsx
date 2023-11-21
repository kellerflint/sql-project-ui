import React from 'react'
import './CSS/Courses.css'
import sql from '../Components/Assets/sql.png'
import arrow_icon from '../Components/Assets/arrow_icon.png'
import hand_on from'../Components/Assets/hand_on.png'
import { Link } from 'react-router-dom'

const Courses = () => {
    return (
        <div className='courses'>
        <div className="courses-left">
            <h2>LEARN AND PRACTICE SQL</h2>
            <div>
                <div className="hand-on">
                    <p>Hand-on</p>
                    <img src={hand_on} alt="" />
                </div>
                <p>learning</p>
                <p>for everyone</p>
            </div>
            
            <Link to='/assignment'>
            <div className="choose-course-btn">
                <div>Choose your course</div>
                <img src={arrow_icon} alt="" />
            </div>
            </Link>
            
            </div>
      <div className="courses-right">
             <img src={sql} alt="" />
            </div>
        </div>
    );
}

export default Courses