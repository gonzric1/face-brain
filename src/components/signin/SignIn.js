import React, { Component } from "react";
import { render } from "react-dom";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  onEmailInputChange = event => {
    let email = event.target.value;
    this.setState({ email: email });
    console.log("email: ", email);
  };

  onPasswordInputChange = event => {
    let password = event.target.value;
    this.setState({ password: password });
    console.log("password: ", password);
  };


  onButtonSubmit = event => {
    const params = {
        headers: {"content-type":"application/json"}, 
        body: JSON.stringify(this.state), 
        method: "POST"
    }
    fetch('http://192.168.0.50:3001/signin', params)
    .then((res) => {
        this.props.setRoute("HOME")
        res.json().then(json => this.props.setUser(json))
    })
    .catch((error) => {
        console.error('error:', error)
    })

  }

  render() {

    return (
      <article className="pa4 black-80 bg-white w-30 center">
        <p> Sign In </p>
        <div action="sign-up_submit" method="get" acceptCharset="utf-8">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email-address">
                Email address
              </label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailInputChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordInputChange}
              />
            </div>
          </fieldset>
          <div className="mt3">
            <button
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
              onClick={e => this.onButtonSubmit()}
            >
              Sign In{" "}
            </button>
          </div>
        </div>
      </article>
    );
  }
}

export default SignIn;
