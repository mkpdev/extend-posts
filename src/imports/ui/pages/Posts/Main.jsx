import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import PostCreate from './PostCreate.jsx';
import PostList from './PostList.jsx';
import PostEdit from './PostEdit.jsx';
import PostView from './PostView.jsx';
import SignupForm from './SignupForm.jsx';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/posts/view'} component={PostList}/>
          <Route exact path={'/'} component={LoginForm}/>
          <Route exact path={'/signup'} component={SignupForm}/>
          <Route exact path={'/home/:id'} component={PostCreate}/>
          <Route exact path={'/edit/:id'} component={PostEdit}/>
          <Route exact path={'/posts/view/:id'} component={PostView}/>
        </Switch>
      </Router>
    );
  }
}
