import C from '../utils/constants'

const initialState = {
    loggedIn:false,
    user:null,
    id:null,
    token:null,
    loggingIn:false,
    error:null};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case C.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,

            };
        case C.AUTHENTICATED:
            return {
                ...state,
                loggedIn: true,
                loggingIn: false,
                error:null,
                user: action.user.username,
                id: action.user.id,
                token: action.user.token
            };
        case C.UNAUTHENTICATED:
            return {
                ...state,
                loggedIn: false,
                user: null,
                id: null,
                loggingIn: false,
                error: action.error,
                token: null
            };
        case C.LOGOUT:
            return {
                ...state,
                id: null,
                loggedIn: false,
                user: null,
                loggingIn: false,
                token: null
            };
        default:
            return state
    }
}

export default authReducer;