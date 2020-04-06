import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {checkLogin, logout} from "../actions/authAction";
import {fetchProfile, clearProfile} from "../actions/userAction";
import {connect} from "react-redux";
import Loading from "../components/loading";
import ErrorNotice from "../components/error";
import style from "../styles/threadAndComments.module.css"
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import del from "../utils/delete";
import auth from "../utils/auth";



const mapStateToProps = state =>{
    return{
        user: state.authReducer,
        userP:state.userReducer.user,
        comments: state.userReducer.comments,
        threads: state.userReducer.threads,
        loading: state.userReducer.loading,
        error: state.userReducer.error
    }
};

const actions = {
    checkLogin,
    fetchProfile,
    clearProfile,
    logout

};


class ConProfile extends React.Component{

    componentDidMount() {
        if(!this.props.user.loggedIn)this.props.checkLogin();
        this.props.fetchProfile(this.props.match.params.id, this.props.user.token)

    }
    componentWillUnmount() {
        this.props.clearProfile()
    }
    deleteProfile = async () =>{
        const certify = window.confirm('Are you sure you want to delete the profile?');
        if(certify){
            const user = await del.user(this.props.user.token);
            if(user.deleted){
                auth.signOut();
                this.props.logout();
                this.props.history.push('/')
            } else alert('Error while deleting the user')
        }
    };


    render() {
        if(this.props.user.loggingIn || this.props.loading) return(<Loading />);
        else if (!this.props.user.loggingIn && !this.props.user.loggedIn) return(<ErrorNotice error={'You must be logged in to see this page'} />);
        else if (this.props.error) return(<ErrorNotice error={this.props.error} />);
        let username=null;
        if(this.props.userP.id !== undefined){
            username = this.props.userP.username
        }else if(Object.keys(this.props.userP).length){
            username = this.props.userP
        }


        return(
            <Row className="justify-content-center m-0" style={{backgroundColor:"#EFF6FE"}}>


                <Col xs={12} className={`mt-2 ${style.threadText}`}>
                    <Col><h1>{username}</h1></Col>

                </Col>
                {Number(this.props.match.params.id)===this.props.user.id?<Col xs={12} className='mt-4 d-flex justify-content-around'>
                    <Col xs={4}><Button as={Link} to={`/edit_profile/${this.props.user.id}`} type='button' size='sm' block variant='outline-blue' >Edit profile</Button></Col>
                    <Col xs={4}><Button  type='button' size='sm' block variant='outline-blue' onClick={()=>this.deleteProfile()} >Delete profile</Button></Col>
                </Col>:null}
                <Col xs={6}>
                    <h3 style={{textAlign:"center"}}  className={style.profile}>Threads</h3>
                    {this.props.threads.map(e=>{
                        return (
                            <Row className={` m-0 ${style.threadBox} $`} key={e.id+'c'}>

                                <Col as={Link} to={`/thread/${e.id}`} className={`${style.threadName}`} md={8} xs={12}>
                                    <h4 className={style.profile}>{e.title}</h4>
                                </Col>
                                <Col md={4} xs={12} className={style.userAndTime}>
                                    <Col className={style.dateAndTime}>
                                        {e.updatedAt}
                                    </Col>
                                </Col>
                            </Row>)
                    })}
                </Col>
                <Col xs={6}>
                    <h3 style={{textAlign:"center"}}  className={style.profile}>Comments</h3>
                    {this.props.comments.map(e=>{
                        return (
                            <Row className={` m-0 ${style.threadBox}`} key={e.id+'c'}>
                            <Col as={Link} to={`/thread/${e.threadId}`} className={style.threadName} md={8} xs={12}>{e.comment}</Col>
                            <Col md={4} xs={12} className={style.userAndTime}>
                                <Col className={style.dateAndTime}>
                                    {e.updatedAt}
                                </Col>
                            </Col>
                        </Row>)
                    })}
                </Col>



            </Row>
        );
    }
}

const Profile = connect(mapStateToProps,actions)(ConProfile);
export default Profile