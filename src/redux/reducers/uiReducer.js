import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS} from "../types";

const initialState = {
    loading: false,
    errors: {}
}

 export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: {}
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
