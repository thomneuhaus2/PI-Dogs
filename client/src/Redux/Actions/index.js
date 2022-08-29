import axios from 'axios';
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPS = "GET_ALL_TEMPS";
export const FILTER_BY_CREATION = "FILTER_BY_CREATION";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_DOG_NAME = "GET_DOG_NAME";
export const POST_DOG = "POST_DOG";
export const GET_DETAIL = "GET_DETAIL";

export function getDogs() {
    return async function (dispatch) {
        try {
            let infoBack = await axios.get('http://localhost:3001/dogs', {});
            return dispatch({
                type: GET_ALL_DOGS,
                payload: infoBack.data
            });
        } catch (error) {
            if (error.response) { alert(error.response.data) }
        }
    }
}
export function getTemps() {
    return async function (dispatch) {
        try {
            let infoBack = await axios.get('http://localhost:3001/temperaments', {});
            return dispatch({
                type: GET_ALL_TEMPS,
                payload: infoBack.data
            });
        } catch (error) {
            if (error.response) { alert(error.response.data) }
        }

    }
}
export function getDogByName(name) {
    return async function (dispatch) {
        try {
            let infoName = await axios.get('http://localhost:3001/dogs?name=' + name, {});
                /* .then(() => dispatch({
                    type: GET_DOG_NAME,
                    payload: infoName.data
                }))
                .catch(error){if(error.response){ alert(error.response.data) }} */
            return dispatch({
                type: GET_DOG_NAME,
                payload: infoName.data
            });
        }
        catch (error) {
            if (error.response) { alert(error.response.data) }
        }

    }
}
export function filterByCreation(payload) {
    return {
        type: FILTER_BY_CREATION,
        payload
    }
}
export function filterByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}
export function postDog(info) {
    return async function (dispatch) {
        try {
            let infoBack = await axios.post('http://localhost:3001/dogs', info);
            return infoBack;
        } catch (error) {
            if (error.response) { alert(error.response.data) }
        }
    }
}
export function getDetail(id) {
    return async function (dispatch) {
        try {
            let infoBack = await axios.get('http://localhost:3001/dogs/' + id,);
            return dispatch({
                type: GET_DETAIL,
                payload: infoBack.data
            });
        }
        catch (error) { if (error.response) { alert(error.response.data) } }
    }
}
