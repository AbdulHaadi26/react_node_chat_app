import {
    userConstants,
    loginConstants,
    registerConstant
} from "../constants";

const {
    GPErr,
    GPReq,
    GPSuc,
    UList
} = userConstants;

const {
    RegClr,
    RegLoad,
    RegErr
} = registerConstant;

const {
    LReq,
    LErr,
    LSuc
} = loginConstants;

const initial_state_user = {
    list: []
};

const initial_state_profile = {
    isLoading: false,
    isError: false,
    isSuccess: false
};

const initial_state_register = {
    isLoading: false,
    isError: false,
    isSuccess: false
};

const initial_state_login = {
    isLoading: false,
    isError: false,
    isSuccess: false
};

export const userReducer = (state = initial_state_user, action) => {
    switch (action.type) {
        case UList: return {
            ...state,
            list: action.payload
        };

        default: return state;
    }
};

export const profileReducer = (state = initial_state_profile, action) => {
    switch (action.type) {
        case GPReq: return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        };

        case GPErr: return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false
        };

        case GPSuc: return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: action.payload
        };

        default: return state;
    }
};

export const registerReducer = (state = initial_state_register, action) => {
    switch (action.type) {
        case RegLoad: return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        };

        case RegErr: return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false,
            err: action.payload
        };


        case RegClr: return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: false,
            err: null
        };

        default: return state;
    }
};

export const loginReducer = (state = initial_state_login, action) => {
    switch (action.type) {
        case LReq: return {
            ...state,
            isLoading: true,
            isError: false,
            isSuccess: false
        };

        case LErr: return {
            ...state,
            isLoading: false,
            isError: true,
            isSuccess: false,
            err: action.payload
        };

        case LSuc: return {
            ...state,
            isLoading: false,
            isError: false,
            isSuccess: true,
            err: null
        };

        default: return state;
    }
};