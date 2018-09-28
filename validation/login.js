const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  //first to compare with empty string, could have used lodash but to minimize the lib we didn't
  //this makes sure even if the data is coming as null or undefined, we will make it as empty string

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwords field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}