import {combineReducers} from "redux";
import auth from './auth'
import form from "./form";

export default combineReducers({
    auth,
    form
});