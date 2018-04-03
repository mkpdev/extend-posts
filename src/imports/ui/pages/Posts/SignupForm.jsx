import './App.css';
import axios from 'axios';
import React from 'react';
import Notification, {notify} from 'react-notify-toast';

export default class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSignupClick = this.handleSignupClick.bind(this);
  }
  async handleSignupClick(event){
    event.preventDefault();
    const user = this.refs.u_name.value;
    const pass1 = this.refs.pass1.value;
    const pass2 = this.refs.pass2.value;
    if(!user || !pass1 || !pass2){
      return notify.show('Please fill in all the required fields carefully!', 'info', 2000);
    }
    if(pass1 === pass2){
      const response = await axios.post('http://localhost:8080/signup',
      {
        username: user,
        password: pass1
      })
      .then(res => {return(res.data)})
      .catch(err => console.log(err));
      this.refs.u_name.value = '';
      this.refs.pass1.value = '';
      this.refs.pass2.value = '';
      notify.show(response, 'success', 2000);

      setTimeout(() => {this.props.history.push('/')},
        2000);
    }else{
      return notify.show('Passwords do not match!', 'warning', 2000);

    }
  }
  render() {
    return(
      <div>
        <div>
          <Notification/>
          <form className='signupForm text-center'>
            <h2><strong>Signup</strong></h2>
            <br/>
            <br/>
            <label>Username:</label>
            &emsp;
            <input type='text' className='form-control' name='username' placeholder='Username' ref='u_name' required/>
            <br/>
            <br/>
            <label>Password:</label>
            &emsp;
            <input type='password' className='form-control' name='password' placeholder='Password' ref='pass1' required/>
            <br/>
            <br/>
            <label>Confirm Password:</label>
            &emsp;
            <input type='password' className='form-control' name='password' placeholder='Retype Password' ref='pass2' required/>
            <br/>
            <br/>
            <button type='submit' className='btn btn-warning form-control' onClick={this.handleSignupClick} >Signup</button>
          </form>
         </div>
      </div>
    );
  }
}