import './App.css';
import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import Notification, {notify} from 'react-notify-toast';

export default class LoginForm extends React.Component {
  constructor(props){
  	super(props);
  	this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  async handleLoginClick(event){
  	event.preventDefault();
  	const user = this.refs.u_name.value;
  	const pass = this.refs.pssword.value;
    if(!user || !pass){
      return notify.show('Please fill in all the required fields carefully!', 'warning', 2000);
    }else{
      const authenticatedUser = await axios.post('http://localhost:8080/Login',
        {
          'username': user,
          'password': pass
        })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log('error in login' + err));
      if(authenticatedUser){
        this.refs.u_name.value = '';
        this.refs.pssword.value = '';
        notify.show('Login success', 'success', 2000);
        setTimeout(() => {this.props.history.push(`/home/${authenticatedUser._id}`)},
        2000);
      }
      notify.show('Invalid username or password', 'warning', 2000);

    }
  }
  render() {
  	return(
  		<div>
        <Notification/>
		    <div className='text-center'>
			    <form className='loginForm'>
						<h2><strong>Login</strong></h2>
						<br/>
						<br/>
						<label>Username:</label>
						&emsp;
						<input type='text' className='form-control' placeholder='Username' ref='u_name' required/>
						<br/>
						<br/>
						<label>Password:</label>
						&emsp;
						<input type='password' className='form-control' placeholder='Password' ref='pssword' required/>
						<br/>
						<br/>
						<button type='submit' className='btn btn-info form-control' onClick={(e) => this.handleLoginClick(e)}>Login</button>
			    </form>
          <br/>
          New user? click <Link to={'/signup'} className='link'>here </Link>to sign up
			   </div>
  		</div>
  	);
  }
}