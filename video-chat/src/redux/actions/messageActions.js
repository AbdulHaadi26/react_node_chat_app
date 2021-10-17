import api from '../../utils/api';

import Token from './token';

import {
    messageConstants
} from '../constants';

const {
    MList,
    MAdd,
    MTyping
} = messageConstants;

export const registerMessage = data => async dispatch => {
    try {
        let res = await api.put('/chat/register', data, { headers: { 'authorization': `${localStorage.getItem('token')}` } });
        if (res.data) {
            dispatch({ type: MAdd, payload: res.data });
        }
    } catch (e) {

    }
};

export const insertMessage = data => async dispatch => {
    try {
        if (data) {
            dispatch({ type: MAdd, payload: data });
        }
    } catch (e) {

    }
};

export const updateTyping = data => async dispatch => {
    try {
            dispatch({ type: MTyping, payload: data });
    } catch (e) {

    }
};

export const getMessageList = (data) => async dispatch => {
    try {
        Token();
        let res = await api.get("/chat/all", { params: data, headers: { 'authorization': `${localStorage.getItem('token')}` } });
        res.data ? dispatch({ type: MList, payload: res.data }) : dispatch({ type: MList, payload: [] });
    } catch (e) {

    }
};
