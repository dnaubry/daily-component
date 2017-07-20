import React, { Component } from 'react';
import SignUp from './SignUp/SignUp';
import Checkout from './Checkout/Checkout';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="main-content">
        <header>
          <h1>daily components</h1>
          <p>A new React component (nearly) every weekday. Based on the <a href="http://www.dailyui.co/">DailyUI</a> prompts.</p>
        </header>
        <section className="component">
          <h2>#001 - sign up</h2>
          <div className="component-content">
            <SignUp />
          </div>
        </section>
        <section className="component">
          <h2>#002 - credit card checkout</h2>
          <div className="component-content">
            <Checkout />
          </div>
        </section>
      </div>
    )
  }
}

export default App;
