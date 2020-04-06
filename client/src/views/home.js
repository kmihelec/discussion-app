import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import{ connect} from "react-redux";
import {fetchThreads} from "../actions/threadAction"
import {checkLogin} from "../actions/authAction"
import {Link} from "react-router-dom"
import ErrorNotice from "../components/error";
import Loading from "../components/loading";
import Button from "react-bootstrap/Button";
import Thread from "../components/thread";
import del from "../utils/delete";

const mapStateToProps = state =>{
    return{
        user: state.authReducer,
        threads: state.threadReducer,
    }
};

const actions = {
    fetchThreads,
    checkLogin
};



class ConHome extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            offset:10
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

   componentDidMount() {
        if(!this.props.user.loggedIn)this.props.checkLogin();
        if(!this.props.threads.loaded)this.props.fetchThreads(0);
    }

    handleSubmit(){
       this.props.fetchThreads(this.state.offset);
       this.setState({offset:this.state.offset+10})
    }

    async handleDelete(id,token){
        const d = await del.thread(id, token);
        if(d.deleted){
            this.props.deleteComment(id);
            alert('Comment deleted!');
        } else alert('Unable to delete the comment')
    }
    render() {
        if(this.props.user.loggingIn || this.props.threads.loading) return(<Loading />);
        if (this.props.threads.error)  return(<ErrorNotice error={this.props.threads.error} />);
        return(
                <Row className="justify-content-center m-0" style={{backgroundColor:"#EFF6FE"}}>
                    <Col xs={12} className='mt-4'>
                        <Button as={Link} to='/new_thread' type='button' size='lg' block variant="outline-blue">New thread</Button>
                    </Col>
                    <Col xs={12}>
                        {this.props.threads.threads.map(e=>{return(
                            <Thread key={e.id+'t'} thread={e} user={this.props.user} handleDelete={this.handleDelete} />
                        )})}
                    </Col>

                    <Col xs={12} md={4} className='mt-4'>
                        <Button type='submit' size='sm' block variant='outline-blue' className="mb-2" onClick={this.handleSubmit} disabled={this.props.threads.threads.length%10}>Load more threads</Button>
                    </Col>

                </Row>

        );
    }
}



const Home = connect(mapStateToProps, actions)(ConHome)
export default Home