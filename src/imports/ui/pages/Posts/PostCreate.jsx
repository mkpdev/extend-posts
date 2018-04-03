import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Notification, {notify} from 'react-notify-toast';


export default class PostCreate extends Component{
  constructor(props){
    super(props);
    this.state = {currentUser: {}};
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.postTypes = ['Nature', 'Psychology', 'Music', 'Programming', 'Project Management', 'Other'];
  }
  
  async componentWillMount(){
    const user = await axios.get('http://localhost:8080/get-user')
    .then(res => {return (res.data)});
    this.setState({
      currentUser: user
    });
  }

  componentDidMount(){
    if(this.state.currentUser.length === 0){
      this.props.history.push('/');
    }
  }

  handleSubmitClick(e){
    e.preventDefault();
    if(!this.refs.email.value){
      return alert('Email is a required field!')
    }
    const author = this.refs.email.value;
    const postType = this.refs.postType.value;
    axios.post('http://localhost:8080/posts',
    {
      views: 0,
      createdAt: new Date(),
      type: postType,
      author:  author
    }).then(res => notify.show(res.data, 'success', 2000));
  }

  render(){
    return(
      <div>
        <Notification/>
        <h2 className='text-center'>Create a post</h2>
        <hr/>
          <label>Username:*</label>
          <input ref='email' className='form-control' disabled value={this.state.currentUser.username}/>
          <br/>
          <select ref='postType' name="Post Type" className='form-control'>
            { this.postTypes.map((pt) => {
                return(<option key={pt} value={pt}>{pt}</option>)
              })
            }
          </select>
          <br/>
          <button className='btn btn-primary' onClick={this.handleSubmitClick}>Submit</button>
          <br/>
          <br/>
          <Link to={'/posts/view'} className='link'>View all posts</Link>
          <br/>
          <Link to={'/'} className='link'>Logout</Link>
      </div>
    );
  }
}