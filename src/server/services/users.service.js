const User = require('../../db/user/schema.js');

exports.newUser = async (data) => {
  User.findOne({ username: data.username }, (err, response) => {
    if (err) { return console.log('error', err); }

    if (!response) {
      const newUser = new User({
        username: data.username,
        password: data.password,
      });
      newUser.save((error) => {
        if (err) { return (error); }
        const msg = 'User signed up';
        return (msg);
      });
    } else {
      const msg1 = 'User already exists!';
      return (msg1);
    }
    return false;
  });
};
