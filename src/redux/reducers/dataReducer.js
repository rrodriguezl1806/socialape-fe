import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM} from '../types'

const initialState = {
    screams: [],
    scream: {},
    loading: false,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            state.screams[index] = action.payload
            return {
                ...state
            }
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload)
            state.screams.splice(index, 1)
            return {
                ...state
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [...state.screams, action.payload],
                loading: false
            }
        default:
            return state
    }
}
