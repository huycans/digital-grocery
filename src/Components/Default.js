import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
export default class Default extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
            <h1 className="display-3">404</h1>
            <h1>error</h1>
            <h2>page not found</h2>
            <h3>
              the requested URL <span className="text-danger">{this.props.location.pathname}</span>{" "}
              was not found
            </h3>
            {this.props.history.length === 1 ? (
              <Link to="/">
                <ButtonContainer
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  go back to home page
                </ButtonContainer>
              </Link>
            ) : (
              <ButtonContainer
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                go back to previous page
              </ButtonContainer>
            )}
          </div>
        </div>
      </div>
    );
  }
}
