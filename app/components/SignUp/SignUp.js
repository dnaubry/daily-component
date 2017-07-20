import React, { Component } from 'react';
import FormInput from '../FormInput/FormInput';
import './style.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedUp: false,
      valid: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ signedUp: true });
    // Sign up submission information
  }

  render() {
    return (
      <div className="sign-up">
        {this.state.signedUp === false
      ? <div>
        <h3>Sign up for this really awesome service!</h3>
        <p className="description">
          Enter your email address and a password to create an account.
        </p>
        <form name="sign-up" onSubmit={this.handleSubmit}>
          <FormInput
            id="email"
            invalid="Please enter a valid email address"
            label="Email"
            message="E.g., email@example.com"
            required
            type="email"
          />
          <FormInput
            id="password"
            invalid="Please enter a password of at least 8 characters"
            label="Password"
            message="Passwords must be at least 8 characters"
            required
            type="password"
          />
          <div className="form-submit">
            <button className="sign-up-btn" type="submit"><span>Sign Up</span></button>
          </div>
        </form>
      </div>
        : <div className="signed-up">Thanks for signing up!</div>}
      </div>
    )
  }
}

export default SignUp;
