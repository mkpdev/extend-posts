import CommentBox from './CommentBox.jsx';
// import PostForm from './CommentBox.jsx';
// import App from './App.js';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class PostView extends Component{
  constructor(props){
    super(props);
    this.state = {post: [], currentUser: {}};
    // this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  async componentWillMount(){
    const user = await axios.get('http://localhost:8080/get-user')
    .then(res => {return (res.data)});
    this.setState({
      currentUser: user
    });
    // console.log(user);
  }
  async componentDidMount(){
    const id = this.props.match.params.id;
     const Post = await axios.put('http://localhost:8080/posts/incrementViews', {
      id: id
    })
    .then(res => {return res.data})
    .catch(err => {console.log(err)})
    this.setState({
      post: Post
    });
  }
  render(){
    return(
      <div>
        <h2 className='text-center'>View Post</h2>
        <hr/>
        <h3>{this.state.post.type}</h3>
        <h4><strong>Views: </strong>{this.state.post.views}</h4>
        <br/>
        <CommentBox currentUser={this.state.currentUser} postId={this.props.match.params.id} post={this.state.post}/>
        <hr/>
        <Link to={'/posts/view'} className='link'>View all posts</Link>
        <br/>
        <Link to={'/'} className='link'>Logout</Link>
      </div>
    );
  }
}
