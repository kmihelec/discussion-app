import React from "react";
import Row from "react-bootstrap/Row";
import save from '../utils/new';
import {addComment, fetchComments} from '../actions/commentAction';
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
    addComment,
    fetchComments
};

class ConNewComment extends React.Component{
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

    }

    handleChange(e){
        this.setState({comment:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        const threadId = this.props.match.params.threadId;
        const user = this.props.user.id;
        const {comment} = this.state;
        const newComment = await save.comment(comment,user, threadId, this.props.user.token, this.props.user.user);
        if(newComment.error) return alert(newComment.error);
        this.props.addComment(newComment);
        console.log(newComment)
        this.setState({comment:""});
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
                        <Form.Group controlId='comment'>
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control required as='textarea' rows='4' placeholder='Enter new comment...' onChange={this.handleChange} />
                        </Form.Group>

                        <Button type='submit'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}
const NewComment = connect(mapStateToProps,actions)(ConNewComment);
export default NewComment