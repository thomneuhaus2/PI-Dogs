import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName } from '../Redux/Actions';
import "./Styles/SearchBar.css"

export default function SearchBar({setCurrentPage}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value)   
    };
    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogByName(name));
        setCurrentPage(1)
        setName('')
       
    };
    return(
        <div>
            <input className='textBox' type='text' placeholder='Dog name...' onChange={e => { handleInput(e) }} value={name}/>
            <button className='searchB' type='submit' onClick={e => { handleClick(e) }} >Search</button>
        </div>
    )
}