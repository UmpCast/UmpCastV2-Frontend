import {
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
} from "./types";

// LOGIN USER
export const login = (username, password, formComponent) => dispatch => {
    // Success
    // dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: {
    //         'user': {
    //             'username': 'Bob',
    //             'email': 'Bob@gmail.com'
    //         },
    //         'token': 'Qw3rty11'
    //     }
    // })

    formComponent.setState( {form: {
            validated: true,
            errors: {
                email: 'Provide a valid email',
            }
        }}
    )
    dispatch({
        type: LOGIN_FAIL
    })
}

// LOGOUT USER
export const logout = () => (dispatch) => {
    // Success
    dispatch({
        type: LOGOUT_SUCCESS,
        payload: {}
    })
}

// REGISTER USER
export const register = (first_name, last_name, email, phone_number, password, password2, formComponent) => dispatch => {
    // Success
    // dispatch({
    //     type: REGISTER_SUCCESS,
    //     payload: {
    //         'user': {
    //             'username': 'Bob',
    //             'email': 'Bob@gmail.com'
    //         },
    //         'token': 'Qw3rty11'
    //     }
    // })

    //Error
    formComponent.setState( {form: {
            validated: true,
            errors: {
                first_name: 'First name is required',
                email: 'Provide a valid email',
                password2: 'Passwords must match',
                phone_number: 'International Numbers not supported'
            }
        }}
    )
    dispatch({
        type: REGISTER_FAIL
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

    dispatch({
        type: AUTH_ERROR,
        payload: err
    })

}