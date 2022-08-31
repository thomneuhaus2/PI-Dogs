import React from 'react'
import { useEffect, useState,} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDogs,
    getTemps,
    filterByCreation,
    filterByTemperament,
    orderByName,
    orderByWeight
} from '../Redux/Actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paging from './Paging';
import SearchBar from './SearchBar';
import "./Styles/Home.css"

const ITEMS_PAGINA = 8;


export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const [, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage,] = useState(ITEMS_PAGINA);
    const indexOfLast = currentPage * dogsPerPage;
    const indexOfFirst = indexOfLast - dogsPerPage;
    const dogsToShow = allDogs.slice(indexOfFirst, indexOfLast);
    const temps = useSelector((state) => state.allTemps);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    useEffect(() => {
        dispatch(getTemps());
        dispatch(getDogs()); 
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    };
    function handleFilterByCreation(e) {
        dispatch(filterByCreation(e.target.value))
        setCurrentPage(1)
    };
    function handleFilterByTemperament(e) {
        dispatch(filterByTemperament(e.target.value))
        setCurrentPage(1)
    };
    function handleOrderByName(e) {
            dispatch(orderByName(e.target.value))
            setCurrentPage(1)
            setOrden(`Ordenado ${e.target.value}`)
    };
    function handleOrderByWeight(e) {
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };
    return (
        <div className='container'>
            <span className='left'>
                <h1 className='titleName'> WikiDog</h1>
                <SearchBar setCurrentPage={setCurrentPage} />
                <div className='filters'>
                    <div className='sortText'>Order alphabetically:</div>
                    <select className='filter' onChange={e => { handleOrderByName(e) }}>
                        <option value='default'>-</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                    </select>
                    <div className='sortText'>Order by weight:</div>
                    <select className='filter' onChange={e => { handleOrderByWeight(e) }}>
                        <option value='default'>-</option>
                        <option value='asc'>Lightest (min weight)</option>
                        <option value='desc'>Heaviest (min weight)</option>
                    </select>
                    <div className='sortText'>Filer by creation:</div>
                    <select className='filter' onChange={e => { handleFilterByCreation(e) }}>
                        <option value='All'>All</option>
                        <option value='api'>Api</option>
                        <option value='db'>DataBase</option>
                    </select>
                    <div className='sortText'>Filer by temperament:</div>
                    <select className='filter' onChange={e => { handleFilterByTemperament(e) }}>
                        <option value='All'>All</option>
                        {temps?.map(el => {
                            return (
                                <option value={el.name} key={el.id}>{el.name}</option>
                            )
                        })
                        }
                    </select>
                    <button className='reset' onClick={e => { handleClick(e) }}> Clear filters</button>
                </div>
                <Link className='create' to='/dogForm'><span> Create a dog</span></Link>
            </span>
            <span className='right'>
                <div className='cardHolder'>
                    {dogsToShow?.map((el) => {
                        return (
                            <Card name={el.name}
                                image={el.image}
                                weight={el.weight}
                                temperament={el.createdInDB ? el.temperaments : el.temperament}
                                id={el.id}
                                created={el.createdInDB ? true : false}
                                key={el.id}
                            />
                        )
                    })
                    }
                </div>
                <div className='pagingHolder'>
                    <Paging dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                    />
                </div>

            </span>
        </div >

    )
}