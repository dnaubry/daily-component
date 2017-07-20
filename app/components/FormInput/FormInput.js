import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      float: false,
      valid: true,
      value: ''
    }

    this.validate = this.validate.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  validate() {
    const type = this.props.type;
    let valid = false;

    if (type === 'email') {
      const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = EMAIL_REGEX.test(this.state.value);
    } else if (type === 'password') {
      const PASSWORD_MIN = 8;
      if (this.state.value.length >= PASSWORD_MIN) {
        valid = true;
      }
    } else if (type === 'text') {
      const MIN_LENGTH = 2;
      if (this.state.value.length >= MIN_LENGTH) {
        valid = true;
      }
    }

    return valid;
  }

  handleChange(event) {
    let valid = true;
    if (this.state.valid === false) {
      valid = this.validate(this.props.type);
    }
    this.setState({
      value: event.target.value,
      valid
    });
  }

  handleFocus() {
    this.setState({ float: true });
  }

  handleBlur() {
    const valid = this.validate(this.props.type);
    this.setState({
      float: false,
      valid });
  }

  render() {
    const validStyles = `input ${this.props.styles}`;
    const invalidStyles = `input input-invalid ${this.props.styles}`;
    return (
      <div className="field">
        <input
          className={this.state.valid ? validStyles : invalidStyles}
          id={this.props.id}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          type={this.props.type}
          value={this.state.value}
          required={this.props.required}
        />
        <label
          className={this.state.float === true || this.state.value !== '' ? 'label label-floated' : 'label'}
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
        <p className={this.state.valid ? 'tip' : 'tip tip-invalid'}>
          {this.state.valid ? this.props.message : this.props.invalid}
        </p>
      </div>
    )
  }
}

FormInput.defaultProps = {
  invalid: null,
  message: null,
  required: false,
  styles: null
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  invalid: PropTypes.string,
  label: PropTypes.string.isRequired,
  message: PropTypes.string,
  required: PropTypes.bool,
  styles: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default FormInput;
