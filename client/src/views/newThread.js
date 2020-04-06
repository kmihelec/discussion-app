import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import{ connect} from "react-redux";
import {fetchThreads, addThread} from "../actions/threadAction"
import {checkLogin} from "../actions/authAction"

import ErrorNotice from "../components/error";
import Loading from "../components/loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import save from "../utils/new";
import style from "../styles/form.module.css";

const mapStateToProps = state =>{
    return{
        user: state.authReducer,
        threads: state.threadReducer,

    }
};

const actions = {
    checkLogin,
    fetchThreads,
    addThread
};



class ConNewThread extends React.Component{
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
        if(!this.props.threads.loaded)this.props.fetchThreads(0);

    }

    handleChange(e){
        this.setState({[e.target.id]:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();

        const user = this.props.user.id;
        const {title,comment} = this.state;
        const newThread = await save.thread(title, comment, user, this.props.user.token, this.props.user.user);
        if(newThread.error) return alert(newThread.error);
        this.props.addThread(newThread);
        this.setState({comment:""});
        this.props.history.push('/')

    }

    render() {
        if(this.props.user.loggingIn || this.props.threads.loading) return(<Loading />);
        else if (!this.props.user.loggingIn && !this.props.user.loggedIn) return(<ErrorNotice error={'You must be logged in to see this page'} />);
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

                        <Button type='submit'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}



const NewThread = connect(mapStateToProps, actions)(ConNewThread);
export default NewThread