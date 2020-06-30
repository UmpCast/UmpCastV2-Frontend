import axios from 'axios'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS, CREATE_ERRORS,
} from "./types";

import {returnErrors} from './errors'

// LOGIN USER
export const login = (username, password) => dispatch => {
    // Success
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            'user': {
                'username': 'Bob',
                'email': 'Bob@gmail.com'
            },
            'token': 'Qw3rty11'
        }
    })

    // Error
    //
    // dispatch(returnErrors(err.response.data,
    //     err.response.status))
    // dispatch({
    //     type: LOGIN_FAIL
    // })

}

// LOGOUT USER
export const logout = () => (dispatch) => {
    // Success
    dispatch({
        type: LOGOUT_SUCCESS,
        payload: {}
    })

    // Error
    // const err = {
    //     response: {
    //         data: {},
    //         status: {}
    //     }
    // }
    //
    // dispatch(returnErrors(err.response.data,
    //     err.response.status))
}

// REGISTER USER
export const register = (first_name, last_name, email, phone_number, password, password2) => dispatch => {
    // const err = {
    //     form: 'register',
    //     msg: {
    //         first_name: 'First name is required',
    //         email: 'Provide a valid email',
    //         password2: 'Passwords must match',
    //         phone_number: 'International Numbers not supported'
    //     }
    // }
    // dispatch({
    //     type: CREATE_ERRORS,
    //     payload: err
    // })

    dispatch({
        type: REGISTER_SUCCESS,
        payload: {
            'user': {
                'username': 'Bob',
                'email': 'Bob@gmail.com'
            },
            'token': 'Qw3rty11'
        }
    })
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: USER_LOADING});

    // Error
    const err = {
        response: {
            data: {},
            status: {}
        }
    }

    dispatch(returnErrors(err.response.data,
        err.response.status))
    dispatch({
        type: AUTH_ERROR
    })

}

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}