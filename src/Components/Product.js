import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import { Counter } from "./Cart/CartItem"
import PropTypes from 'prop-types'

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <ProductConsumer>
            {(value) => {
              return (
                <div className="img-container p-5" onClick={() => value.handleDetail(id)}>
                  <Link to="/details">
                    <img src={process.env.PUBLIC_URL + "/" + img} alt={"product"} className="card-img-top" />
                  </Link>
                  {inCart ? (
                    <div className="product-counter">
                      <Counter id={id} />
                    </div>

                  ) : <button
                    className="cart-btn"
                    // disabled={inCart}
                    onClick={() => {
                      value.addToCart(id);
                      // value.openModal(id);
                    }}
                  >
                      <i className="fas fa-cart-plus" />
                    </button>
                  }
                </div>
              )
            }}

          </ProductConsumer>
          {/*card footer*/}
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-green font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    info: PropTypes.string,
    inCart: PropTypes.bool,

  })
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 5s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container{
    position: relative;
    overflow:hidden;
  }
  .card-img-top{
    transition: all 1s linear;
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
