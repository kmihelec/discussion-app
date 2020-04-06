import {combineReducers} from "redux";
import commentReducer from './commentReducer';
import threadReducer from "./threadReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

export default combineReducers({
    commentReducer,
    userReducer,
    threadReducer,
    authReducer
})

