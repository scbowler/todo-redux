import types from './types';
import axios from 'axios';

const BASE_URL = 'http://api.reactprototypes.com';
const API_KEY = '?key=c618_demouser';

export function getAllListData(){
    const resp = axios.get(`${BASE_URL}/todos${API_KEY}`);

    return {
        type: types.GET_ALL_LIST_DATA,
        payload: resp
    };
}

export const getSingleItem = id => async dispatch => {

    try {
        const resp = await axios.get(`${BASE_URL}/todos/${id + API_KEY}`);

        dispatch({
            type: types.GET_SINGLE_ITEM,
            payload: resp
        });
    } catch(err){
        dispatch({
            type: types.LIST_ERROR,
            error: 'No item found'
        });
    }
}

export function addItem(item){
    const resp = axios.post(`${BASE_URL}/todos${API_KEY}`, item);

    return {
        type: types.ADD_ITEM,
        payload: resp
    };
}

export function deleteItem(id){
    return async function (dispatch){
        try {
            const resp = await axios.delete(`${BASE_URL}/todos/${id + API_KEY}`);

            console.log('DELETE WORKED!');
            dispatch({
                type: types.DELETE_ITEM,
                payload: resp
            });
        } catch(err){
            console.log('DELETE FAILED!');
            dispatch({
                type: types.LIST_ERROR,
                error: 'Failed to delete item'
            });
        }
    }
}

export const resetSingle = () => ({type: types.RESET_SINGLE_VIEW});

// export function resetSingle(){
//     return {
//         type: types.RESET_SINGLE_VIEW
//     };
// }
