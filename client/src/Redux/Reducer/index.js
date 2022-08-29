import {
  GET_ALL_DOGS,
  GET_ALL_TEMPS,
  FILTER_BY_CREATION,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  GET_DOG_NAME,
  POST_DOG,
  GET_DETAIL
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
      let sorted = action.payload === 'asc' ?
        state.dogs.sort(function (a, b) {
          if (a.name > b.name) { return 1 }
          else if (b.name > a.name) { return -1 }
          return 0;
        })
        : state.dogs.sort(function (a, b) {
          if (a.name > b.name) { return -1 }
          else if (b.name > a.name) { return 1 }
          return 0;
        })
      return {
        ...state,
        dogs: sorted,
      }
    case ORDER_BY_WEIGHT:
      console.log(state.dogs)
      let sorted2 = action.payload === 'asc' ?
        state.dogs.sort(function (a, b) {
          if (parseInt(a.weight.metric) - parseInt(b.weight.metric)) { return 1 }
          else if (parseInt(b.weight.metric) > parseInt(a.weight.metric)) { return -1 }
          return 0;
        })
        : state.dogs.sort(function (a, b) {
          if (parseInt(a.weight.metric) > parseInt(b.weight.metric)) { return -1 }
          else if (parseInt(b.weight.metric) > parseInt(a.weight.metric)) { return 1 }
          return 0;
        })
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
    default:
      return state;
  }
};

