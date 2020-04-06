 import C from '../utils/constants'

 const initialState = {
     threads:[],
     loading:false,
     loaded: false,
     error:null,

 };

const threadReducer = (state=initialState, action) =>{
    switch (action.type) {
        case C.ADD_THREAD:
            return {
                ...state,
                threads: state.threads.concat(action.thread)

            };
        case C.EDIT_THREAD:
            return {
                ...state,
                threads: state.threads.map((thread,i)=>{
                    if(thread.id === action.thread.id){return{
                        ...state.threads[i],
                        content:action.thread.content,
                        title:action.thread.title
                    }}else return thread

                })

            };
        case C.DELETE_THREAD:
            return {
                ...state,
                threads: state.threads.filter(({id}) => id !== action.id)

            };
        case C.FETCH_THREADS:
            return {
                ...state,
                loading: true,

            };
        case C.FETCH_THREADS_SUCCESS:
                return {
                    ...state,
                    threads: state.threads.concat(action.thread),
                    loaded: true,
                    loading:false

                };
        case C.FETCH_THREADS_ERROR:
            return {
                ...state,
                loading: false,
                error:action.error

            };
        case C.RESET:
            return {
                ...state,
                threads: [],
                loading:false,
                error:null,
                loaded:false,
            };
        default:
            return state
    }
};

export default threadReducer