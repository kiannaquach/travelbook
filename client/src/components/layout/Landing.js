import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 inline">
                Travelbook
                </h1>
                <p className="lead">
                  Connect with other travelers and create a traveler portfolio.
                  <br />
                  Post, like, and share your travel experiences! <span aria-label="airplane" role="img">✈️</span> 
                </p>
                <hr />
                <a className="btn btn-lg btn-info mr-2">
                  Sign Up
                </a>
                <a className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;