import {SET_AUTHENTICATED, SET_USER, LOADING_USER, SET_UNAUTHENTICATED} from "../types";

export const setLoginUser = (userData) => dispatch => {
    return dispatch({
        payload: userData,
        type: SET_AUTHENTICATED
    });
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token')
    return dispatch ({ type: SET_UNAUTHENTICATED })
}

export const setUserData = (userData) => dispatch => {
    return dispatch({
        payload: userData,
        type: SET_USER
    });
}

export const setLoadingUser = () => dispatch => {
    return dispatch({
        type: LOADING_USER
    });
}

export const setEditUserDetails = () => dispatch => {
    return dispatch({
        type: LOADING_USER
    });
}
