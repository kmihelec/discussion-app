import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {checkLogin} from "../actions/authAction";
import {editThread, fetchThreads} from "../actions/threadAction";
import edit from "../utils/edit";
import Loading from "../components/loading";
import ErrorNotice from "../components/error";
import style from "../styles/form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";

const mapStateToProps = state =>{
    return{
        user: state.authReducer,
        threads:state.threadReducer
    }
};

const actions = {
    checkLogin,
    editThread,
    fetchThreads
};

class ConEditThread extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            title:"",
            comment:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(!this.props.user.loggedIn)this.props.checkLogin();
        if(!this.props.threads.loaded)this.props.fetchThreads(0, this.props.match.params.threadId)

    }

    handleChange(e){
        this.setState({[e.target.id]:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        const threadId = this.props.match.params.threadId;
        const {comment, title} = this.state;
        const editThread = await edit.thread(threadId, title, comment, this.props.user.token);
        if(editThread.error) return alert(editThread.error);
        this.props.editThread(editThread);
        this.props.history.push('/')

    }

    render() {
        if(this.props.user.loggingIn || this.props.threads.loading) return(<Loading />);
        else if (!this.props.user.loggingIn && !this.props.user.loggedIn) return(<ErrorNotice error={'You must be logged in to see this page'} />);
        else if (this.props.threads.error) return(<ErrorNotice error={this.props.comments.error} />);
        return(
            <Row className={style.forms}>
                <Col className={style.formBox}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId='title'>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control required type='text' placeholder='Title' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='comment'>
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control required as='textarea' rows='4' placeholder='Enter comment...' onChange={this.handleChange} />
                        </Form.Group>

                        <Button type='submit' variant='header-button'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}
const EditThread = connect(mapStateToProps,actions)(ConEditThread);

export default EditThread