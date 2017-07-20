import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput/FormInput';
import './style.css';

function LocationDetails(props) {
  const STATES = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
  return (
    <div>
      <div className="location-details">
        <div className="state">
          <label className="label-state" htmlFor={`${props.type}-state`}>State</label>
          <select className="select-state" id={`${props.type}-state`} required={props.required}>
            {STATES.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div className="zip-code">
          <label className="label-zip-code" htmlFor={`${props.type}-zip-code`}>Zip Code</label>
          <input
            className="input-zip-code"
            type="text"
            id={`${props.type}-zip-code`}
            required={props.required}
            maxLength="5"
            minLength="5"
          />
        </div>
      </div>
    </div>
  )
}

LocationDetails.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired
}

function AddressInputs(props) {
  return (
    <div>
      <FormInput
        id={`${props.type}-firstname`}
        invalid="Please enter your first name"
        label="First Name"
        required={props.type === 'shipping'}
        type="text"
      />
      <FormInput
        id={`${props.type}-lastname`}
        invalid="Please enter your last name"
        label="Last Name"
        required={props.type === 'shipping'}
        type="text"
      />
      <FormInput
        id={`${props.type}-address`}
        invalid="Please enter your address"
        label="Address"
        required={props.type === 'shipping'}
        type="text"
      />
      <FormInput
        id={`${props.type}-city`}
        invalid="Please enter your city name"
        label="City"
        required={props.type === 'shipping'}
        type="text"
      />
      <LocationDetails type={props.type} required={props.type === 'shipping'} />
    </div>
  )
}

AddressInputs.defaultProps = {
  required: false
}

AddressInputs.propTypes = {
  type: PropTypes.string.isRequired
}

function CardDetails() {
  const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const YEARS = Array.from({ length: 50 }, (v, k) => k + 2017);
  return (
    <div className="card-details">
      <div className="exp-date">
        <span className="exp">Expiration</span>
        <label className="label-date" htmlFor="month">Month</label>
        <select className="select-date" id="month" required>
          <option>MM</option>
          {MONTHS.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
        /
        <label className="label-date" htmlFor="year">Year</label>
        <select className="select-date" id="year" required>
          <option>YYYY</option>
          {YEARS.map(value => <option key={value} value={value}>{value}</option>)}
        </select>
      </div>
      <div className="ccv">
        <label className="label-ccv" htmlFor="ccv">CCV</label>
        <input className="input-ccv" type="text" id="ccv" required maxLength="4" minLength="3" />
      </div>
    </div>
  )
}

function PaymentInputs() {
  return (
    <div>
      <FormInput
        id="fullname"
        invalid="Please enter a name"
        label="Name on Card"
        message="Enter the name as it appears on the card"
        required
        type="text"
      />
      <FormInput
        id="card-number"
        invalid="Please enter a valid credit card number"
        label="Card Number"
        required
        type="text"
      />
      <CardDetails />
    </div>
  )
}

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkoutCompleted: false,
      showBilling: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ checkoutCompleted: true });
    // Order submission information
  }

  handleClick() {
    const activeState = this.state.showBilling;
    this.setState({ showBilling: !activeState })
  }

  render() {
    return (
      <div className="checkout">
        {this.state.checkoutCompleted === false
        ? <div>
          <h3>Checkout</h3>
          <form className="checkout-form" name="checkout" onSubmit={this.handleSubmit}>
            <section className="address">
              <h4>Shipping Address</h4>
              <AddressInputs type="shipping" required />
              <h4>Billing Address</h4>
              <div className="billing-selection">
                <input id="billing-address" type="checkbox" onClick={this.handleClick} />
                <label htmlFor="billing-address">
                  Check this box if your billing address is the same as your shipping address
                </label>
              </div>
              <div className={this.state.showBilling === false ? 'hide' : null}>
                <AddressInputs type="billing" />
              </div>
            </section>
            <section className="payment">
              <h4>Payment Information</h4>
              <PaymentInputs />
              <button className="checkout-btn" type="submit">Complete checkout</button>
            </section>
          </form>
        </div>
      : <div>Thanks for your order!</div>}
      </div>
    )
  }
}

export default Checkout;
