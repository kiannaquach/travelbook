const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Login / Registration Validation 
const validateRegisterUserInput = require('../../validation/register');
const validateLoginUserInput = require('../../validation/login');

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        
        return res.status(400).json(errors);
      }
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        });
      });
    })
    .catch(err => console.log(err))
});

// @route   GET api/users/login
// @desc    User login + return JWT token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginUserInput(req.body);

   if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

   User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';

         return res.status(404).json(errors);
      }

       bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar }

             jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            });
          } else {
            errors.password = 'Incorrect password';

            return res.status(400).json(errors)
          }
        })
    });
});

// @route   GET api/users/current-user
// @desc    Current user 
// @access  Private
router.get('/current-user', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;