import {
  GET_ALL_DOGS,
  GET_ALL_TEMPS,
  FILTER_BY_CREATION,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_DOG_NAME,
  POST_DOG,
  GET_DETAIL,
  CLEAN_DETAIL
} from '../Actions';

const initialState = {
  dogs: [],   //sobre el que trabajo
  allDogs: [],  //copia de todos que no se toca
  allTemps: [], //todos los temps, no se toca
  detail: []    //info para el detail
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      }
    case GET_ALL_TEMPS:
      return {
        ...state,
        allTemps: action.payload,
      }
    case GET_DOG_NAME:
      return {
        ...state,
        dogs: action.payload,
      }
    case FILTER_BY_CREATION:
      const all = state.allDogs;
      let comparative = false;
      if (action.payload === 'db') { comparative = true; }
      const creationFiltered = action.payload === 'All' ? all : all.filter(el => el.createdInDB === comparative)
      return {
        ...state,
        dogs: creationFiltered
      }
    case FILTER_BY_TEMPERAMENT:
      const all2 = state.allDogs;
      let comparative2 = { name: action.payload }
      const creationFiltered2 = action.payload === 'All' ? all2 : all2.filter(el => el.createdInDB ? el.temperaments.includes(comparative2) : el.temperament.includes(action.payload))
      return {
        ...state,
        dogs: creationFiltered2
      }
    case ORDER_BY_NAME:
      if (action.payload === 'default') { return { ...state } }
      let sorted = action.payload === 'asc' ?
        state.dogs.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
          else if (b.name.toLowerCase() > a.name.toLowerCase()) { return -1 }
          return 0;
        })
        : state.dogs.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return -1 }
          else if (b.name.toLowerCase() > a.name.toLowerCase()) { return 1 }
          return 0;
        })
      return {
        ...state,
        dogs: sorted,
      }
    case ORDER_BY_WEIGHT:
      let sorted2 = [];
      if (action.payload === 'default') { return { ...state } }
      else if (action.payload === 'asc') {
        sorted2 = state.dogs.sort(function (a, b) {
          let m1 = a.weight.metric.split(' ')[0];
          let m2 = b.weight.metric.split(' ')[0];
          if (m1 === 'NaN') { m1 = parseInt(a.weight.imperial.split(' ')[0]) / 2.2; }
          else { m1 = parseInt(m1) }
          if (m2 === 'NaN') { m2 = parseInt(b.weight.imperial.split(' ')[0]) / 2.2; }
          else { m2 = parseInt(m2) }
          return m1 - m2;
        })
      }
      else if (action.payload === 'desc') {
        sorted2 = state.dogs.sort(function (a, b) {
          let m1 = a.weight.metric.split(' ')[0];
          let m2 = b.weight.metric.split(' ')[0];
          if (m1 === 'NaN') { m1 = parseInt(a.weight.imperial.split(' ')[0]) / 2.2; }
          else { m1 = parseInt(m1) }
          if (m2 === 'NaN') { m2 = parseInt(b.weight.imperial.split(' ')[0]) / 2.2; }
          else { m2 = parseInt(m2) }
          return m2 - m1;
        })
      }
      return {
        ...state,
        dogs: sorted2,
      }
    case POST_DOG:
      return {
        ...state
      }
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    case CLEAN_DETAIL:
      return{
        ...state,
        detail:[]
      }
    default:
      return state;
  }
};

