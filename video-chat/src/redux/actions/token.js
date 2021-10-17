import { userConstants } from '../constants';
const Token = next => async dispatch => localStorage.getItem('token') !== null ? next() : dispatch({ type: userConstants.GPErr });

export default Token;