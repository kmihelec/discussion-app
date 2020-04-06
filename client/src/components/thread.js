import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import React from "react";
import EditDelete from "./editDelete";
import style from "../styles/threadAndComments.module.css";

const Thread = ({thread,user,handleDelete}) =>{
    return(
        <Row className={` m-0 ${style.threadBox}`}>
            <Col as={Link} to={`/thread/${thread.id}`} className={style.threadName} md={8} xs={12}>
                <h4>{thread.title}</h4>
            </Col>
            {thread.userId === user.id?
                <EditDelete token ={user.token} handleDelete={handleDelete} url={`/edit/${thread.id}`} id={thread.id} />
                :null}
            <Col md={2} xs={12} className={style.userAndTime}>
                <Col xs={12} as={Link} to={`/profile/${thread.userId}`} className={style.username}>
                    {thread.User.username}
                </Col>
                <Col className={style.dateAndTime}>
                    {thread.updatedAt}
                </Col>
            </Col>
        </Row>
    )
};

export default Thread