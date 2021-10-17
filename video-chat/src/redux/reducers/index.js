import { combineReducers } from 'redux';
import { messageReducer } from './message';
import { profileReducer, loginReducer, registerReducer, userReducer } from './user';
const CombinedReducers = combineReducers({
    Profile: profileReducer,
    Login: loginReducer,
    Register: registerReducer,
    User: userReducer,
    Message: messageReducer
});

export default CombinedReducers;