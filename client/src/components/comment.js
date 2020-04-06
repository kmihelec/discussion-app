import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import React from "react";
import style from "../styles/threadAndComments.module.css";


import EditDelete from "./editDelete";

const Comment = ({comment, handleDelete, user}) =>{
    return(
            <Row className={`m-0 ${style.commentBox}`} >
                <Col md={8} xs={12}>{comment.comment}</Col>
                {comment.userId === user.id?
                    <EditDelete token ={user.token} handleDelete={handleDelete} url={`/edit/${comment.threadId}/${comment.id}`} id={comment.id} />
                :null}

                <Col md={2} xs={12} className={style.userAndTime}>
                    <Col as={Link} to={`/profile/${comment.userId}`} className={style.username}>
                        {comment.User.username}
                    </Col>
                    <Col className={style.dateAndTime}>
                        {comment.updatedAt}
                    </Col>
                </Col>
            </Row>

    )
};

export default Comment