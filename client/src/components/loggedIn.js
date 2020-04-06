import React from 'react';
import Button from "react-bootstrap/Button";

import {Link} from 'react-router-dom';
import style from '../styles/header.module.css'
const LoggedIn =(props)=>{
    if(props.auth){
        return(
            <>
            <div className={`${style.text} d-flex align-items-center `}>Hello, <Link to={`/profile/${props.id}`} className={`style.text`}>{props.username}</Link></div>
                <Link to='/login'><Button variant='header-button'>Logout</Button></Link>
            </>
        )
    }
    else{
        return(
            <>
                <Link to='/register'><Button variant='header-button' className='mr-1'>Register</Button></Link>
                <Link to='/login'><Button variant='header-button'>Sign in</Button></Link>
            </>
        )
    }
};

export default LoggedIn