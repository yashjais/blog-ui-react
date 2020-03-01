import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

class PostsShow extends React.Component  {
    constructor() {
        super()
        this.state = {
            post: {},
            user: {},
            comments: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        // console.log('id',id)
        
        axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                const post = response.data
                // console.log('post',post)
                this.setState({post})
                const user_Id = post.userId
                axios.get(`http://jsonplaceholder.typicode.com/users/${user_Id}`)
                    .then(response => {
                        const user = response.data
                        this.setState({user})
                        axios.get(`http://jsonplaceholder.typicode.com/comments`)
                            .then(response => {
                                const comments_all = response.data
                                const comments = comments_all.filter(comment => comment.postId === user_Id)
                                this.setState({comments})
                            })
                    })
            })
            // console.log('before axi call',user_Id)
        
    }
    render() {
        // console.log('inside ren',this.state.user)
        return (
            <div>
                <h1>Post Number: {this.state.post.id}</h1>
                <h3>Title: {this.state.post.title}</h3>
                <h3>Body: {this.state.post.body}</h3>
                <h3>Post written by: {this.state.user.name}</h3>
                <br/>
                <h3>Comments:</h3>
                <ul>
                    {
                        this.state.comments.map(comment => {
                            return <li key={comment.id}>{comment.body}</li>
                        })
                    }
                </ul>
                <br/>
                <p><Link to={`/users/${this.state.user.id}`}>More posts from {this.state.user.name}</Link></p>
            </div>
        )
    }
}

export default PostsShow