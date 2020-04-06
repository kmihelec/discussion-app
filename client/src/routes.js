import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from "./views/home";
import ListComments from "./views/listComments";
import Register from "./views/register";
import Login from "./views/login";
import NewThread from "./views/newThread";
import EditThread from "./views/editThread";
import NewComment from "./views/newComment";
import EditComment from "./views/editComment";

import EditProfile from "./views/editProfile";
import Profile from "./views/profile";
import NotFound from "./views/notFound";



const Routes =() =>{
    return(
        <Switch>
            <Route exact path ='/' component={Home}/>
            <Route path='/thread/:id' component={ListComments} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/new_thread' component={NewThread} />
            <Route exact path='/edit/:threadId' component={EditThread} />
            <Route path='/new_comment/:threadId' component={NewComment} />
            <Route exact path='/edit/:threadId/:commentId' component={EditComment} />
            <Route path ='/edit_profile' component={EditProfile} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/*' component={NotFound} />
        </Switch>
    )
};

export default Routes