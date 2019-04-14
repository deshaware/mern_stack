//This file is created so that many forms fields and values can be used as component
// note that we are going to make this as function based react file
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  placeholder,
  name,
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        // type={type}
        placeholder={placeholder}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error //this means is invalid will be added only when errors.email exist
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}

      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.func.isRequired
};


export default SelectListGroup;
 