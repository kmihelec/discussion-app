import C from '../utils/constants'
import auth from "../utils/auth";

export function loginRequest() {
        return {type:C.LOGIN_REQUEST}
}

export function authenticated(user) {
        return {
            type:C.AUTHENTICATED,
            user:user
        }
}

export function unauthenticated(error) {
        return{
            type:C.UNAUTHENTICATED,
            error
        }
}

export function logout() {
        return{
            type: C.LOGOUT
        }
}


export function  userLogin (username, password){
    return async dispatch => {
        dispatch(loginRequest());
        try{
            const user = await auth.login(username,password);
            if(user.error) dispatch(unauthenticated(user.error));
            else dispatch(authenticated(user));
        }catch(e){
            dispatch(unauthenticated(e));
        }
    }
}

export function checkLogin(){
    return async dispatch=> {
        dispatch(loginRequest());
        const token = localStorage.getItem('Bearer');
        if (token) {
            const user = await auth.checkToken(token);
            if(user.error){
                dispatch(logout());
                auth.signOut()
            }
            else  dispatch(authenticated(user));
        } else dispatch(logout())
    }
}