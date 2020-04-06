import React from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import auth from "../utils/auth";
import {connect} from "react-redux";
import {logout, userLogin} from "../actions/authAction";
import style from "../styles/form.module.css"

const mapStateToProps = state =>{
    return{
        error: state.authReducer.error
    }
};

class ConnectLogin extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            user:"",
            pass:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.id]:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        const {user, pass} = this.state;
        await this.props.userLogin(user,pass);
        if(this.props.error) return alert(this.props.error);

        this.props.history.push('/')
    }

    componentDidMount() {
        auth.signOut();
        this.props.logout();
    }

    componentWillUnmount() {
        this.setState({user:"",pass:""});
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
                        <Form.Group controlId='pass'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control required type='password' placeholder='Password' onChange={this.handleChange} />
                        </Form.Group>
                        <Button type='submit' variant='header-button'>Submit</Button>

                    </Form>
                </Col>
            </Row>
        );
    }
}
const mapDispatchToProps = {
    userLogin,
    logout
};

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectLogin);
export default Login