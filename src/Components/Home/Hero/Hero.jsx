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
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <Link to='/courses'><button>
                VIEW COURSES <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero