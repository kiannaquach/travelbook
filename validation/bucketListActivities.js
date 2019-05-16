const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function vaildateLoginInput(data) {
  let errors = {};

  data.activity = !isEmpty(data.activity) ? data.activity : '';
  data.activity_location = !isEmpty(data.activity_location) ? data.activity_location : '';
  data.expected_month_visit = !isEmpty(data.expected_month_visit) ? data.expected_month_visit : '';

  if (Validator.isEmpty(data.activity)) {
    errors.activity = 'Activity name is required';
  }
  
  if (Validator.isEmpty(data.activity_location)) {
    errors.activity_location = 'Activity location is required';
  }

  if (Validator.isEmpty(data.expected_month_visit)) {
    errors.expected_month_visit = 'Expected month is required';
  }

  return {
    errors, 
    isValid: isEmpty(errors),
  }
}
