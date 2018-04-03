const mongoose = require('mongoose');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const User = require('./db/user/schema.js');

const cors = require('cors');

const session = require('client-sessions');

// const usersService = require('./server/services/users.service');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const post_controller = require('./server/controllers/post.controller');
const comment_controller = require('./server/controllers/comment.controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 1 * 60 * 1000,
}));

mongoose.connect('mongodb://localhost/posts', function (err) {
  if (err) {
    return console.log('Connection error', err);
  }
  return console.log('Connected to db....');
});

app.post('/posts', post_controller.create);

app.get('/posts', post_controller.list);

app.get('/posts/:id', post_controller.show);

app.put('/posts/incrementViews', post_controller.incrementViews);

app.put('/posts/:id', post_controller.update);

app.delete('/posts/:id', post_controller.delete);

app.post('/comments', comment_controller.create);

app.get('/comments/:id', comment_controller.list);

app.delete('/comments/:id', comment_controller.delete);

app.post('/signup', function (req, res) {
  User.findOne({ username: req.body.username }, (err, response) => {
    if (err) { res.send('error', err); }

    if (!response) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      newUser.save((error) => {
        if (error) { res.send(error); }
        res.send('User signed up');
      });
    } else {
      res.send('User already exists!');
    }
  });
});

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});
let usr;
passport.use(new LocalStrategy(
  async function (username, password, done) {
    usr = await User.findOne({ username: username }, function (err, user) {
      if (err) {
        console.log('error occurred ', err);
        return done(err);
      }
      if (!user) {
        console.log('User not found ');
        return done(null, false);
      }
      if (user.password !== password) {
        console.log('Wrong password');
        return done(null, false);
      }
      return done(null, user);
    });
  }));
app.post('/login',
  passport.authenticate('local', { successRedirect: '/user' })
);

let currentUser;

app.get('/user', function (req, res) {
  req.session.user = usr;
  currentUser = req.session.user;
  res.send(currentUser);
});

app.get('/get-user', function (req, res) {
  res.send(currentUser);
});

app.listen(8080);
