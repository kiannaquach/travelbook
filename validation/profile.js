const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function vaildateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.places_visited = !isEmpty(data.places_visited) ? data.places_visited : '';

  
  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = 'Username needs to be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required for profile';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status is required for profile';
  }
  
  if (Validator.isEmpty(data.places_visited)) {
    errors.places_visited = 'Places visited is required for profile';
  }

  if (!isEmpty(data.blog)) {
    if (!Validator.isURL(data.blog)) {
      errors.blog = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.vsco)) {
    if (!Validator.isURL(data.vsco)) {
      errors.vsco = 'Not a valid URL'
    }
  }

  return {
    errors, 
    isValid: isEmpty(errors),
  }
}