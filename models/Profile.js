const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Profile Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  username: {
    type: String,
    required: true,
    max: 40,
  },
  bio: {
    type: String,
  },
  blog: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  places_visited: {
    type: [String],
    required: true,
  },
  bucket_list_activities: [
    {
      activity: {
        type: String,
        required: true,
      },
      activity_location: {
        type: String,
        required: true,
      },
      expected_month_visit: {
        type: Date,
        required: true
      },
      description: {
        type: String,
      }
    }
  ],
  bucket_list_places_to_visit: [
    {
      place_to_visit: {
        type: String,
        required: true,
      },
      place_to_visit_location: {
        type: String,
        required: true,
      },
      expected_month_visit: {
        type: Date,
        required: true
      },
      description: {
        type: String,
      }
    }
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    vsco: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);