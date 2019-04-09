import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const loginUser = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(loginUser);
  }
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Travelbook account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className='form-control form-control lg'
                  />
                </div>
                <div className='form-group'>
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className='form-control form-control lg'
                  />
                </div>
                <div className='form-group'>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default Login;