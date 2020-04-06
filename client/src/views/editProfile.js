import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import edit from "../utils/edit";
import style from "../styles/form.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {checkLogin, logout, userLogin} from "../actions/authAction";
import {connect} from "react-redux";
import Loading from "../components/loading";
import ErrorNotice from "../components/error";
import auth from "../utils/auth";

const mapStateToProps = state =>{
    return{
        user: state.authReducer
    }
};

const actions = {
    checkLogin,
    userLogin,
    logout
};

class ConEditProfile extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            user:"",
            email:"" ,
            currentPass:"",
            newPass:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if(!this.props.user.loggedIn)this.props.checkLogin();
    }

    handleChange(e){
        this.setState({[e.target.id]:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        const {user, email, currentPass, newPass} = this.state;

        try{
            const edited =  await edit.user(user, email, currentPass, newPass, this.props.user.token);
            if(edited.error) return alert(edited.error);
            if(edited.updated){
                auth.signOut();
                this.props.logout();
                await this.props.userLogin(user, newPass);
                alert('Changes saved!');
                this.setState({user:"", email:"", pass:"", confirmPass:""})
                this.props.history.push('/');
            }
        }catch (e) {
            alert('Unable to edit data, check console log for more info');
            console.log(e);
        }
    }

    render() {
        if(this.props.user.loggingIn) return(<Loading />);
        else if (!this.props.user.loggingIn && !this.props.user.loggedIn) return(<ErrorNotice error={'You must be logged in to see this page'} />);
        else if (this.props.user.error) return(<ErrorNotice error={this.props.user.error} />);
        return(
            <Row className={style.forms}>
                <Col className={style.formBox}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId='user'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control  type='text' placeholder='Username' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control  type='email' placeholder='Email' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='newPass'>
                            <Form.Label>New password:</Form.Label>
                            <Form.Control  type='password' placeholder='New Password' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='currentPass'>
                            <Form.Label>Current password:</Form.Label>
                            <Form.Control required type='password' placeholder='Current password' onChange={this.handleChange} />
                        </Form.Group>
                        <Button type='submit'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}
const EditProfile = connect(mapStateToProps, actions)(ConEditProfile);
export default EditProfile