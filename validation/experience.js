const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.from = !isEmpty(data.from) ? data.from : '';
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job itle field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From can\'t be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}