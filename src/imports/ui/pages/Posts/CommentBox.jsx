import React, {Component} from 'react';
import axios from 'axios';

export default class CommentBox extends Component{
  constructor(props){
    super(props);
    this.state = {Comments: [], currentUser: {username: ''}};
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }
  async componentWillMount(){
    const id = this.props.postId;
    const comments = await axios.get(`http://localhost:8080/comments/${id}`)
    .then(res => {return res.data});
    this.setState({
      Comments: comments
    });
    const user = await axios.get('http://localhost:8080/get-user')
    .then(res => {return (res.data)});
    this.setState({
      currentUser: user
    });
  }
  handleDeleteClick(commentId){
    console.log(commentId);
    const comment = {
      id: commentId
    };
    axios.delete(`http://localhost:8080/comments/${comment.id}`).then(res => {console.log(res.data)});
    window.location.reload();
  }

  handleSubmitClick(e){
    // e.preventDefault();
    const uname = this.refs.uname.value;
    const comment = this.refs.comment.value;
    const postId = this.props.postId;
    if(!uname){
      return alert('Username is a required field!');
    }
    if(!comment){
      return alert('You cant post an empty comment!');
    }
    axios.post('http://localhost:8080/comments',
    {
      createdAt: new Date(),
      text: comment,
      user: this.props.currentUser._id,
      post: postId
    }).then(res => {console.log(res.data)});
    this.refs.uname.value = '';
    this.refs.comment.value = '';
  }
  render(){

    const { currentUser } = this.state;
    return(
      <div>
        <label>Comments:</label>
        <div className='form-control well' id='comments'>
        {
          this.state.Comments.map((comment, index) =>
            <div key={index}>
              <strong>{comment.user.username}</strong>
              <br/>
              <p>{comment.text}</p>
              <small>{comment.createdAt}</small>
              <br/>
              {
                (currentUser.username === comment.user.username || currentUser.username === this.props.post.author) ? 
                  <button type='submit' className='btn btn-xs' onClick={this.handleDeleteClick.bind(this, comment._id)}><small>Delete</small></button>
                  : <p></p>
              }
              <br/>
              <br/>
            </div>
          )
        }
        </div>
        <br/>
        <form onSubmit={this.handleSubmitClick}>
          <label>Username:*</label>
          <input ref='uname' type='text' className='form-control' value={currentUser.username} disabled required/>
          <br/>
          <label>Comment:</label>
          <textarea ref='comment' row='5' className='form-control'></textarea>
          <br/>
          <button className='form-control btn btn-info btn-md'>Submit</button>
        </form>
      </div>
    );
  }
}