const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function vaildatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 500 })) {
    errors.text = 'Post must be between 10 and 500 characters';
  }
  
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required';
  }
  

  return {
    errors, 
    isValid: isEmpty(errors),
  }
}