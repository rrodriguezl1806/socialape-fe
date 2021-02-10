import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM} from '../types'


export const getScreams = (data) => dispatch => {
    dispatch({ type: LOADING_DATA })
    return dispatch({
        type: SET_SCREAMS,
        payload: data
    })
}

export const postScream = (data) => dispatch => {
    return dispatch({
        type: POST_SCREAM,
        payload: data
    })
}

export const setLike = (data) => dispatch => {
    return dispatch({
        type: LIKE_SCREAM,
        payload: data
    })
}

export const setUnlike = (data) => dispatch => {
    return dispatch({
        type: UNLIKE_SCREAM,
        payload: data
    })
}

export const setDeleteScream = (screamId) => dispatch => {
    return dispatch({
        type: DELETE_SCREAM,
        payload: screamId
    })
}
