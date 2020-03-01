import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

class UserShow extends React.Component {
    constructor() {
        super() 
        this.state = {
            user: {},
            posts: []
        }
    }
    componentDidMount(){
        console.log(this.props)
        const id = this.props.match.params.id
        console.log('priyanka', id)
        axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {
                const user = response.data
                console.log(user, 'priya')
                this.setState({user})
            })
            .catch(err => {
                alert(err)
            })
        axios.get(`http://jsonplaceholder.typicode.com/posts?userid`)
            .then(response => {
                const all_posts = response.data
                // console.log('cols',all_posts)
                const posts = all_posts.filter(post => {
                    return post.userId == id
                })
                this.setState({posts},()=>{
                    //console.log(this.state.posts)
                })
            })
            .catch(err => {
                alert(err)
            })
    }
    render() {
        return (
            <div>
                <h3>Selected User: {this.state.user.name}</h3>
                <h4>Posts written by user: {this.state.posts.length}</h4>
                <ul>
                    {
                        this.state.posts.map(post => {
                            return <li key={post.id}> <Link to={`/posts/${post.id}`}>{post.title}</Link></li>
                        })
                    }
                </ul>

            </div>
        )
    }
}

export default UserShow