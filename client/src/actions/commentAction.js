import C from "../utils/constants";
import get from "../utils/get"


export function addComment(comment){
    return{
        type:C.ADD_COMMENT,
        comment
    }
}
export function fetchingComments(){
    return{
        type:C.FETCH_COMMENTS
    }
}

export function fetchCommentsSuccess(comments) {
    return {
        type: C.FETCH_COMMENTS_SUCCESS,
       comments
    }
}
export function fetchCommentsError(error) {
    return {
        type: C.FETCH_COMMENTS_ERROR,
        error
    }
}
export function deleteComment(id) {
    return {
        type: C.DELETE_COMMENT,
        id
    }
}
export function editComment(comment) {
    return {
        type: C.EDIT_COMMENT,
        comment
    }
}
export function reset(){
    return{type: C.RESET}
}

export function fetchComments(offset, threadId) {
    return async dispatch =>{
        dispatch(fetchingComments());
        try {
            const comments = await get.comments(offset, threadId);
            if(comments.error)dispatch(fetchCommentsError(comments.error));
            else{

                dispatch(fetchCommentsSuccess(comments))}

        } catch(e){
            dispatch(fetchCommentsError(e))
        }
    }
}