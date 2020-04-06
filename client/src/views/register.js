import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import save from '../utils/new';
import style from "../styles/form.module.css";
import {connect} from "react-redux";
import {userLogin} from "../actions/authAction";

const actions = {
    userLogin
};

class ConRegister extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            user:"",
            email:"" ,
            pass:"",
            confirmPass:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        let validate = false;


        this.state.pass === this.state.confirmPass ? validate = true : alert('Password values do not match!');
        if(validate){
            const {user, email, pass} = this.state;
            const newUser = await save.user(user,email,pass);
            if(newUser.error) return alert(newUser.error);
            alert('Registered successfully!');
            await this.props.userLogin(newUser.username,pass);
            this.setState({user:"", email:"", pass:"", confirmPass:""});
            this.props.history.push('/');
        }
    }

    render() {
        return(
            <Row className={style.forms}>
                <Col className={style.formBox}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId='user'>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control required type='text' placeholder='Username' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control required type='email' placeholder='Email' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='pass'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control required type='password' placeholder='Password' onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId='confirmPass'>
                            <Form.Label>Confirm password:</Form.Label>
                            <Form.Control required type='password' placeholder='Confirm password' onChange={this.handleChange} />
                        </Form.Group>
                        <Button type='submit'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}

const Register = connect(null,actions)(ConRegister);
export default Register