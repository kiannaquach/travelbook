const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// MongoDB connection
mongoose
  .connect(db)
  .then(() => console.log('MongoDB succesfully connected!'))
  .catch(err => console.log('err'));

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));