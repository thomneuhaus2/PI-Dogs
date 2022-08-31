import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getDetail, cleanDetail } from '../Redux/Actions';
import "./Styles/Detail.css"

export default function Detail(props) {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

  const myDog = useSelector((state) => state.detail)

  function handleClick(e) {
    e.preventDefault();
    dispatch(cleanDetail());
    history.push('/home')
  };
  return (
    <div className='containerD'>
      {myDog.length > 0 ?
        <div className='allDivs'>
          <h1 className='detailTitle'>{myDog[0].name}</h1>
          <div className='L'>
            <img className='imagenDetail' src={myDog[0].image.url} alt="img not found" />
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
        <button className='homeB' onClick={e => { handleClick(e) }}>Home</button>
      </Link>
    </div>
  )
}