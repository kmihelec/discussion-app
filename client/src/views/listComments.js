import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import{ connect} from "react-redux";
import {fetchThreads} from "../actions/threadAction"
import{ fetchComments, deleteComment, reset} from '../actions/commentAction'
import {checkLogin} from "../actions/authAction"
import {Link} from "react-router-dom"
import ErrorNotice from "../components/error";
import Loading from "../components/loading";
import Button from "react-bootstrap/Button";
import Comment from "../components/comment";
import del from "../utils/delete";
import style from "../styles/threadAndComments.module.css"

const mapStateToProps = state =>{
    return{
        user: state.authReducer,
        threads: state.threadReducer,
        users: state.userReducer,
        comments: state.commentReducer
    }
};

const actions = {
    fetchThreads,
    checkLogin,
    fetchComments,
    deleteComment,
    reset
};



class ConListComment extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            offset:10
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    componentDidMount() {
        if(this.props.comments.error)this.props.reset();
        if(!this.props.user.loggedIn)this.props.checkLogin();

        if(!this.props.threads.loaded)this.props.fetchThreads(0);
        else{
            while(!this.props.threads.threads.some(e=>e.id === Number(this.props.match.params.id))){
                let off = 10;
                this.props.fetchThreads(off);
                off += 10
            }
        }

        if(!this.props.comments.loaded)this.props.fetchComments(0,this.props.match.params.id);
        else{
            let loaded = this.props.comments.comments.some(e=>e.threadId===Number(this.props.match.params.id));
            if(!loaded)this.props.fetchComments(0,this.props.match.params.id);
            }

        }

    handleSubmit(){
        this.props.fetchComments(this.state.offset, this.props.match.params.id);
        this.setState({offset:this.state.offset+10});

    }

    async handleDelete(id,token){
        const d = await del.comment(id, token);
        if(d.deleted){
            this.props.deleteComment(id);
            alert('Comment deleted!');
        } else alert('Unable to delete the comment')
    }


    render() {

        if(this.props.user.loggingIn || this.props.threads.loading || this.props.users.loading) return(<Loading />);
        if (this.props.comments.error)  return(<ErrorNotice error={this.props.comments.error} />);
        if (this.props.threads.error)  return(<ErrorNotice error={this.props.threads.error} />);
        if (this.props.users.error)  return(<ErrorNotice error={this.props.users.error} />);

        return(
            <Row className="justify-content-center m-0" style={{backgroundColor:"#EFF6FE"}}>
                    {this.props.threads.threads.map(e=>{
                        if(e.id==this.props.match.params.id)return <Col xs={12} key={e.id} className={`mt-2 ${style.threadText}`}>
                            <Col><h2>{e.title}</h2></Col>
                            <Col>{e.content}</Col>
                        </Col>
                    })
                    }

                <Col xs={12} className='mt-4'>
                    <Button as={Link} to={`/new_comment/${this.props.match.params.id}`} type='button' size='sm' block variant='outline-blue' >Add comment</Button>
                </Col>
                <Col xs={12}>
                    {this.props.comments.comments.map(e=>{
                        if(e.threadId === Number(this.props.match.params.id)){
                            return <Comment key={e.id +'c'} comment={e} handleDelete={this.handleDelete} user={this.props.user}/>

                        }}
                    )}
                </Col>
                <Col xs={12} md={4} className='mt-4'>
                    <Button type='submit' size='sm' block variant='outline-blue' className="mb-2" onClick={this.handleSubmit} disabled={this.props.comments.comments.length%10}>Load more comments</Button>
                </Col>

            </Row>

        );
    }
}



const ListComments = connect(mapStateToProps, actions)(ConListComment);
export default ListComments