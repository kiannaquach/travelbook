import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
      password: this.state.password,
    }

    this.props.loginUser(loginUser);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">LOG IN</h1>
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
                    className={classnames('form-control form-control lg', {'is-invalid': errors.email})}
                  />
                  {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}                
                </div>
                <div className='form-group'>
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className={classnames('form-control form-control lg', {
                      'is-invalid': errors.password
                    })}                  
                  />
                  {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}                
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })((Login));