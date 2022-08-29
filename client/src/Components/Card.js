import React from 'react';
import { Link } from 'react-router-dom';
import "./Styles/Card.css"

export default function Card({ name, image, weight, temperament, created, id }) {
    if (created) {
        temperament = temperament.map(el => {
            return el.name;
        });
    }
    return (
        <div className='cardC'>
            <img className='imgPerro' src={image.url} alt="img not found" />
            <Link to={"/home/" + id}>
                <h3 className='dogName'>{name}</h3>
            </Link>
            <h5 className='infoPerro'>Weight: {weight.metric} Kg, {weight.imperial} lb</h5>
            <div className='tempsDiv'>
                <h5 className='tempsList'>Temperamentos:</h5>
                <select className='temperaments'>
                    {temperament.length>0?
                    temperament.map((el, i) => {
                        i++;
                        return (
                            <option value={el} key={i}>{el}</option>
                        )
                    }):
                    <option>No info</option>
                    }
                </select>
            </div>



        </div>
    );
}