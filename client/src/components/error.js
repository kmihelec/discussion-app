import React from "react";
import Alert from "react-bootstrap/Alert";


const ErrorNotice = (props) =>{
    return(
        <Alert variant='danger' className='mt-lg-5'>
            <Alert.Heading>Error!</Alert.Heading>
            <p>{props.error}</p>

        </Alert>
    )
};

export default ErrorNotice;