import React from "react";
import "./Styles/Paging.css"

export default function Paging({ dogsPerPage, allDogs, paginado }) {

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i)
    }
    
    return (
        <nav className='container'>
            <div className='paginado'>
                {pageNumber && pageNumber.map(number => 
                    (
                            <button key={number} className='buttonP' onClick={() => paginado(number)}>{number}</button>
                    )
                
                )}
            </div>
        </nav>
    )
}