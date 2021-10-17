import api from '../../utils/api';

import Token from './token';

import {
    loginConstants,
    registerConstant,
    userConstants
} from '../constants';

const {
    LErr,
    LReq,
    LSuc
} = loginConstants;

const {
    RegClr,
    RegErr,
    RegLoad
} = registerConstant;

const {
    GPErr,
    GPReq,
    GPSuc,
    UList
} = userConstants;

export const loginUser = data => async dispatch => {
    try {
        dispatch({ type: LReq });
        let res = await api.post('/user/auth', data);
        if (res.data) {
            dispatch({ type: LSuc });
            dispatch(setCurrentUser(res.data));
        } else { dispatch({ type: LErr, payload: 'Invalid email or password' }); }
    } catch (e) { dispatch({ type: LErr, payload: 'Invalid email or password' }); }
};

export const registerUser = data => async dispatch => {
    try {
        dispatch({ type: RegLoad });
        let res = await api.put('/user/register', data);
        if (res.data) {
            dispatch({ type: RegClr });
        } else { dispatch({ type: RegErr, payload: 'User could not be registered' }); }
    } catch (e) { dispatch({ type: RegErr, payload: 'User could not be registered' }); }
};

const setCurrentUser = (t) => dispatch => {
    localStorage.setItem("token", t);
    dispatch(getCurrentUser());
};

export const getCurrentUser = () => dispatch => {
    localStorage.getItem('token') && dispatch(getProfile());
};

export const logOut = () => async dispatch => {
    try {
        dispatch({ type: GPSuc, payload: null });
        if (localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
        }
    } catch { }
};

export const getProfile = () => async dispatch => {
    try {
        dispatch({ type: GPReq });
        Token();
        let res = await api.get("/user/profile", { headers: { 'authorization': `${localStorage.getItem('token')}` } });
        res.data ? dispatch({ type: GPSuc, payload: res.data }) : dispatch({ type: GPErr });
    } catch (e) { dispatch({ type: GPErr }); }
};

export const getUserList = () => async dispatch => {
    try {
        Token();
        let res = await api.get("/user/all", { headers: { 'authorization': `${localStorage.getItem('token')}` } });
        res.data && dispatch({ type: UList, payload: res.data })
    } catch (e) { 
        
     }
};
