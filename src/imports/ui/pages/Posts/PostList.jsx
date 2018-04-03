import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class PostList extends Component{
  constructor(props){
    super(props);
    this.state = {posts: [], currentUser: {}};
    // this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  async componentDidMount(){
    const Response = await axios.get('http://localhost:8080/posts', function(err, response){
      if(err){ return console.log(err); }
      return (response);
    });
    const Posts = Response.data;
    this.setState({
      posts: Posts
    });
    const user = await axios.get('http://localhost:8080/get-user')
    .then(res => {return (res.data)});
    this.setState({
      currentUser: user
    });
  }
  handleDeleteClick(id){
    axios.delete(`http://localhost:8080/posts/${id}`)
    .then(res => console.log(res.data));
    window.location.reload();
  }
  render(){
    return(
      <div>
        <h2 className='text-center'>Recently Created Posts</h2>
        <hr/>
          <table className='table'>
            <thead>
              <tr>
                <td><h3>#</h3></td>
                <td><h3>Post type</h3></td>
                <td><h3>Actions</h3></td>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((el, index) => <tr key={index}>
                <td>{index + 1}</td>
                <td><h4><Link to={'/posts/view/' + el._id} className='postType'>{el.type}</Link></h4></td>
                <td>
                {
                  (this.state.currentUser.username === el.author) &&
                    <div>
                      <button className='btn btn-info btn-sm'><Link to={'/edit/' + el._id}>Edit</Link></button>
                      &emsp;
                      <button className='btn btn-info btn-sm' onClick={this.handleDeleteClick.bind(this, el._id)}>Delete</button>
                    </div>                
                }
                </td>
              </tr>)}
            </tbody>
          </table>
          <Link to={'/home/:id'} className='link'>Create a new post</Link>
          <br/>
          <Link to={'/'} className='link'>Logout</Link>

      </div>
    );
  }
}