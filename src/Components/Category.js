import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import PropTypes from 'prop-types'

export default class Category extends Component {
  render() {
    const { id, title, img } = this.props.category;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div className="img-container p-5">
            <Link to={`/category/${id}`}>
              <img src={process.env.PUBLIC_URL + "/" + img} alt={"category"} className="card-img-top" />
            </Link>
          </div>
          {/*card footer*/}
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Category.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string
  })
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: rgba(247, 247, 247);
    border-top: transparent;
    transition: all 0.5s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: var(--mainGreen);
    }
  }
  .img-container{
    position: relative;
    overflow:hidden;
  }
  .card-img-top{
    transition: all 0.5s linear;
  }
  .img-container:hover .card-img-top{
    transform:scale(1.2);
  }
  .cart-btn{
    position: absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightGreen);
    border:none;
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5rem 0 0 0;
  }

  .cart-btn:hover{
    color:var(--mainGreen);
    cursor:pointer;
  }
`;
