import { combineReducers } from "redux";
import streamReducer from './streamReducer';
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});