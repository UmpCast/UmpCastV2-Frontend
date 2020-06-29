import axios from 'axios'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
} from "./types";

import {returnErrors} from './errors'

// LOGIN USER
export const login = (username, password) => dispatch => {

    // // Headers
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }
    //
    // // Request Body
    // const body = JSON.stringify({username, password})
    // axios
    //     .post('/api/auth/login', body, config)
    //     .then(res => {
    //         dispatch({
    //             type: LOGIN_SUCCESS,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data,
    //             err.response.status))
    //         dispatch({
    //             type: LOGIN_FAIL
    //         })
    //     })

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
export const logout = () => (dispatch, getState) => {

    // axios
    //     .post('/api/auth/logout', null, tokenConfig(getState))
    //     .then(res => {
    //         dispatch({
    //             type: LOGOUT_SUCCESS,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data,
    //             err.response.status))
    //     })

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
export const register = ({ username, password, email }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({username, email, password})
    // axios
    //     .post('/api/auth/register', body, config)
    //     .then(res => {
    //         dispatch({
    //             type: REGISTER_SUCCESS,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data,
    //             err.response.status))
    //         dispatch({
    //             type: REGISTER_FAIL
    //         })
    //     })

    //Success
    dispatch({
        type: REGISTER_SUCCESS,
        payload: {
            user: {
                username: username,
                email: email,
                password: password
            },
            token: 'Qw3rty11'
        }
    })
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({type: USER_LOADING});

    // axios
    //     .get('/api/auth/user', tokenConfig(getState))
    //     .then(res => {
    //         dispatch({
    //             type: USER_LOADED,
    //             payload: res.data
    //         })
    //     })
    //     .catch(err => {
    //         dispatch(returnErrors(err.response.data,
    //             err.response.status))
    //         dispatch({
    //             type: AUTH_ERROR
    //         })
    //     })

    // Success
    // dispatch({
    //     type: USER_LOADED,
    //     payload: {}
    // })

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