import Spinner from "react-bootstrap/Spinner";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Loading = () =>{
    return(
        <Row style={{margin:'2em'}}>
            <Col className='text-lg-center' >
                <Spinner animation="border" variant="info" role='status' style={{width:'5rem', height:'5rem'}}><span className='sr-only'>Loading..</span></Spinner>
                <div style={{margin:'1em', font:'3em bold'}}>Loading...</div>
            </Col>


        </Row>
    )
};
export default Loading