import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: ""
    };

    
  }

  

  onEmailInputChange = event => {
    let email = event.target.value;
    this.setState({email: email });
    console.log('email: ', email);
  };
  onNameInputChange = event => {
    let name = event.target.value;
    this.setState({ name: name });
    console.log('Name:', name)
  };
  onPasswordInputChange = event => {
    let password = event.target.value;
    this.setState({ password: password });
    console.log('password: ', password)
  };

  onSubmitClick = event => {
    const params = {
        headers: {"content-type":"application/json"}, 
        body: JSON.stringify(this.state), 
        method: "POST"
    }
    fetch('http://192.168.0.50:3001/register', params)
    .then((res) => {
        this.props.setRoute("HOME")
        this.props.setUser(this.state)
    })
    .catch((error) => {
        console.error('error:', error)
    })

  }

  render() {
    return (
      <div>
        <article className="pa4 black-80 bg-white w-30 center">
          <p> Register to start using FaceBrain </p>
          <div action="sign-up_submit" method="get" acceptCharset="utf-8">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="mt3">
                <label className="db fw4 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent w-100 measure"
                  type="string"
                  name="name"
                  id="name"
                  onChange={this.onNameInputChange}
                />
              </div>
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
                onClick={e => this.onSubmitClick()}
              >
                Register
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Register;
