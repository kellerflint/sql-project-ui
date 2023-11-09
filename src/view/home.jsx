import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import '../App.css'

const Home = () => {
    return (
        <div >
            <div className="next">
                <Link to='/practice'>

                    <Button type='primary'>

                        Practice

                    </Button>
                </Link>
            </div>
            <div className="container">

            <h1>Home Page</h1>
            <p>Intro to SQL</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

        </div>
    );
}

export default Home;
