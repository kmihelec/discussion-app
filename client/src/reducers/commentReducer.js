import C from "../utils/constants";
const initialState ={
    comments: [],
    loading:false,
    error:null,
    loaded:false,

};

function commentReducer(state=initialState, action){

    switch(action.type){

        case C.ADD_COMMENT:
            return{
                ...state,
                comments: state.comments.concat(action.comment)
            };
        case C.FETCH_COMMENTS:
            return{
                ...state,
                loading: true
            };

        case C.FETCH_COMMENTS_SUCCESS:
            return{
                ...state,
                loading:false,
                loaded:true,
                comments: state.comments.concat(action.comments)
            };

        case C.FETCH_COMMENTS_ERROR:
            return{
                ...state,
                loading:false,
                loaded:false,
                error:action.error
            };

        case C.DELETE_COMMENT:
            return{
                ...state,
                comments: state.comments.filter(({id}) => id !== action.id)
            }

        case C.EDIT_COMMENT:
            return{
                ...state,
                comments: state.comments.map((comment,i)=>{

                    if(comment.id === action.comment.id){return{

                        ...state.comments[i],
                        comment:action.comment.comment,
                        updatedAt:action.comment.updatedAt
                    }}else return comment
                })
            };
        case C.RESET:
            return {
                ...state,
                comments: [],
                loading:false,
                error:null,
                loaded:false,
            };
        default:
            return state;
    }



}

export default commentReducer;