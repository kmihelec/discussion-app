import React from "react";
import Row from "react-bootstrap/Row";
import edit from '../utils/edit';
import {editComment, fetchComments} from '../actions/commentAction';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {checkLogin} from "../actions/authAction";
import {connect} from "react-redux";
import Loading from "../components/loading";
import ErrorNotice from "../components/error";
import style from "../styles/form.module.css";
import Col from "react-bootstrap/Col";


const mapStateToProps = state =>{
    return{
        user: state.authReducer,
        comments:state.commentReducer
    }
};

const actions = {
    checkLogin,
    editComment,
    fetchComments
};

class ConEditComment extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            comment:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(!this.props.user.loggedIn)this.props.checkLogin();
        if(!this.props.comments.loaded)this.props.fetchComments(0, this.props.match.params.threadId)
        console.log(this.props.match)
    }

    handleChange(e){
        this.setState({comment:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        const commentId = this.props.match.params.commentId;
        const {comment} = this.state;
        console.log(commentId)
        const editComment = await edit.comment(commentId, comment, this.props.user.token);
        if(editComment.error) return alert(editComment.error);
        this.props.editComment(editComment);
        this.props.history.push('/')

    }

    render() {
        if(this.props.user.loggingIn || this.props.comments.loading) return(<Loading />);
        else if (!this.props.user.loggingIn && !this.props.user.loggedIn) return(<ErrorNotice error={'You must be logged in to see this page'} />);
        else if (this.props.comments.error) return(<ErrorNotice error={this.props.comments.error} />);
        return(
            <Row className={style.forms}>
                <Col className={style.formBox}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId='user'>
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control required as='textarea' rows='4' placeholder='Enter new comment...' onChange={this.handleChange} />
                        </Form.Group>

                        <Button type='submit' variant='header-button'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}
const EditComment = connect(mapStateToProps,actions)(ConEditComment)
export default EditComment