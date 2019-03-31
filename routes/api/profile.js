const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateBucketListActivitiesInput = require('../../validation/bucketListActivities');
const validateBucketListPlaceToVisitInput = require('../../validation/bucketListPlaceToVisit');

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

// @route   GET api/profile/username/:username
// @desc    Get profile by username
// @access  Public
router.get('/username/:username', (req, res) => {
    const errors = {};

    Profile.findOne({ username: req.params.username })
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

// @route   GET api/profile/user/:user_id
// @desc    Get profile by id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';

        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json({profile: 'No profile for this user'}));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'No profiles found';

        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({profiles: 'No profile for this user'}));
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

// @route   POST api/profile/bucket_list_activities
// @desc    Add bucket list activities to profile
// @access  Private
router.post(
  '/bucket_list_activities', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBucketListActivitiesInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newBucketListActivities = {
          activity: req.body.activity,
          activity_location: req.body.activity_location,
          expected_month_visit: req.body.expected_month_visit,
          description: req.body.description,
        }

        profile.bucket_list_activities.unshift(newBucketListActivities);

        profile.save()
          .then(profile => res.json(profile));
      })
  }
);

// @route   POST api/profile/bucket_list_places_to_visit
// @desc    Add bucket list places to visit 
// @access  Private
router.post(
  '/bucket_list_places_to_visit', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBucketListPlaceToVisitInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newBucketListPlaceToVisit = {
          place_to_visit: req.body.place_to_visit,
          place_to_visit_location: req.body.place_to_visit_location,
          expected_month_visit: req.body.expected_month_visit,
          description: req.body.description,
        }

        profile.bucket_list_places_to_visit.unshift(newBucketListPlaceToVisit);

        profile.save()
          .then(profile => res.json(profile));
      })
  }
);

// @route   DELTE api/profile/bucket_list_activities/:bl_activities_id
// @desc    Delete bucket list activities from profile
// @access  Private
router.delete(
  '/bucket_list_activities/:bl_activities_id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.bucket_list_activities
          .map(item => item.id)
          .indexOf(req.params.bl_activities_id);
        
          profile.bucket_list_activities.splice(removeIndex, 1);

          profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELTE api/profile/bucket_list_places_to_visit/:bl_places_id
// @desc    Delete bucket list places to visit from profile
// @access  Private
router.delete(
  '/bucket_list_places_to_visit/:bl_places_id', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.bucket_list_places_to_visit
          .map(item => item.id)
          .indexOf(req.params.bl_places_id);
        
          profile.bucket_list_places_to_visit.splice(removeIndex, 1);

          profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELTE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => { 
            res.json({ success: true })
        })
      })
  }
);


module.exports = router;