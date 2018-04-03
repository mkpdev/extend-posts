import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class PostCreate extends Component{
  constructor(props){
    super(props);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.state = {
      post: {}
    }
    this.postTypes = ['Nature', 'Psychology', 'Music', 'Programming', 'Project Management', 'Other'];
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    const id = this.props.match.params.id;
    const res = await axios.get(`http://localhost:8080/posts/${id}`)
    this.setState({
      post: res.data
    });
  }
  
  handleChange(ev) {
    this.setState({ post: ev.target.value });
  }

  async handleSubmitClick(){
    const id = this.props.match.params.id;
    const newPostType = this.refs.postType.value;
    const post = await axios.put(`http://localhost:8080/posts/${id}`,
    {
      newType: newPostType
    })
    .then(res => {return res.data})
    .catch(err => {console.log(err)})
    if(post){
      this.props.history.push('/posts/view');
    }
    this.setState({
      post
    });
  }

  render(){

    const { post } = this.state;
    return(
      <div>
        <h2 className='text-center'>Edit a post</h2>
        <hr/>
          <select ref='postType' name="Post Type" className='form-control' onChange={this.handleChange} value={post.type}>
            { this.postTypes.map((pt) => {
                return(<option key={pt} value={pt}>{pt}</option>)
              })
            }
          </select>
          <br/>
          <button className='btn btn-success' onClick={this.handleSubmitClick}>Save</button>
          &emsp;
          <Link to={'/posts/view'} className='btn btn-warning'>Cancel</Link>
      </div>
    );
  }
}