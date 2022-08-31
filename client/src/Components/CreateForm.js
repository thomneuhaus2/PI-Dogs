import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTemps, postDog } from '../Redux/Actions';
import "./Styles/CreateForm.css"

function validate(input) {
    let errors = {
        name: validateName(input.name),
        height: validateWHL(input.minHeight, input.maxHeight),
        weight: validateWHL(input.minWeight, input.maxWeight),
        lifeSpan: validateWHL(input.minLifeSpan, input.maxLifeSpan),
        temperament: validateTemperaments(input.temperament)
    }
    return errors;
}
function validateName(name) {
    if (name.length === 0) return 'Name required';
    else if (!/^[a-z\s]+$/i.test(name)) return 'Name can only contain letters' //checkea no tener nada raro
    else if (!/^[a-z]+$/i.test(name)) return 'Name must have at least one letter' //checkea no ser solo espacios
    else return 'Ok'
}
function validateWHL(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    if (typeof (min) != 'number') return 'Min must be a number';
    else if (typeof (max) != 'number') return 'Max must be a number';
    else if (min >= max) return 'Max must be higher than Min';
    else if (min <= 0 || max <= 0) return 'Value must be higher than zero';
    else return 'Ok'
}
function validateTemperaments(temps) {
    if (temps.length === 0) return 'Select at least one temperament'
    else return 'Ok'
}

export default function CreateForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.allTemps);
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        minHeight: 0,
        minWeight: 0,
        maxHeight: 0,
        maxWeight: 0,
        minLifeSpan: 0,
        maxLifeSpan: 0,
        image: "",
        createdInDB: true,
        temperament: []
    })
    useEffect(() => {
        dispatch(getTemps())
    }, [dispatch])
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (errors.name === 'Ok'
            && errors.weight === 'Ok'
            && errors.height === 'Ok'
            && errors.lifeSpan === 'Ok'
            && errors.temperament === 'Ok') {
            let info = {
                name: input.name,
                height: {
                    metric: input.minHeight + ' - ' + input.maxHeight,
                    imperial: Math.round(input.minHeight / 2, 54) + ' - ' + Math.round(input.maxHeight / 2, 54)
                },

                weight: {
                    metric: input.minWeight + ' - ' + input.maxWeight,
                    imperial: Math.round(input.minWeight / 2, 2) + ' - ' + Math.round(input.maxWeight / 2, 2)
                },

                lifeSpan: input.minLifeSpan + ' - ' + input.maxLifeSpan + ' years',
                image: "",
                createdInDB: true,
                temperament: input.temperament,
            }
            dispatch(postDog(info));
            alert('Dog created')
            setInput({
                name: "",
                minHeight: 0,
                minWeight: 0,
                maxHeight: 0,
                maxWeight: 0,
                minLifeSpan: 0,
                maxLifeSpan: 0,
                image: "",
                createdInDB: true,
                temperament: []
            })
            history.push('/home')
        }
        else {
            alert(`Dog was not created due to wrong input:
            name: ${errors.name},
            height: ${errors.height},
            weight: ${errors.weight},
            lifeSpan: ${errors.lifeSpan}
            temperaments: ${errors.temperament}`)
            history.push('/dogForm')
        }
    };
    function handleDelete(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter(el => el !== e)
        })
    }
    return (
        <div className='containerP'>
            <h1 className='createTitle'>Create your dog</h1>
            <form className='formCreate' onSubmit={(e) => handleSubmit(e)}>
                <div className='dataField'>
                    <label className='instruction'>Name:</label>
                    <input className='inputBar' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                </div>
                <div className='dataField'>
                    <label className='instruction'>Min height:</label>
                    <input className='inputBar' type='number' value={input.minHeight} name='minHeight' onChange={(e) => handleChange(e)} />
                    <label className='instruction'>Max height:</label>
                    <input className='inputBar' type='number' value={input.maxHeight} name='maxHeight' onChange={(e) => handleChange(e)} />
                </div>
                <div className='dataField'>
                    <label className='instruction'>Min weight:</label>
                    <input className='inputBar' type='number' value={input.minWeight} name='minWeight' onChange={(e) => handleChange(e)} />
                    <label className='instruction'>Max weight:</label>
                    <input className='inputBar' type='number' value={input.maxWeight} name='maxWeight' onChange={(e) => handleChange(e)} />
                </div>
                <div className='dataField'>
                    <label className='instruction' >Min lifespan:</label>
                    <input className='inputBar' type='number' value={input.minLifeSpan} name='minLifeSpan' onChange={(e) => handleChange(e)} />
                    <label className='instruction' >Max lifespan:</label>
                    <input className='inputBar' type='number' value={input.maxLifeSpan} name='maxLifeSpan' onChange={(e) => handleChange(e)} />
                </div>
                <div className='dataField'>
                    <label className='instruction' >Temperaments:</label>
                    <select className='dataField' onChange={(e) => handleSelect(e)}>
                        {
                            temperaments.map((el) => {
                                return (
                                    <option value={el.name} key={el.id}>{el.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='tempDiv'>
                {input.temperament.map((el,i) =>{
                    i++;
                    return(
                    <div className='tempDiv2' key={i}>
                        <p className='tempName'>{el}</p>
                        <button className='homeButton' type='button' onClick={() => handleDelete(el)}>X</button>
                    </div>)}
                )}
            </div>
                <Link to='/home'><button className='homeButton'>Cancel</button></Link>
                <button className='submitButton' type='submit'> Create</button>
            </form>
        </div>
    )
}