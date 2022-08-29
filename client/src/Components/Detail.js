import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../Redux/Actions';
import "./Styles/Detail.css"

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id))
  }, [dispatch])
  const myDog = useSelector((state) => state.detail)

  return (
    <div className='containerD'>
      {myDog.length > 0 ?
        <div className='allDivs'>
          <h1 className='detailTitle'>{myDog[0].name}</h1>
          <div className='L'>
            <img className='imagenDetail' src={myDog[0].image.url} alt="img not found"/>
          </div>
          <div className='R'>
            <h2 className='characteristic'>Weight: {myDog[0].weight.metric}, {myDog[0].weight.imperial}</h2>
            <h2 className='characteristic'>Height: {myDog[0].height.metric}, {myDog[0].height.imperial}</h2>
            <h2 className='characteristic'>LifeSpan: {myDog[0].lifeSpan}</h2>
            <h2 className='characteristic'>Temperaments: {myDog[0].createdInDB ? myDog[0].temperaments.map(el => el.name + ('')) : myDog[0].temperament + ''}</h2>
          </div>
        </div>
        :
        <div>Loading...</div>}
      <Link to='/home'>
        <button className='homeB'>Home</button>
      </Link>
    </div>
  )

}