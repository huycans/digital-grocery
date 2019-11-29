import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from '../context'
export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          let { email, logout } = value;
          return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5 text-white">
                  <Link to="/" className="nav-link text-white">
                    digital grocery store
              </Link>
                </li>
              </ul>
              <ul className="ml-auto navbar-nav align-items-center">
                {
                  email == ""
                    ? <Link to="/signin" className="ml-auto">
                      <ButtonContainer>
                        <span className="mr-2 text-white">
                          <i className="fa" aria-hidden="true">
                            Signin/Signup
                      </i>
                        </span>
                      </ButtonContainer>
                    </Link>
                    :
                    <div className="row mr-1">
                      <Link to="/user" className="ml-auto">
                        <ButtonContainer>
                          <span className="mr-2">
                            <i className="fa text-white" aria-hidden="true" style={{"textTransform": "lowercase"}}>
                              {email}
                            </i>
                          </span>
                        </ButtonContainer>
                      </Link>
                      <div>
                        <ButtonContainer onClick={logout}>
                          <span className="mr-2">
                            <i className="fa text-white" aria-hidden="true">
                              Logout
                          </i>
                          </span>
                        </ButtonContainer>
                      </div>
                    </div>
                }
                <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                    <span className="mr-2">
                      <i className="fa fa-shopping-cart text-white" aria-hidden="true">
                        my cart
                      </i>
                    </span>
                  </ButtonContainer>
                </Link>
              </ul>

            </NavWrapper>
          )
        }}
      </ProductConsumer>

    );
  }
}

const NavWrapper = styled.nav`
background:var(--mainGreen);
.nav-link{
  color:var(--mainWhite):important;
  font-size:1.3rem;
  text-transform:capitalize
}
`