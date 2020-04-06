import C from "../utils/constants";
import get from "../utils/get"

export function addThread(thread){
    return{
        type:C.ADD_THREAD,
        thread
    }
}

export function fetchingThreads(){
    return{
        type:C.FETCH_THREADS
    }
}

export function fetchThreadsSuccess(thread) {
    return {
        type: C.FETCH_THREADS_SUCCESS,
        thread
    }
}
export function fetchThreadsError(error) {
    return {
        type: C.FETCH_THREADS_ERROR,
        error
    }
}
export function deleteThread(id) {
    return {
        type: C.DELETE_THREAD,
        id
    }
}
export function editThread(thread) {
    return {
        type: C.EDIT_THREAD,
        thread
    }
}
export function reset(){
    return{type: C.RESET}
}

export function fetchThreads(offset) {
    return async dispatch =>{
        dispatch(fetchingThreads());
        try{
            const threads = await get.threads(offset);

            if (threads.error) dispatch(fetchThreadsError(threads.error));
            else {

                dispatch(fetchThreadsSuccess(threads))}
        }catch (e) {
            dispatch(fetchThreadsError(e))
        }
    }
}
