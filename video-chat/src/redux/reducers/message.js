import {
    messageConstants
} from "../constants";

const {
    MAdd,
    MList,
    MTyping
} = messageConstants;

const initial_state_message = {
    list: [], typing: false
};

export const messageReducer = (state = initial_state_message, action) => {
    switch (action.type) {
        case MList: return {
            ...state,
            list: action.payload
        };

        case MAdd: return {
            ...state,
            list: state.list && state.list.length > 0 ? state.list.concat([action.payload]) : [action.payload]
        };

        case MTyping: return {
            ...state,
            typing: action.payload
        };

        default: return state;
    }
};
