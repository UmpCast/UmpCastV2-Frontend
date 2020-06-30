import {
    CREATE_ERRORS
} from "../actions/types";

const initialState = {
    form: null,
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_ERRORS:
            return {
                form: action.payload.form,
                errors: action.payload.msg
            }
        default:
            return state
    }

}