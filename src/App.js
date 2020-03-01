import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'

import Home from './Home'
import Users from './Users'
import Posts from './Posts'
import UserShow from './UserShow'
import PostsShow from './PostsShow'

function App(props) {
    return (
        <BrowserRouter>
            <div>
                <h1><Link to="/">Home | </Link><Link to="/users">Users | </Link><Link to="/posts">Posts </Link></h1>

                <Route path="/" component={Home} exact={true}></Route>
                <Route path="/users" component={Users} exact={true}></Route>
                <Route path="/posts" component={Posts} exact={true}></Route>
                <Route path="/users/:id" component={UserShow}></Route>
                <Route path="/posts/:id" component={PostsShow}></Route>
                
            </div>
        </BrowserRouter>
    )
}

export default App