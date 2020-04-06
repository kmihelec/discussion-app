import C from "../utils/constants";
import get from "../utils/get";

export function fetchingProfile(){
    return{
        type:C.FETCH_PROFILE
    }
}

export function fetchProfileSuccess(profile) {
    return {
        type: C.FETCH_PROFILE_SUCCESS,
        profile
    }
}
export function fetchProfileError(error) {
    return {
        type: C.FETCH_PROFILE_ERROR,
        error
    }
}
export function clearProfile() {
    return {
        type: C.CLEAR_PROFILE,
    }
}

export function fetchProfile(id,token) {
    return async dispatch =>{
        dispatch(fetchingProfile());
        try{
            const profile = await get.profile(id, token);
            if (profile.error) dispatch(fetchProfileError(profile.error));
            else {

                dispatch(fetchProfileSuccess(profile))}
        }catch (e) {
            console.log(e);
            dispatch(fetchProfileError('Internal Server Error'))
        }
    }
}