import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5 text-white">
            <Link to="/" className="nav-link text-white">
              digital grocery store
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fa fa-cart text-white" aria-hidden="true">
                my cart
              </i>
            </span>
          </ButtonContainer>
        </Link>
      </NavWrapper>
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