import React from 'react';
import { Link } from 'react-router-dom';
import "./Styles/LandingPage.css"


export default function LandingPage() {

    return (
        <div className='container'>
                <h1 className='title'> Welcome to WikiDogs</h1>
                <Link to='/home'>
                    <button className='button'><span>Let's Go!</span></button>
                </Link>
        </div>
    )
}