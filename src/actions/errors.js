import {CREATE_ERRORS, GET_ERRORS} from "./types";

// CREATE MESSAGE
export const createError = err => {
    return {
        type: CREATE_ERRORS,
        payload: err
    }
}

// RETURN ERRORS
export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    }
}