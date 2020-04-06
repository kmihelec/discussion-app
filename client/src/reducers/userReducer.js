import C from '../utils/constants'

const initialState = {
    user:{},
    threads:[],
    comments:[],
    loading:false,
    loaded: false,
    error:null,
};

const userReducer = (state=initialState, action) =>{
    switch (action.type) {

        case C.FETCH_PROFILE:
            return{
                ...state,
                loading: true
            };

        case C.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.profile.user,
                threads: state.threads.concat(action.profile.threads),
                comments: state.comments.concat(action.profile.comments),
                loaded: true,
                loading:false

            };

        case C.FETCH_PROFILE_ERROR:
            return{
                ...state,
                loading:false,
                error:action.error,
                loaded:false
            };
            
        case C.CLEAR_PROFILE:
            return initialState;
        default:
            return state
    }
};

export default userReducer