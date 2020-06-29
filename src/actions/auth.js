import axios from 'axios'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './types'

import {returnErrors} from './errors'

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
    const err = {response:{
         data: {},
         status: {}
    }}

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