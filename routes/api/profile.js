const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile
// @desc    Current user's profile
// @access  Private
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile found';

          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or update current user's profile
// @access  Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.blog) profileFields.blog = req.body.blog;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;

    // places_visited - split into array
    if (typeof req.body.places_visited !== 'undefined') {
      profileFields.places_visited = req.body.places_visited.split(',');
    }
    
    // social object
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.vsco) profileFields.social.vsco = req.body.vsco;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields }, 
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          Profile.findOne({ username: profileFields.username })
            .then(profile => {
              if (profile) {
                errors.username = 'Username already exists';

                res.status(400).json(errors);
              }

              new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
      });
  }
);

module.exports = router;