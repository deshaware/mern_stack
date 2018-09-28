const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  //first to compare with empty string, could have used lodash but to minimize the lib we didn't
  //this makes sure even if the data is coming as null or undefined, we will make it as empty string
  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Post text field is required';
  }

  if (!Validator.isLength(data.text, {
      min: 10,
      max: 300
    })) {
    errors.text = `Post must be between 10 and 300 characters`;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}