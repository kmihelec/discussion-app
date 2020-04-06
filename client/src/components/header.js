import React from "react";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import LoggedIn from './loggedIn';
import Col from "react-bootstrap/Col";


const mapStateToPros = state => {
    return{
        loggedIn:state.authReducer.loggedIn, user:state.authReducer

    }
};

const ConnectedHeader = (props) =>{
    return (
        <header>
            <Navbar bg='header' expand='lg'  variant="dark">
                <Col className="d-flex justify-content-end">
                    <Navbar.Brand as={Link} to='/'>
                        Brand
                    </Navbar.Brand>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                    <LoggedIn username={props.user.user}  id={props.user.id} auth={props.loggedIn} />
                </Col>
            </Navbar>
        </header>
    )
};
const Header = connect(mapStateToPros)(ConnectedHeader);
export default Header;