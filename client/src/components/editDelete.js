import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import React from "react";
import style from "../styles/threadAndComments.module.css";


const EditDelete =({token, handleDelete, url, id})=>{
    return(
    <Col md={2} xs={12} className={style.editDeleteButtons}>

            <Button as={Link} to={url} type='button' size='sm' block variant='edit' className="mt-1">Edit</Button>

            <Button onClick={()=>handleDelete(id,token)} type='button' size='sm' block variant='delete' className="mb-1">Delete</Button>

    </Col>)
};

export default EditDelete