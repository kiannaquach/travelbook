const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function vaildateLoginInput(data) {
  let errors = {};

  data.place_to_visit = !isEmpty(data.place_to_visit) ? data.place_to_visit : '';
  data.place_to_visit_location = !isEmpty(data.place_to_visit_location) ? data.place_to_visit_location : '';
  data.expected_month_visit = !isEmpty(data.expected_month_visit) ? data.expected_month_visit : '';

  if (Validator.isEmpty(data.place_to_visit)) {
    errors.place_to_visit = 'Your bucket list place to visit name is required';
  }
  
  if (Validator.isEmpty(data.place_to_visit_location)) {
    errors.place_to_visit_location = 'Your bucket list place to visit location is required';
  }

  if (Validator.isEmpty(data.expected_month_visit)) {
    errors.expected_month_visit = 'Expected month visit is required';
  }

  return {
    errors, 
    isValid: isEmpty(errors),
  }
}
